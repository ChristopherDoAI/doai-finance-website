"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 94, suffix: "%", label: "Calls answered first ring" },
  { value: 3, prefix: "£", suffix: "k+", label: "Avg. value recovered per month" },
  { value: 24, suffix: "/7", label: "Always on, never tired" },
  { value: 48, suffix: "h", label: "Average setup time" },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  inView,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span>
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsInView, setStatsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Amber radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Tag line */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div
          className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-body text-text-secondary"
          style={{ animation: "fadeUp 0.5s ease forwards", opacity: 0 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          AI automation for ambitious business owners
        </div>

        {/* Main headline */}
        <h1
          className="font-display font-extrabold text-display-xl text-balance max-w-5xl mb-6"
          style={{ animation: "fadeUp 0.55s 100ms ease forwards", opacity: 0 }}
        >
          Every missed call
          <br />
          is{" "}
          <span className="gradient-text">lost revenue.</span>
          <br />
          <span className="text-text-secondary">We fix that.</span>
        </h1>

        {/* Sub-copy */}
        <p
          className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mb-10 leading-relaxed"
          style={{ animation: "fadeUp 0.55s 220ms ease forwards", opacity: 0 }}
        >
          DoAi deploys intelligent agents that answer your calls, qualify
          your leads, and book your diary — while you&apos;re on the job, in a
          meeting, or sound asleep.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-4 mb-20"
          style={{ animation: "fadeUp 0.55s 340ms ease forwards", opacity: 0 }}
        >
          <button
            onClick={scrollToBooking}
            className="group h-12 px-7 rounded-full bg-accent text-white font-display font-bold tracking-tight text-base hover:bg-accent-light active:scale-95 transition-all duration-150 shadow-accent-glow flex items-center gap-2"
          >
            Book a free strategy call
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
          <button
            onClick={scrollToServices}
            className="h-12 px-7 rounded-full border border-border-light text-text-primary font-display font-semibold text-base hover:border-accent hover:text-accent active:scale-95 transition-all duration-150"
          >
            See what we build
          </button>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px border border-border bg-border rounded-xl overflow-hidden"
          style={{ animation: "fadeUp 0.55s 460ms ease forwards", opacity: 0 }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-surface px-6 py-6 flex flex-col gap-1 hover:bg-card transition-colors duration-200"
            >
              <span className="font-display font-extrabold text-3xl md:text-4xl text-text-primary tracking-tight">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  inView={statsInView}
                />
              </span>
              <span className="text-xs font-body text-text-muted leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: "fadeIn 1s 1200ms ease forwards", opacity: 0 }}
      >
        <span className="text-xs font-body text-text-muted tracking-widest uppercase">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-text-muted to-transparent" />
      </div>
    </section>
  );
}
