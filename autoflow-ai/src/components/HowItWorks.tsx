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

        {/* Timeline + Dashboard */}
        <div ref={ref} className="relative lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left: Timeline steps */}
          <div className="relative">
            {/* Vertical connecting line (desktop) */}
            <div className="hidden lg:block absolute right-0 top-8 bottom-8 w-px bg-border" />

            <div className="flex flex-col gap-16">
              {steps.map((step, i) => (
                <div
                  key={step.step}
                  className={`relative transition-all duration-[600ms] ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
                >
                  {/* Step number + horizontal line */}
                  <div className="inline-flex items-center gap-3 mb-4">
                    <span className="font-display font-extrabold text-5xl text-accent/20 leading-none">
                      {step.step}
                    </span>
                    <div className="h-px w-8 bg-accent/40" />
                  </div>

                  <h3 className="font-display font-bold text-2xl text-text-primary mb-3 leading-tight">
                    {step.title}
                  </h3>

                  <p className="font-body text-text-secondary leading-relaxed mb-4 text-sm max-w-sm">
                    {step.body}
                  </p>

                  <p className="font-display font-semibold text-sm text-accent">
                    → {step.detail}
                  </p>

                  {/* Node on the line (desktop) */}
                  <div className="hidden lg:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-10 h-10 rounded-full bg-card border-2 border-accent flex items-center justify-center">
                      <span className="font-display font-bold text-xs text-accent">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky Dashboard Mockup */}
          <div className="hidden lg:flex items-center">
            <div className="sticky top-32 w-full">
              <div
                className={`bg-white rounded-2xl border border-border shadow-card overflow-hidden transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: inView ? "300ms" : "0ms" }}
              >
                {/* Dashboard header */}
                <div className="px-6 py-4 border-b border-border bg-card/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="font-display font-bold text-xs text-primary">D</span>
                      </div>
                      <span className="font-display font-semibold text-sm text-text-primary">DoAi Dashboard</span>
                    </div>
                    <span className="text-xs text-text-muted font-body">Live</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-px bg-border">
                  {[
                    { label: "Leads Today", value: "12", trend: "+3" },
                    { label: "Calls Handled", value: "47", trend: "+8" },
                    { label: "Bookings", value: "8", trend: "+2" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white px-4 py-4 text-center">
                      <p className="font-display font-extrabold text-2xl text-text-primary">{stat.value}</p>
                      <p className="text-xs text-text-muted font-body mt-0.5">{stat.label}</p>
                      <span className="inline-block mt-1 text-xs font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                        {stat.trend}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recent activity */}
                <div className="px-6 py-4">
                  <p className="text-xs font-display font-semibold text-text-muted uppercase tracking-wider mb-3">
                    Recent Activity
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Sarah M.", action: "Booked", time: "2m ago", color: "bg-green-400" },
                      { name: "James T.", action: "Qualified", time: "8m ago", color: "bg-blue-400" },
                      { name: "Lisa R.", action: "Follow up", time: "15m ago", color: "bg-amber-400" },
                      { name: "Tom W.", action: "Booked", time: "22m ago", color: "bg-green-400" },
                      { name: "Emma K.", action: "Qualified", time: "31m ago", color: "bg-blue-400" },
                    ].map((item) => (
                      <div key={item.name} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                        <span className="font-body text-sm text-text-primary flex-1">{item.name}</span>
                        <span className="font-body text-xs text-text-muted">{item.action}</span>
                        <span className="font-body text-xs text-text-muted/60">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="px-6 py-3 border-t border-border bg-card/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-muted font-body">All systems operational</span>
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
