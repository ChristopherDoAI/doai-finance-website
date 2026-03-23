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
    <section id="results" className="py-section">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
            Proven results
          </span>
          <h2 className="font-display font-bold text-display-lg text-text-primary">
            The results speak for themselves
          </h2>
        </div>

        {/* Stat cards */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((m, i) => (
            <div
              key={i}
              className={`bg-white border border-border rounded-2xl p-6 text-center transition-all duration-500 hover:shadow-card-hover ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            >
              <span className="block font-display font-bold text-3xl lg:text-4xl text-primary tracking-tight mb-2">
                {m.number}
              </span>
              <span className="block text-xs text-text-muted leading-tight">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
