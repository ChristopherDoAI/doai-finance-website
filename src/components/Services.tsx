"use client";

import { useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    title: "AI Voice Agent",
    headline: "Your phone answered, 24/7.",
    body:
      "An intelligent voice agent picks up every inbound call in your name. It answers questions, qualifies the lead, captures contact details, and books a slot in your diary — all without you lifting a finger.",
    tags: ["Twilio", "Retell AI", "Real-time STT/TTS"],
    accent: "Never miss a job opportunity again.",
  },
  {
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    title: "24/7 Chat Agent",
    headline: "Your website working while you sleep.",
    body:
      "An AI chatbot trained on your services, pricing, and FAQs sits on your website around the clock. It handles enquiries, turns visitors into warm leads, and routes high-intent prospects straight to your booking calendar.",
    tags: ["Claude API", "RAG knowledge base", "Live on your site"],
    accent: "Converts visitors into paying clients.",
  },
  {
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Lead Generation",
    headline: "A full pipeline, automatically.",
    body:
      "Every chat message, call transcript, and booking event flows directly into your CRM — scored, tagged, and ready to work. No manual data entry. No lost follow-ups. Just a clean pipeline of qualified prospects.",
    tags: ["HubSpot CRM", "Auto-scoring", "Follow-up sequences"],
    accent: "No lead left behind.",
  },
  {
    number: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: "Process Automation",
    headline: "Remove the admin. Multiply the output.",
    body:
      "From automated quote follow-ups to post-job review requests and invoice reminders — we build the repetitive workflows that eat your time, so you can focus on the work that actually makes you money.",
    tags: ["Custom workflows", "Zapier / Make", "API integrations"],
    accent: "Buy back hours every single week.",
  },
];

export default function Services() {
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
    <section id="services" className="py-28 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="text-xs font-display font-semibold tracking-[0.2em] uppercase text-accent mb-3 block">
              What we build
            </span>
            <h2 className="font-display font-extrabold text-display-lg text-text-primary">
              The automation
              <br />
              stack for your business
            </h2>
          </div>
          <p className="text-text-secondary font-body max-w-sm leading-relaxed text-sm md:text-base">
            Every product is custom-trained on your business. It knows your pricing, your services, your tone — and it represents you perfectly.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <div
              key={i}
              className={`group relative bg-card border border-border rounded-2xl p-8 hover:border-border-light hover:bg-card-hover transition-all duration-300 hover:shadow-card-hover cursor-default ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: inView ? `${i * 100}ms` : "0ms",
                transition: "opacity 0.5s ease, transform 0.5s ease, background-color 0.2s, border-color 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Number */}
              <span className="absolute top-6 right-8 font-display font-extrabold text-6xl text-text-primary/5 group-hover:text-accent/8 transition-colors duration-300 select-none pointer-events-none leading-none">
                {service.number}
              </span>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-surface border border-border flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-200">
                {service.icon}
              </div>

              {/* Text */}
              <p className="text-xs font-display font-semibold tracking-[0.15em] uppercase text-accent/70 mb-1">
                {service.title}
              </p>
              <h3 className="font-display font-bold text-xl text-text-primary mb-3 leading-snug">
                {service.headline}
              </h3>
              <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                {service.body}
              </p>

              {/* Accent line */}
              <p className="font-display font-semibold text-sm text-accent mb-5">
                → {service.accent}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-body bg-surface border border-border text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
