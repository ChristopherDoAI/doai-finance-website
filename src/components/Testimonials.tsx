"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "I was losing two or three jobs a week just from missed calls while I was on site. AutoFlow's voice agent now handles everything. It even books them in before I've put my tools down.",
    name: "James Hartley",
    role: "Sole trader — Electrical",
    initials: "JH",
    color: "bg-amber-900/40 text-amber-300",
  },
  {
    quote:
      "The chatbot on our website has completely changed how we handle enquiries. It qualifies leads before we even speak to them, and the quality of calls we do take has gone through the roof.",
    name: "Sarah Okafor",
    role: "Director — Roofing & Property Maintenance",
    initials: "SO",
    color: "bg-teal-900/40 text-teal-300",
  },
  {
    quote:
      "Honestly I was sceptical. But they set everything up within 48 hours and within a week I had three bookings from calls that would have just rung out. It's paid for itself ten times over.",
    name: "Mike Brannigan",
    role: "Owner — Plumbing & Heating",
    initials: "MB",
    color: "bg-indigo-900/40 text-indigo-300",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">
              Client results
            </span>
            <h2 className="font-display font-extrabold text-display-lg text-text-primary">
              From the owners
              <br />
              who use it every day
            </h2>
          </div>
          {/* Stars */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-body text-text-secondary">5.0 from 40+ clients</span>
          </div>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-card border border-border rounded-2xl p-8 flex flex-col gap-6 hover:border-border-light hover:shadow-card-hover transition-all duration-300 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: inView ? `${i * 120}ms` : "0ms",
                transition: "opacity 0.55s ease, transform 0.55s ease, border-color 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Quote mark */}
              <svg className="w-8 h-8 text-accent/30" fill="currentColor" viewBox="0 0 32 32">
                <path d="M10 8C5.582 8 2 11.582 2 16s3.582 8 8 8c1.98 0 3.8-.72 5.2-1.9-.6 3.36-3.24 6.54-7.2 8.3L9.4 32c5.78-2.34 10.6-8.52 10.6-16C20 8.84 15.56 8 10 8zm18 0c-4.418 0-8 3.582-8 8s3.582 8 8 8c1.98 0 3.8-.72 5.2-1.9-.6 3.36-3.24 6.54-7.2 8.3l1.4 1.6C33.18 29.66 38 23.48 38 16c0-7.16-4.44-8-8-8z" />
              </svg>

              <blockquote className="font-body text-text-secondary leading-relaxed text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-display font-bold ${t.color}`}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-sm text-text-primary">{t.name}</p>
                  <p className="font-body text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
