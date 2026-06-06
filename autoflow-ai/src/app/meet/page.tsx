import type { Metadata } from "next";
import { Suspense } from "react";
import MeetClient from "./MeetClient";

export const metadata: Metadata = {
  title: "Meet DOAI Systems",
  description:
    "AI automation for UK SMEs and sole traders. Book a free 30-min call with Christopher or Joe.",
};

// SVG bird mark — Christopher will drop the real PNG at /logos/doai-bird.png
// and the Navbar/Footer client components will pick it up automatically via their onError fallback.
// This server component uses the SVG directly to avoid passing onError to a server Image.
function BirdLogoMark() {
  return (
    <svg viewBox="0 0 100 100" className="w-14 h-14" aria-label="DOAI bird mark">
      <polygon points="20,60 50,38 30,82" fill="#FFDB46"/>
      <polygon points="50,38 68,28 50,55" fill="#FFE574"/>
      <polygon points="20,60 30,82 10,76" fill="#E8C422"/>
      <polygon points="35,55 50,28 50,55" fill="#FFDB46" opacity="0.85"/>
    </svg>
  );
}

export default function MeetPage() {
  return (
    <main className="min-h-screen bg-base font-body antialiased">
      {/* Hero */}
      <section className="bg-surface border-b border-border pt-10 pb-8 px-5">
        <div className="max-w-lg mx-auto text-center">
          {/* Logo / brand mark */}
          <div className="flex flex-col items-center gap-3 mb-5">
            <BirdLogoMark />
            <span className="font-display font-semibold text-xl text-white tracking-wide uppercase">
              DOAI
            </span>
          </div>

          <h1 className="font-display font-bold text-display-md text-white mb-2 leading-tight">
            DOAI Systems
          </h1>
          <p className="text-base font-semibold text-primary mb-4">
            AI automation for UK SMEs and sole traders
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
            We build custom CRM systems with AI voice agents, chatbots, and marketing automation built in, plus bespoke process automation. Answers your calls, qualifies your leads, books your diary 24/7.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-6 px-5 border-b border-border bg-base">
        <div className="max-w-lg mx-auto">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 text-center">
            You just met
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold text-sm">CD</span>
              </div>
              <p className="font-semibold text-sm text-white">Christopher Do</p>
              <p className="text-xs text-text-muted">Founder</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold text-sm">JD</span>
              </div>
              <p className="font-semibold text-sm text-white">Joseph Delima</p>
              <p className="text-xs text-text-muted">Commercial Director</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs + Form — all client-side interactions */}
      <Suspense fallback={null}>
        <MeetClient />
      </Suspense>
    </main>
  );
}
