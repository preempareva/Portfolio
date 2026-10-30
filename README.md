# Preem Pareva — Portfolio v3

Next.js 15 (App Router) + TypeScript + Tailwind v4 + MDX. Single-page portfolio with six case-study pages.

## Run locally

Requires Node 20+.

```bash
git clone https://github.com/preempareva/Portfolio.git
cd Portfolio
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm start          # serve the production build
```

## Deploy (Vercel)

1. Import the repo on Vercel. It detects Next.js; keep the default build settings.
2. Optional but recommended once you have a final domain: set `NEXT_PUBLIC_SITE_URL` (e.g. `https://preempareva.com`).
   Without it, canonical URLs, Open Graph tags, the sitemap and robots.txt use Vercel's production domain
   (`VERCEL_PROJECT_PRODUCTION_URL`), never `localhost`.

## Where things live

- All copy: `content/*.ts` (site, journey, impact, work, domain, offDuty). Components hold no copy.
- Case studies: `content/case-studies/<slug>.mdx`, served at `/work/<slug>`.
- Photo and resume: `public/`.
- Styles and design tokens (both themes): `app/globals.css`.

## Hiding an item

Every stat, work card and the resume button has an `approval` field. Set it to `"pending"` to take that
item off the site (including its case-study route and sitemap entry) without deleting it.
`NEXT_PUBLIC_SHOW_PENDING=1` shows pending items anyway, for previews.

## Motion

The intro plays once per browser session on `/`. Animations respect `prefers-reduced-motion`
(Windows: Settings → Accessibility → Visual effects → Animation effects): motion becomes simple fades.
