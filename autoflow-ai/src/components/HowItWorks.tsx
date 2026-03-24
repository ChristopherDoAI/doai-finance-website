"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    step: "01",
    title: "We Learn Your Business",
    body: "In a 45-minute strategy call, we map every scenario your phone and website handle. Your services, your prices, your objections, your tone of voice. This becomes the brain of your AI",
    detail: "You talk, we build the knowledge base",
  },
  {
    step: "02",
    title: "We Build & Connect Your Agents",
    body: "Within 1 week, your voice agent is live on your phone number and your chat agent is live on your website. Both are rigorously tested before they ever speak to a real customer",
    detail: "Live in under one week",
  },
  {
    step: "03",
    title: "Leads Flow Into Your Pipeline",
    body: "Every interaction - every call, every chat, every booking - is logged, scored, and pushed into your CRM automatically. You check in when you want. The system never sleeps",
    detail: "You focus on the work, we handle the rest",
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-28 bg-surface relative overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">
            The Process
          </span>
          <h2 className="font-display font-extrabold text-display-lg text-text-primary">
            Live In 1 Week.
            <br />
            <span className="text-text-secondary">Here&apos;s Exactly How.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Vertical connecting line (desktop) */}
          <div className="hidden lg:block absolute left-[calc(50%-0.5px)] top-8 bottom-8 w-px bg-border" />

          <div className="flex flex-col gap-12 lg:gap-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={step.step}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 items-center transition-all duration-[600ms] ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
                >
                  {/* Content side */}
                  <div
                    className={
                      isLeft
                        ? "lg:text-right lg:pr-12"
                        : "lg:order-2 lg:pl-12"
                    }
                  >
                    {/* Step number + horizontal line */}
                    <div
                      className={`inline-flex items-center gap-3 mb-4 ${
                        isLeft ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="font-display font-extrabold text-5xl text-accent/20 leading-none">
                        {step.step}
                      </span>
                      <div className="h-px w-8 bg-accent/40" />
                    </div>

                    <h3 className="font-display font-bold text-2xl text-text-primary mb-3 leading-tight">
                      {step.title}
                    </h3>

                    <p
                      className={`font-body text-text-secondary leading-relaxed mb-4 text-sm max-w-sm ${
                        isLeft ? "lg:ml-auto" : ""
                      }`}
                    >
                      {step.body}
                    </p>

                    <p className="font-display font-semibold text-sm text-accent">
                      → {step.detail}
                    </p>
                  </div>

                  {/* Centre node (desktop) */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-10 h-10 rounded-full bg-card border-2 border-accent flex items-center justify-center">
                      <span className="font-display font-bold text-xs text-accent">
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Empty side (desktop) */}
                  {isLeft && <div className="hidden lg:block" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
