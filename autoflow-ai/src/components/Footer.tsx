"use client";

import Image from "next/image";
import { useState } from "react";

const footerLinks = {
  Services: [
    { label: "GoHighLevel CRM", href: "#services" },
    { label: "WhatsApp/SMS Bots", href: "#services" },
    { label: "Voice AI Agents", href: "#services" },
    { label: "AI Audits", href: "#services" },
    { label: "Custom Projects", href: "#services" },
  ],
  Company: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Book a call", href: "#booking" },
  ],
};

function BirdLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className ?? "w-9 h-9"}>
      <polygon points="20,60 50,38 30,82" fill="#FFDB46"/>
      <polygon points="50,38 68,28 50,55" fill="#FFE574"/>
      <polygon points="20,60 30,82 10,76" fill="#E8C422"/>
      <polygon points="35,55 50,28 50,55" fill="#FFDB46" opacity="0.85"/>
    </svg>
  );
}

function FooterLogoMark() {
  const [imgFailed, setImgFailed] = useState(false);

  if (imgFailed) {
    return <BirdLogo className="w-9 h-9 transition-transform duration-200 group-hover:scale-110" />;
  }

  return (
    <Image
      src="/logos/doai-bird.png"
      alt="DOAI bird mark"
      width={36}
      height={36}
      className="w-9 h-9 transition-transform duration-200 group-hover:scale-110"
      unoptimized
      onError={() => setImgFailed(true)}
    />
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-dark">
      {/* Main footer grid */}
      <div className="section-container py-24 lg:py-28">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-flex items-center gap-2 mb-4 group">
              <FooterLogoMark />
              <span className="font-display font-semibold text-lg text-white tracking-wide uppercase">
                DOAI
              </span>
            </a>
            <p className="font-body text-sm text-text-muted leading-relaxed max-w-xs mb-8">
              AI automation that answers calls, qualifies leads, and fills diaries. Built for business owners who are too busy to miss an opportunity.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display font-semibold text-xs tracking-widest uppercase text-text-muted mb-6">
                {heading}
              </h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          document
                            .getElementById(link.href.slice(1))
                            ?.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="section-container py-6 lg:py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-text-muted">
            &copy; {year} DOAI Ltd. All rights reserved.
          </p>
          <p className="font-body text-xs text-text-muted flex items-center gap-1.5">
            Built With
            <span className="text-primary">&hearts;</span>
            for ambitious business owners
          </p>
        </div>
      </div>
    </footer>
  );
}
