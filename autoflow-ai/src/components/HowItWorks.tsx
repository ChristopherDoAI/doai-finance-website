"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "We learn your business",
    body: "In a 45-minute strategy call, we map every scenario your phone and website handle. Your services, your prices, your objections, your tone of voice. This becomes the brain of your AI.",
  },
  {
    step: "02",
    title: "We build & connect your agents",
    body: "Within 48 hours, your voice agent is live on your phone number and your chat agent is live on your website. Both are rigorously tested before they ever speak to a real customer.",
  },
  {
    step: "03",
    title: "Leads flow into your pipeline",
    body: "Every interaction — every call, every chat, every booking — is logged, scored, and pushed into your CRM automatically. You check in when you want. The system never sleeps.",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-section bg-surface">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
            The process
          </span>
          <h2 className="font-display font-bold text-display-lg text-text-primary">
            Live in 48 hours.{" "}
            <span className="text-text-secondary">Here&apos;s exactly how.</span>
          </h2>
        </div>

        {/* Steps */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 shadow-card transition-all duration-500 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: inView ? `${i * 120}ms` : "0ms",
              }}
            >
              <span className="inline-block text-sm font-semibold text-primary mb-4">
                Step {step.step}
              </span>
              <h3 className="font-display font-bold text-xl text-text-primary mb-3 leading-tight">
                {step.title}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
