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


        {/* Two-column: Timeline left, Phone mockup right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Timeline steps */}
          <div ref={ref} className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-5 top-8 bottom-8 w-px bg-border" />

            <div className="flex flex-col gap-10">
              {steps.map((step, i) => (
                <div
                  key={step.step}
                  className={`relative pl-14 transition-all duration-[600ms] ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
                >
                  {/* Node */}
                  <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-card border-2 border-accent flex items-center justify-center z-10">
                    <span className="font-display font-bold text-xs text-accent">
                      {i + 1}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-3 mb-3">
                    <span className="font-display font-extrabold text-4xl text-accent/20 leading-none">
                      {step.step}
                    </span>
                    <div className="h-px w-6 bg-accent/40" />
                  </div>

                  <h3 className="font-display font-bold text-xl text-text-primary mb-2 leading-tight">
                    {step.title}
                  </h3>

                  <p className="font-body text-text-secondary leading-relaxed mb-3 text-sm max-w-sm">
                    {step.body}
                  </p>

                  <p className="font-display font-semibold text-sm text-accent">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Phone mockup - Voice AI answering */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[280px]">
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden">
                  <div className="bg-gray-900 px-6 py-2 flex items-center justify-between">
                    <span className="text-white text-xs font-medium">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-2.5 border border-white/60 rounded-sm relative">
                        <div className="absolute inset-0.5 bg-green-400 rounded-[1px]" style={{ width: "70%" }} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-b from-primary/90 to-primary px-6 py-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-1">Incoming Call</p>
                    <p className="text-white font-display font-bold text-lg mb-1">Sarah Mitchell</p>
                    <p className="text-white/60 text-xs">07421 339 201</p>
                  </div>

                  <div className="px-5 py-4 bg-accent/5 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">AI</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-display font-semibold text-text-primary">DoAi Voice Agent</p>
                        <p className="text-xs text-accent font-medium flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Answering call...
                        </p>
                      </div>
                      <span className="text-xs text-text-muted font-mono">0:12</span>
                    </div>
                  </div>

                  <div className="px-5 py-4 space-y-3">
                    <div className="flex gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-accent font-bold" style={{ fontSize: "8px" }}>AI</span>
                      </div>
                      <div className="bg-surface rounded-lg rounded-tl-none px-3 py-2">
                        <p className="text-xs text-text-secondary leading-relaxed">Good morning! Thanks for calling. How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex gap-2 justify-end">
                      <div className="bg-primary/5 rounded-lg rounded-tr-none px-3 py-2">
                        <p className="text-xs text-text-primary leading-relaxed">Hi, I need a quote for a new boiler installation</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-accent font-bold" style={{ fontSize: "8px" }}>AI</span>
                      </div>
                      <div className="bg-surface rounded-lg rounded-tl-none px-3 py-2">
                        <p className="text-xs text-text-secondary leading-relaxed">Of course! Let me book you in for a free quote...</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3 border-t border-border flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider">Lead Captured To CRM</span>
                  </div>
                </div>
              </div>

              <div className="absolute -inset-4 rounded-[3rem] border border-accent/10 -z-10" />
              <div className="absolute -inset-8 rounded-[3.5rem] border border-accent/5 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
