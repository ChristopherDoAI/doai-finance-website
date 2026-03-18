"use client";

const footerLinks = {
  Services: [
    { label: "AI Voice Agent", href: "#services" },
    { label: "24/7 Chat Agent", href: "#services" },
    { label: "Lead Generation", href: "#services" },
    { label: "Process Automation", href: "#services" },
  ],
  Company: [
    { label: "How it works", href: "#how-it-works" },
    { label: "Results", href: "#results" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Book a call", href: "#booking" },
  ],
  Legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of service", href: "/terms" },
    { label: "Cookie policy", href: "/cookies" },
  ],
};

const socials = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://x.com",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      {/* Top CTA band */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display font-extrabold text-2xl text-text-primary mb-1">
              Ready to stop leaving money on the table?
            </h3>
            <p className="font-body text-sm text-text-secondary">
              Book a free 30-minute strategy call. No commitment, no hard sell.
            </p>
          </div>
          <a
            href="#booking"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex-shrink-0 h-12 px-7 rounded-full bg-accent text-white font-display font-bold tracking-tight text-sm hover:bg-accent-light active:scale-95 transition-all duration-150 flex items-center gap-2 shadow-accent-glow"
          >
            Book your free call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="inline-flex items-center gap-2 mb-4 group">
              <span className="w-7 h-7 rounded bg-accent flex items-center justify-center text-sm font-black text-white transition-transform duration-200 group-hover:scale-110">
                A
              </span>
              <span className="font-display font-bold text-lg text-text-primary">
                Auto<span className="text-accent">Flow</span> AI
              </span>
            </a>
            <p className="font-body text-sm text-text-muted leading-relaxed max-w-xs mb-6">
              AI automation that answers calls, qualifies leads, and fills diaries — built for business owners who are too busy to miss an opportunity.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display font-semibold text-xs tracking-[0.15em] uppercase text-text-muted mb-5">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
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
                      className="font-body text-sm text-text-secondary hover:text-text-primary transition-colors duration-150"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-text-muted">
            © {year} AutoFlow AI Ltd. All rights reserved.
          </p>
          <p className="font-body text-xs text-text-muted flex items-center gap-1.5">
            Built with
            <span className="text-accent">♥</span>
            for ambitious business owners
          </p>
        </div>
      </div>
    </footer>
  );
}
