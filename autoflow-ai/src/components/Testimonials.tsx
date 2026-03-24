"use client";

import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "I was losing two or three jobs a week just from missed calls while I was on site. DoAi's voice agent now handles everything. It even books them in before I've put my tools down.",
    name: "James Hartley",
    role: "Sole trader - Electrical",
    initials: "JH",
  },
  {
    quote:
      "The chatbot on our website has completely changed how we handle enquiries. It qualifies leads before we even speak to them, and the quality of calls we do take has gone through the roof.",
    name: "Sarah Okafor",
    role: "Director - Roofing & Property Maintenance",
    initials: "SO",
  },
  {
    quote:
      "Honestly I was sceptical. But they set everything up within 48 hours and within a week I had three bookings from calls that would have just rung out. It's paid for itself ten times over.",
    name: "Mike Brannigan",
    role: "Owner - Plumbing & Heating",
    initials: "MB",
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
    <section id="testimonials" className="py-section bg-surface">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
            Client results
          </span>
          <h2 className="font-display font-bold text-display-lg text-text-primary">
            From the owners who use it every day
          </h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-text-secondary">5.0 from 40+ clients</span>
          </div>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 shadow-card flex flex-col gap-6 transition-all duration-500 hover:shadow-card-hover ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: inView ? `${i * 120}ms` : "0ms",
              }}
            >
              <blockquote className="font-body text-text-primary leading-relaxed text-base flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-display font-bold text-primary">
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
