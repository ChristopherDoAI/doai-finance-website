"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  { number: "£2.4M+", label: "Additional revenue generated for clients" },
  { number: "12,000+", label: "Calls handled by AI agents this year" },
  { number: "38%", label: "Average increase in qualified leads" },
  { number: "< 48h", label: "From sign-up to live AI agent" },
  { number: "99.9%", label: "Uptime across all client deployments" },
];

export default function Results() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="results" ref={ref} className="py-20 border-y border-border bg-surface relative overflow-hidden">
      {/* Scrolling ticker on large screens */}
      <div className="hidden lg:flex items-center overflow-hidden">
        <div
          className={`flex items-center gap-16 whitespace-nowrap transition-all duration-700 ${
            inView ? "animate-[ticker_30s_linear_infinite]" : ""
          }`}
          style={{
            animation: "ticker 30s linear infinite",
          }}
        >
          {[...metrics, ...metrics].map((m, i) => (
            <div key={i} className="flex items-center gap-16 flex-shrink-0">
              <div className="flex flex-col items-center gap-1">
                <span className="font-display font-extrabold text-3xl text-text-primary tracking-tight">
                  {m.number}
                </span>
                <span className="text-xs font-body text-text-muted text-center max-w-[160px]">
                  {m.label}
                </span>
              </div>
              <span className="text-border text-2xl font-thin select-none">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile / fallback grid */}
      <div className="lg:hidden max-w-7xl mx-auto px-6 grid grid-cols-2 gap-6">
        {metrics.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col gap-1 transition-all duration-500 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className="font-display font-extrabold text-2xl text-text-primary tracking-tight">
              {m.number}
            </span>
            <span className="text-xs font-body text-text-muted leading-tight">{m.label}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
