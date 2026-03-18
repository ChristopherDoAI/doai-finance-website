"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Results", href: "#results" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBooking = () => {
    const el = document.getElementById("booking");
    el?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight flex items-center gap-2 group"
          aria-label="AutoFlow AI home"
        >
          <span className="w-7 h-7 rounded bg-accent flex items-center justify-center text-base text-sm font-black text-white transition-transform duration-200 group-hover:scale-110">
            A
          </span>
          <span className="text-text-primary">
            Auto<span className="text-accent">Flow</span> AI
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-body text-text-secondary hover:text-text-primary transition-colors duration-200 underline-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleBooking}
            className="h-9 px-5 rounded-full bg-accent text-white text-sm font-display font-semibold tracking-tight hover:bg-accent-light active:scale-95 transition-all duration-150 animate-pulse-accent"
          >
            Book a free call
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={clsx(
              "block w-5 h-0.5 bg-text-primary transition-all duration-200",
              menuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={clsx(
              "block w-5 h-0.5 bg-text-primary transition-all duration-200",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={clsx(
              "block w-5 h-0.5 bg-text-primary transition-all duration-200",
              menuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={clsx(
          "md:hidden overflow-hidden transition-all duration-300 bg-surface border-b border-border",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-body text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-border">
            <button
              onClick={handleBooking}
              className="w-full h-11 rounded-full bg-accent text-white font-display font-semibold tracking-tight hover:bg-accent-light transition-colors"
            >
              Book a free call
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
