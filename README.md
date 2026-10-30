# Preem Pareva — Portfolio v3

Next.js 15 (App Router) + TypeScript + Tailwind v4 + MDX.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
```

## Where things live

- All copy: `content/*.ts` (site, journey, impact, work, domain, offDuty). Components hold no copy.
- Case studies: `content/case-studies/<slug>.mdx`, served at `/work/<slug>`.
- Photo and resume: `public/`.
- Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://preempareva.vercel.app`) on Vercel so OG tags, sitemap and robots use the real domain.

## Hiding an item

Every stat, work card and the resume button has an `approval` field. Set it to `"pending"` to take that item off the site without deleting it. Everything is `"approved"` right now.

## Still to confirm

- LinkedIn URL (`https://www.linkedin.com/in/preempareva`, taken from the resume handle).
- Degree label: the site uses the resume's "B.Tech Computer Engineering", not the spec's "B.E.".
- Real Off-duty photos (illustrations for now).
- GitHub link (left out, none supplied).


git clone https://github.com/preempareva/Portfolio.git
cd Portfolio
npm install
npm run dev        # http://localhost:3000
