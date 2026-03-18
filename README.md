# AutoFlow AI — Website

Marketing website for an AI automation agency. Built with Next.js 14, Tailwind CSS, and the Calendly embed API.

## Quick start

```bash
npm install
cp .env.example .env.local
# Edit .env.local with your Calendly URL and webhook secret
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CALENDLY_URL` | Yes | Your Calendly scheduling link |
| `CALENDLY_WEBHOOK_SECRET` | Yes | Signing key from Calendly dashboard → Integrations → Webhooks |

## Project structure

```
src/
├── app/
│   ├── layout.tsx              Root layout, fonts, global ChatWidget
│   ├── page.tsx                Main landing page
│   ├── globals.css             Design tokens, keyframes, base styles
│   └── api/
│       └── webhooks/
│           └── calendly/
│               └── route.ts   Webhook handler (HMAC verified)
└── components/
    ├── Navbar.tsx              Sticky nav with mobile menu
    ├── Hero.tsx                Full-viewport hero + animated stats
    ├── Results.tsx             Scrolling metric ticker
    ├── Services.tsx            4 service cards
    ├── HowItWorks.tsx          3-step process
    ├── Testimonials.tsx        Client quote cards
    ├── BookingSection.tsx      Calendly inline + popup embed
    ├── ChatWidget.tsx          Floating chat panel (AI in v0.2.0)
    └── Footer.tsx              Links, socials, CTA band
```

## Calendly setup

1. Go to [Calendly](https://calendly.com) → create an event type called "Discovery Call"
2. Copy the scheduling URL into `NEXT_PUBLIC_CALENDLY_URL`
3. Go to Integrations → Webhooks → Add new webhook
4. Set the URL to `https://yourdomain.com/api/webhooks/calendly`
5. Subscribe to `invitee.created` and `invitee.canceled`
6. Copy the signing key into `CALENDLY_WEBHOOK_SECRET`

## Roadmap

See `VERSION.md` for full progress log.

- **v0.2.0** — Claude API chatbot, Supabase lead storage, HubSpot CRM push
- **v0.3.0** — Voice agent demo page, Twilio/Retell AI integration docs
- **v0.4.0** — Admin dashboard (booking overview, lead pipeline)
- **v0.5.0** — Blog, SEO content pages, A/B testing

## Tech stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** with custom design tokens
- **Fonts:** Syne (display) + IBM Plex Sans (body)
- **Calendly** embed v2 (inline + popup widget)
- **Deployment:** Vercel (zero config)
