import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ChatWidget from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "DOAI Systems",
  description:
    "AI automation for UK SMEs and sole traders. Custom CRM systems, AI voice agents, chatbots, and process automation.",
  keywords: [
    "AI automation",
    "voice agent",
    "AI chatbot",
    "lead generation",
    "missed calls",
    "business automation",
    "AI phone answering",
  ],
  openGraph: {
    title: "DOAI Systems",
    description:
      "AI automation for UK SMEs and sole traders. Custom CRM systems, AI voice agents, chatbots, and process automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="font-body bg-base text-text-primary antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
