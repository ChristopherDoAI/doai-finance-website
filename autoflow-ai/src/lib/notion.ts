import { Client } from "@notionhq/client";

let notionClient: Client | null = null;

function getNotion(): Client {
  if (!notionClient) {
    const token = process.env.NOTION_TOKEN;
    if (!token) throw new Error("NOTION_TOKEN not configured");
    notionClient = new Client({ auth: token });
  }
  return notionClient;
}

const WORKSPACE_PAGE_ID =
  process.env.NOTION_WORKSPACE_PAGE_ID || "3248bfd6-0192-815f-81cb-ef244bb03950";

// Cache to avoid hammering Notion on every request
let cachedServices: ServiceItem[] | null = null;
let servicesCacheTime = 0;
let cachedContext: CompanyContext | null = null;
let contextCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export interface ServiceItem {
  title: string;
  headline: string;
  body: string;
  setup?: string;
  ongoing?: string;
}

export interface CompanyContext {
  mission: string;
  whatWeDo: string;
  services: ServiceItem[];
  verticals: string[];
  team: string[];
}

/**
 * Extract plain text from Notion rich text array
 */
function richTextToPlain(richText: Array<{ plain_text: string }>): string {
  return richText.map((t) => t.plain_text).join("");
}

/**
 * Fetch the DOAI Systems workspace page and extract company info
 */
export async function fetchCompanyContext(): Promise<CompanyContext> {
  if (cachedContext && Date.now() - contextCacheTime < CACHE_TTL) {
    return cachedContext;
  }

  const notion = getNotion();

  // Get all blocks from the workspace page
  const blocks = await notion.blocks.children.list({
    block_id: WORKSPACE_PAGE_ID,
    page_size: 100,
  });

  let mission = "";
  let whatWeDo = "";
  const services: ServiceItem[] = [];
  const verticals: string[] = [];
  const team: string[] = [];

  let currentHeading = "";

  for (const block of blocks.results) {
    const b = block as Record<string, unknown>;
    const type = b.type as string;

    if (type === "heading_1" || type === "heading_2" || type === "heading_3") {
      const headingData = b[type] as { rich_text: Array<{ plain_text: string }> };
      currentHeading = richTextToPlain(headingData.rich_text).toLowerCase();
      continue;
    }

    if (type === "paragraph") {
      const para = b.paragraph as { rich_text: Array<{ plain_text: string }> };
      const text = richTextToPlain(para.rich_text);
      if (!text) continue;

      if (currentHeading.includes("mission")) {
        mission += (mission ? " " : "") + text;
      } else if (
        currentHeading.includes("what") &&
        (currentHeading.includes("do") || currentHeading.includes("does"))
      ) {
        whatWeDo += (whatWeDo ? " " : "") + text;
      } else if (currentHeading.includes("vertical") || currentHeading.includes("target")) {
        verticals.push(text);
      } else if (currentHeading.includes("team")) {
        team.push(text);
      }
    }

    if (type === "bulleted_list_item" || type === "numbered_list_item") {
      const listItem = b[type] as { rich_text: Array<{ plain_text: string }> };
      const text = richTextToPlain(listItem.rich_text);
      if (!text) continue;

      if (currentHeading.includes("vertical") || currentHeading.includes("target")) {
        verticals.push(text);
      } else if (currentHeading.includes("team")) {
        team.push(text);
      }
    }

    // Parse table rows for services/pricing
    if (type === "table_row") {
      const row = b.table_row as { cells: Array<Array<{ plain_text: string }>> };
      if (row.cells.length >= 2) {
        const title = row.cells[0].map((c) => c.plain_text).join("");
        // Skip header row
        if (title.toLowerCase() === "service" || !title) continue;
        services.push({
          title,
          headline: getServiceHeadline(title),
          body: getServiceBody(title),
          setup: row.cells.length > 1 ? row.cells[1].map((c) => c.plain_text).join("") : undefined,
          ongoing: row.cells.length > 2 ? row.cells[2].map((c) => c.plain_text).join("") : undefined,
        });
      }
    }
  }

  // If table parsing didn't yield services, use known services from Notion
  if (services.length === 0) {
    services.push(
      {
        title: "GoHighLevel CRM Setup",
        headline: "Your sales pipeline, fully automated.",
        body: "We set up and configure GoHighLevel as your all-in-one CRM — managing leads, automating follow-ups, and keeping your pipeline organised so nothing falls through the cracks.",
      },
      {
        title: "Text AI (WhatsApp/SMS Bots)",
        headline: "Instant replies on the channels your customers use.",
        body: "AI-powered chatbots on WhatsApp and SMS that handle enquiries, qualify leads, and book appointments 24/7 — so you never miss a message, even outside office hours.",
      },
      {
        title: "Voice AI Agents",
        headline: "Your phone answered, 24/7.",
        body: "Intelligent voice agents that pick up every inbound call in your business name. They answer questions, qualify leads, capture details, and book slots in your diary — all without you lifting a finger.",
      },
      {
        title: "AI Audits",
        headline: "Find out where AI can save you time and money.",
        body: "A thorough review of your business operations to identify where AI and automation can eliminate manual work, reduce costs, and unlock growth — with a clear action plan to get started.",
      },
      {
        title: "Custom Projects",
        headline: "Bespoke automation, built for your business.",
        body: "For businesses with unique workflows and requirements, we design and build custom AI automation solutions tailored to your specific needs — from integrations to full end-to-end systems.",
      }
    );
  }

  const context: CompanyContext = {
    mission:
      mission ||
      "Make AI automation accessible and affordable for small businesses across the UK.",
    whatWeDo:
      whatWeDo ||
      "AI automation consultancy helping SMEs and sole traders with AI chatbots, voice agents, CRM systems, and workflow automation.",
    services,
    verticals:
      verticals.length > 0
        ? verticals
        : ["Trades", "Estate agents", "Recruitment agencies", "Coaches and consultants"],
    team: team.length > 0 ? team : ["Christopher Do — Founder/CEO", "Roy Cheung — CTO", "Joe Delima — CMO/Sales Lead"],
  };

  cachedContext = context;
  contextCacheTime = Date.now();
  return context;
}

