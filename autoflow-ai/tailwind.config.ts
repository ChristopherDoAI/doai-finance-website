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
        // Brand — dark navy + gold
        primary: "#FFDB46",
        "primary-dark": "#E8C422",
        "primary-light": "#FFE574",

        // Alias so ChatWidget keeps working untouched
        accent: "#FFDB46",
        "accent-dark": "#E8C422",
        "accent-light": "#FFE574",

        // Surfaces
        base: "#1D334E",
        surface: "#243B58",
        "surface-dark": "#14253A",
        card: "#243B58",
        "card-hover": "#2A4566",

        // Feature-card tints — uniform dark surface (icons provide differentiation)
        "card-green": "#243B58",
        "card-blue": "#243B58",
        "card-pink": "#243B58",
        "card-orange": "#243B58",

        // Borders
        border: "#2D4566",
        "border-light": "#3A546E",

        // Text
        text: {
          primary: "#FFFFFF",
          secondary: "#C8D4E2",
          muted: "#8A9CB0",
          "on-dark": "#FFFFFF",
          "on-dark-muted": "#8A9CB0",
          "on-light": "#1D334E",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        body: ["var(--font-manrope)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "clamp(2.75rem, 5.5vw, 4.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.015em" },
        ],
        "display-lg": [
          "clamp(2rem, 4vw, 3rem)",
          { lineHeight: "1.12", letterSpacing: "-0.012em" },
        ],
        "display-md": [
          "clamp(1.5rem, 3vw, 2.25rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
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
        card: "0 1px 3px rgba(0,0,0,0.2), 0 4px 20px rgba(0,0,0,0.15)",
        "card-hover": "0 8px 30px rgba(0,0,0,0.3)",
        elevated: "0 12px 40px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
