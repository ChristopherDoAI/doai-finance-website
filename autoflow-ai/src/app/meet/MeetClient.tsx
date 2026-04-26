"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function MeetClient() {
  const [calendlyReady, setCalendlyReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formDone, setFormDone] = useState(false);

  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/christopher-do-doaisystems/30min";

  // Load Calendly script (same pattern as BookingSection)
  useEffect(() => {
    if (document.getElementById("calendly-script")) {
      setCalendlyReady(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setCalendlyReady(true);
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }, []);

  const openCalendly = () => {
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: calendlyUrl });
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
    // Small delay so the section is rendered before scrolling
    setTimeout(() => {
      document.getElementById("meet-form")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <section className="px-5 pt-8 pb-16 max-w-lg mx-auto">
      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Primary */}
        <button
          onClick={openCalendly}
          disabled={!calendlyReady}
          className="flex-1 h-12 rounded-lg bg-primary text-white font-display font-semibold text-sm tracking-tight hover:bg-primary-dark active:scale-[0.98] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {calendlyReady ? "Book a 30-min call" : "Loading…"}
        </button>

        {/* Secondary — only show if form not yet triggered */}
        {!showForm && (
          <button
            onClick={handleShowForm}
            className="flex-1 h-12 rounded-lg border border-border bg-card text-text-primary font-display font-semibold text-sm tracking-tight hover:border-primary hover:text-primary active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send me your details
          </button>
        )}
      </div>

      {/* Calendly not ready note */}
      {!calendlyReady && (
        <p className="text-xs text-text-muted text-center mb-6">Calendar loading…</p>
      )}

      {/* Form section */}
      {showForm && (
        <div id="meet-form">
          {formDone ? (
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-semibold text-text-primary mb-1">Got it!</p>
              <p className="text-sm text-text-secondary mb-4">
                We will be in touch soon. Grab a slot while you are here.
              </p>
              <button
                onClick={openCalendly}
                disabled={!calendlyReady}
                className="h-11 px-6 rounded-lg bg-primary text-white font-semibold text-sm hover:bg-primary-dark active:scale-[0.98] transition-all disabled:opacity-50"
              >
                Pick a time
              </button>
            </div>
          ) : (
            <LeadForm onSuccess={() => setFormDone(true)} openCalendly={openCalendly} />
          )}
        </div>
      )}

      {/* Footer note */}
      <p className="mt-10 text-xs text-text-muted text-center">
        No spam. We only reach out about your enquiry.
      </p>
    </section>
  );
}