/**
 * Fetch just the services list (used by the Services component)
 */
export async function fetchServices(): Promise<ServiceItem[]> {
  if (cachedServices && Date.now() - servicesCacheTime < CACHE_TTL) {
    return cachedServices;
  }
  const context = await fetchCompanyContext();
  cachedServices = context.services;
  servicesCacheTime = Date.now();
  return cachedServices;
}

/**
 * Build a context string for the chatbot (mission + services + what we do — no pricing)
 */
export async function fetchMontyContext(): Promise<string> {
  const ctx = await fetchCompanyContext();

  const servicesList = ctx.services
    .map((s) => `- **${s.title}**: ${s.body}`)
    .join("\n");

  return `## DOAI Company Context (live from Notion)

**Mission:** ${ctx.mission}

**What we do:** ${ctx.whatWeDo}

**Core Services:**
${servicesList}

**Target Verticals:** ${ctx.verticals.join(", ")}

**Team:** ${ctx.team.join("; ")}`;
}

// Helpers to generate display copy for each known service
function getServiceHeadline(title: string): string {
  const map: Record<string, string> = {
    "GoHighLevel CRM Setup": "Your sales pipeline, fully automated.",
    "Text AI (WhatsApp/SMS Bots)": "Instant replies on the channels your customers use.",
    "Voice AI Agents (Inbound/Outbound)": "Your phone answered, 24/7.",
    "Voice AI Agents": "Your phone answered, 24/7.",
    "AI Audits": "Find out where AI can save you time and money.",
    "Custom Projects": "Bespoke automation, built for your business.",
  };
  return map[title] || `${title} — tailored for your business.`;
}

function getServiceBody(title: string): string {
  const map: Record<string, string> = {
    "GoHighLevel CRM Setup":
      "We set up and configure GoHighLevel as your all-in-one CRM — managing leads, automating follow-ups, and keeping your pipeline organised so nothing falls through the cracks.",
    "Text AI (WhatsApp/SMS Bots)":
      "AI-powered chatbots on WhatsApp and SMS that handle enquiries, qualify leads, and book appointments 24/7 — so you never miss a message, even outside office hours.",
    "Voice AI Agents (Inbound/Outbound)":
      "Intelligent voice agents that pick up every inbound call in your business name. They answer questions, qualify leads, capture details, and book slots in your diary — all without you lifting a finger.",
    "Voice AI Agents":
      "Intelligent voice agents that pick up every inbound call in your business name. They answer questions, qualify leads, capture details, and book slots in your diary — all without you lifting a finger.",
    "AI Audits":
      "A thorough review of your business operations to identify where AI and automation can eliminate manual work, reduce costs, and unlock growth — with a clear action plan to get started.",
    "Custom Projects":
      "For businesses with unique workflows and requirements, we design and build custom AI automation solutions tailored to your specific needs — from integrations to full end-to-end systems.",
  };
  return map[title] || `Professional ${title.toLowerCase()} service tailored to your business needs.`;
}
