"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Image from "next/image";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how-it-works" },
  {/* { label: "Results", href: "#results" }, */ },
  {/* { label: "Testimonials", href: "#testimonials" }, */ }
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
          ? "bg-white/90 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-content mx-auto px-8 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight flex items-center gap-2 group"
          aria-label="DoAi home"
        >
          <Image
            src="/logo.png"
            alt="DoAi logo"
            width={147}
            height={147}
            className="w-9 h-9 transition-transform duration-200 group-hover:scale-110"
          />
          <span className="text-text-primary">
            Do<span className="text-primary">Ai</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
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
            className="h-10 px-5 rounded-lg bg-primary text-white text-sm font-display font-semibold tracking-tight hover:bg-primary-dark active:scale-[0.98] transition-all duration-150"
          >
            Book a demo
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
          "md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-lg border-b border-border",
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="px-8 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-2 border-t border-border">
            <button
              onClick={handleBooking}
              className="w-full h-11 rounded-lg bg-primary text-white font-display font-semibold tracking-tight hover:bg-primary-dark transition-colors"
            >
              Book a demo
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
