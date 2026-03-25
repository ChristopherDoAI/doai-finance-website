"use client";

import { useEffect, useRef, useState } from "react";

interface ServiceData {
  title: string;
  headline: string;
  body: string;
}

const SERVICE_ICONS: Record<string, { bg: string; iconColor: string; icon: JSX.Element }> = {
  "GoHighLevel CRM Setup": {
    bg: "bg-card-green",
    iconColor: "text-green-700",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
  "Text AI (WhatsApp/SMS Bots)": {
    bg: "bg-card-blue",
    iconColor: "text-blue-700",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  "Voice AI Agents": {
    bg: "bg-card-pink",
    iconColor: "text-pink-700",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  "Voice AI Agents (Inbound/Outbound)": {
    bg: "bg-card-pink",
    iconColor: "text-pink-700",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  "AI Audits": {
    bg: "bg-card-orange",
    iconColor: "text-orange-700",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  "Custom Projects": {
    bg: "bg-card-green",
    iconColor: "text-green-700",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
};

const BG_CYCLE = ["bg-card-green", "bg-card-blue", "bg-card-pink", "bg-card-orange"];
const COLOR_CYCLE = ["text-green-700", "text-blue-700", "text-pink-700", "text-orange-700"];

const DEFAULT_ICON = (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

// Fallback services in case Notion is unreachable
const FALLBACK_SERVICES: ServiceData[] = [
  {
    title: "GoHighLevel CRM Setup",
    headline: "Your Sales Pipeline, Fully Automated",
    body: "We set up and configure GoHighLevel as your all-in-one CRM - managing leads, automating follow-ups, and keeping your pipeline organised so nothing falls through the cracks",
  },
  {
    title: "Text AI (WhatsApp/SMS Bots)",
    headline: "Instant Replies On The Channels Your Customers Use",
    body: "AI-powered chatbots on WhatsApp and SMS that handle enquiries, qualify leads, and book appointments 24/7 - so you never miss a message, even outside office hours",
  },
  {
    title: "Voice AI Agents",
    headline: "Your Phone Answered, 24/7",
    body: "Intelligent voice agents that pick up every inbound call in your business name. They answer questions, qualify leads, capture details, and book slots in your diary - all without you lifting a finger",
  },
  {
    title: "AI Audits",
    headline: "Find Out Where AI Can Save You Time And Money",
    body: "A thorough review of your business operations to identify where AI and automation can eliminate manual work, reduce costs, and unlock growth - with a clear action plan to get started",
  },
  {
    title: "Custom Projects",
    headline: "Bespoke Automation, Built For Your Business",
    body: "For businesses with unique workflows and requirements, we design and build custom AI automation solutions tailored to your specific needs - from integrations to full end-to-end systems",
  },
];

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [services, setServices] = useState<ServiceData[]>(FALLBACK_SERVICES);

  useEffect(() => {
    fetch("/api/notion/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        }
      })
      .catch(() => {
        // Keep fallback
      });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-section relative">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-3 block">
            What We Build
          </span>
          <h2 className="font-display font-bold text-display-lg text-text-primary">
            Transform Your Business Operations
          </h2>
        </div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const iconData = SERVICE_ICONS[service.title];
            const bg = iconData?.bg || BG_CYCLE[i % BG_CYCLE.length];
            const iconColor = iconData?.iconColor || COLOR_CYCLE[i % COLOR_CYCLE.length];
            const icon = iconData?.icon || DEFAULT_ICON;

            const isLastOdd = services.length % 2 === 1 && i === services.length - 1;

            return (
              <div
                key={service.title}
                className={`${bg} rounded-3xl p-10 lg:p-12 transition-all duration-500 ${
                  isLastOdd ? "md:col-span-2 md:max-w-[calc(50%-0.75rem)] md:mx-auto" : ""
                } ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{
                  transitionDelay: inView ? `${i * 100}ms` : "0ms",
                }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-white/60 flex items-center justify-center ${iconColor} mb-6`}>
                  {icon}
                </div>

                {/* Text */}
                <p className="text-xs font-semibold tracking-widest uppercase text-text-muted mb-2">
                  {service.title}
                </p>
                <h3 className="font-display font-bold text-xl text-text-primary mb-3 leading-snug">
                  {service.headline}
                </h3>
                <p className="font-body text-sm text-text-secondary leading-relaxed max-w-sm">
                  {service.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
