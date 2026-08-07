import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS — Sapient Hall
// Direction: bold, tech-forward, trustworthy. Navy as the anchor,
// a single warm gold used sparingly as the "important thing" signal,
// royal blue for interactive states, mono type for data/stats.
// ─────────────────────────────────────────────────────────────
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF1F8",
          100: "#D6DCEC",
          200: "#AEB9D9",
          300: "#7E8FBE",
          400: "#4E5F97",
          500: "#2C3B6E",
          600: "#1B2A54",
          700: "#121D3E",
          800: "#0B1530",
          900: "#070E22", // primary — deep navy
          950: "#040815",
        },
        royal: {
          50: "#EBF0FF",
          100: "#D2DEFF",
          200: "#A6BDFF",
          300: "#7398FF",
          400: "#4571F5",
          500: "#2451D6", // secondary — royal blue
          600: "#1B3FB0",
          700: "#16328A",
          800: "#122868",
          900: "#0E1F4F",
        },
        gold: {
          50: "#FBF6E9",
          100: "#F4E8C1",
          200: "#EAD489",
          300: "#DFBF57",
          400: "#D3AC38",
          500: "#C9A227", // accent — gold
          600: "#A6821B",
          700: "#7D6215",
          800: "#544210",
          900: "#332809",
        },
        surface: {
          DEFAULT: "#F7F8FB", // background — soft white
          card: "#FFFFFF",
          muted: "#EEF1F6",
          border: "#E3E7EF",
        },
        emerald: {
          50: "#E8F8F1",
          500: "#0F9D68",
          600: "#0B7C52",
        },
        amber: {
          50: "#FDF3E4",
          500: "#D97F0A",
          600: "#B3660A",
        },
        crimson: {
          50: "#FBEAEA",
          500: "#D64545",
          600: "#B23434",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // fluid-ish scale, precise line-heights for a display face
        "display-2xl": ["4.5rem", { lineHeight: "1.02", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-xl": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "600" }],
        "display-lg": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "600" }],
        "display-md": ["2.125rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
        "display-sm": ["1.625rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        "body-lg": ["1.1875rem", { lineHeight: "1.6" }],
        "body-md": ["1.0625rem", { lineHeight: "1.65" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.55" }],
        caption: ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.01em" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.14em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        xs: "0.375rem",
        sm: "0.625rem",
        DEFAULT: "0.875rem",
        lg: "1.25rem",
        xl: "1.75rem",
        "2xl": "2.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(7,14,34,0.04), 0 8px 24px -8px rgba(7,14,34,0.10)",
        card: "0 1px 3px rgba(7,14,34,0.06), 0 16px 40px -16px rgba(7,14,34,0.14)",
        lifted: "0 24px 60px -20px rgba(7,14,34,0.28)",
        glow: "0 0 0 1px rgba(201,162,39,0.35), 0 8px 30px -6px rgba(201,162,39,0.35)",
      },
      backgroundImage: {
        "mesh-navy":
          "radial-gradient(60% 50% at 15% 10%, rgba(36,81,214,0.35) 0%, rgba(36,81,214,0) 60%), radial-gradient(45% 40% at 90% 0%, rgba(201,162,39,0.25) 0%, rgba(201,162,39,0) 60%), radial-gradient(70% 60% at 50% 100%, rgba(18,29,62,0.6) 0%, rgba(7,14,34,0) 60%)",
        "grid-fade":
          "linear-gradient(to bottom, rgba(247,248,251,0) 0%, rgba(247,248,251,1) 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
