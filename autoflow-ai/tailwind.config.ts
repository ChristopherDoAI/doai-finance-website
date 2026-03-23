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
        // Brand — deep green (Sierra-inspired)
        primary: "#0D654A",
        "primary-dark": "#094D38",
        "primary-light": "#14A06E",

        // Alias so ChatWidget keeps working untouched
        accent: "#0D654A",
        "accent-dark": "#094D38",
        "accent-light": "#14A06E",

        // Surfaces
        base: "#FFFFFF",
        surface: "#F7F7F5",
        "surface-dark": "#111111",
        card: "#FFFFFF",
        "card-hover": "#F7F7F5",

        // Feature-card tints
        "card-green": "#E8F5E9",
        "card-blue": "#E3F2FD",
        "card-pink": "#FCE4EC",
        "card-orange": "#FFF3E0",

        // Borders
        border: "#E8E8E5",
        "border-light": "#D4D4D0",

        // Text
        text: {
          primary: "#111111",
          secondary: "#555555",
          muted: "#999999",
          "on-dark": "#FFFFFF",
          "on-dark-muted": "#AAAAAA",
        },
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 5.5vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.12", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.015em" },
        ],
      },
      maxWidth: {
        content: "1160px",
      },
      spacing: {
        section: "7rem",
        "section-lg": "9rem",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-in-right": "slideInRight 0.4s ease forwards",
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
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 4px 20px rgba(0,0,0,0.03)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.08)",
        elevated: "0 12px 40px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
