import type { Metadata } from "next";
import { Suspense } from "react";
import MeetClient from "./MeetClient";

export const metadata: Metadata = {
  title: "Meet DOAI Systems",
  description:
    "AI automation for UK SMEs and sole traders. Book a free 30-min call with Christopher or Joe.",
};

export default function MeetPage() {
  return (
    <main className="min-h-screen bg-base font-body antialiased">
      {/* Hero */}
      <section className="bg-surface border-b border-border pt-10 pb-8 px-5">
        <div className="max-w-lg mx-auto text-center">
          {/* Logo / brand mark */}
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-5">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-8 h-8"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="white" fillOpacity="0.15" />
              <path
                d="M10 16c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="2.5" fill="white" />
            </svg>
          </div>

          <h1 className="font-display font-bold text-display-md text-text-primary mb-2 leading-tight">
            DOAI Systems
          </h1>
          <p className="text-base font-semibold text-primary mb-4">
            AI automation for UK SMEs and sole traders
          </p>
          <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">
            We build AI voice agents, chatbots, CRM systems, and process
            automation that answer your calls, qualify leads, and book your
            diary 24/7 — without adding headcount.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="py-6 px-5 border-b border-border">
        <div className="max-w-lg mx-auto">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-4 text-center">
            You just met
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold text-sm">CD</span>
              </div>
              <p className="font-semibold text-sm text-text-primary">Christopher Do</p>
              <p className="text-xs text-text-muted">Founder</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-2">
                <span className="text-primary font-bold text-sm">JD</span>
              </div>
              <p className="font-semibold text-sm text-text-primary">Joe Delima</p>
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
