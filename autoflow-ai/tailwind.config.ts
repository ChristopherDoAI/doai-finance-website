import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        surface: "#F8F9FA",
        card: "#FFFFFF",
        "card-hover": "#F8F9FA",
        border: "#E5E7EB",
        "border-light": "#D1D5DB",
        accent: "#6366F1",
        "accent-dark": "#4F46E5",
        "accent-light": "#818CF8",
        text: {
          primary: "#0F172A",
          secondary: "#64748B",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 7vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-in-right": "slideInRight 0.4s ease forwards",
        "spin-slow": "spin 8s linear infinite",
        "pulse-accent": "pulseAccent 2s ease-in-out infinite",
        "count-up": "countUp 0.8s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseAccent: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(99, 102, 241, 0.4)" },
          "50%": { boxShadow: "0 0 0 8px rgba(99, 102, 241, 0)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      boxShadow: {
        "accent-glow": "0 4px 24px rgba(99, 102, 241, 0.12)",
        "accent-glow-sm": "0 2px 12px rgba(99, 102, 241, 0.08)",
        "card": "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(99,102,241,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
