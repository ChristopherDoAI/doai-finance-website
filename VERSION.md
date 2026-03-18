# Version Progress Log

---

## v0.1.0 — Initial Frontend Build
**Date:** 2026-03-18
**Status:** Complete

### What was built
Full Next.js 14 (App Router) marketing website for an AI automation agency.

### Tech stack locked in
- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS v3 with custom design tokens
- **Fonts:** Syne (display/headings) + IBM Plex Sans (body) via next/font/google
- **Calendly:** @calendly/react-calendly embed package
- **Animations:** Tailwind animate + custom CSS keyframes

### Design system
- **Aesthetic:** Dark industrial-luxury — charcoal backgrounds, electric amber accent, crisp white type
- **Background:** `#0A0A0B` base, `#111113` surface, `#1A1A1D` cards
- **Accent:** `#F0A500` amber gold (primary CTA, highlights, hover states)
- **Typography:** Syne 700/800 for headings (oversized, tight tracking), IBM Plex Sans 400/500 for body
- **Border:** `#28282C` subtle dividers

### Pages & components built
| File | Description |
|------|-------------|
| `src/app/layout.tsx` | Root layout, font loading, metadata, ChatWidget mounted globally |
| `src/app/page.tsx` | Main landing page — assembles all sections |
| `src/app/globals.css` | Design tokens, base styles, custom keyframes |
| `src/components/Navbar.tsx` | Sticky nav, transparent→solid on scroll, mobile hamburger menu |
| `src/components/Hero.tsx` | Full-viewport hero, large headline, dual CTAs, animated stat row |
| `src/components/Services.tsx` | 4 service cards: Voice Agent, 24/7 Chat, Lead Gen, Process Automation |
| `src/components/HowItWorks.tsx` | 3-step numbered process with connecting line |
| `src/components/Results.tsx` | Big-number stat strip (social proof metrics) |
| `src/components/Testimonials.tsx` | 3 client testimonial cards with avatar initials |
| `src/components/BookingSection.tsx` | Full-width Calendly embed section with CTA copy |
| `src/components/ChatWidget.tsx` | Floating chat bubble + slide-up chat panel (UI shell, v2 connects Claude API) |
| `src/components/Footer.tsx` | Links, socials, legal copy |
| `src/app/api/webhooks/calendly/route.ts` | Calendly webhook handler — HMAC verification, saves lead |

### What's NOT done yet (next versions)
- [ ] Claude API chatbot integration (v0.2.0)
- [ ] HubSpot CRM push from webhook (v0.2.0)
- [ ] Supabase lead storage implementation (v0.2.0)
- [ ] Voice agent demo page (v0.3.0)
- [ ] Admin dashboard (v0.4.0)
- [ ] Blog / SEO content pages (v0.5.0)
- [ ] A/B testing on hero copy (v0.5.0)

### How to run
```bash
cd autoflow-ai
npm install
cp .env.example .env.local
# Fill in CALENDLY_WEBHOOK_SECRET in .env.local
npm run dev
# → http://localhost:3000
```

### Env vars needed
```
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-link
CALENDLY_WEBHOOK_SECRET=your_signing_key_from_calendly_dashboard
```

---
