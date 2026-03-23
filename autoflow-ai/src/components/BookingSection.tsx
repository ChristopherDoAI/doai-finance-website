"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function BookingSection() {
  const [calendlyReady, setCalendlyReady] = useState(false);
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/roy-cheung-doaisystems/30min";

  // Load Calendly script
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

  const benefits = [
    "Free, no-obligation 30-minute call",
    "We map exactly which automations will move the needle for your business",
    "You receive a custom build plan with honest pricing",
    "No pushy sales — if it&apos;s not right for you, we&apos;ll tell you",
  ];

  return (
    <section id="booking" className="py-section bg-surface relative overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
              Let&apos;s talk
            </span>
            <h2 className="font-display font-bold text-display-lg text-text-primary mb-6 leading-tight">
              Book your free
              <br />
              <span className="text-primary">strategy call.</span>
            </h2>
            <p className="font-body text-text-secondary leading-relaxed mb-10 max-w-md">
              In 30 minutes we&apos;ll work out exactly how much revenue you&apos;re
              leaving on the table every week — and show you precisely how AI
              automation fixes it.
            </p>

            <ul className="flex flex-col gap-4 mb-12">
              {benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span
                    className="font-body text-sm text-text-secondary"
                    dangerouslySetInnerHTML={{ __html: b }}
                  />
                </li>
              ))}
            </ul>

            {/* CTA button (popup mode) */}
            <button
              onClick={openCalendly}
              disabled={!calendlyReady}
              className="group h-14 px-8 rounded-lg bg-primary text-white font-display font-semibold tracking-tight text-base hover:bg-primary-dark active:scale-[0.98] transition-all duration-150 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {calendlyReady ? (
                <>
                  Choose a time that works for you
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              ) : (
                "Loading calendar..."
              )}
            </button>

            <p className="mt-4 text-xs font-body text-text-muted">
              Typically available within 1–2 business days.
            </p>
          </div>

          {/* Right: inline embed widget */}
          <div className="rounded-2xl overflow-hidden border border-border bg-card min-h-[600px] flex items-stretch">
            <div
              className="calendly-inline-widget w-full"
              data-url={`${calendlyUrl}?hide_gdpr_banner=1&background_color=FFFFFF&text_color=111111&primary_color=0D654A`}
              style={{ minWidth: "320px", height: "680px" }}
            />
            {/* Calendly inline widget script trigger */}
            {calendlyReady && (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    if (window.Calendly && !document.querySelector('.calendly-inline-widget iframe')) {
                      Calendly.initInlineWidget({
                        url: '${calendlyUrl}?hide_gdpr_banner=1&background_color=FFFFFF&text_color=111111&primary_color=0D654A',
                        parentElement: document.querySelector('.calendly-inline-widget'),
                        prefill: {},
                        utm: {}
                      });
                    }
                  `,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
