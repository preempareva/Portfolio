import type { Approval } from "@/lib/flags";

// Explicit URL first, then Vercel's production domain (set automatically at build), then the
// per-deployment URL, so canonical/OG/sitemap never point at localhost on Vercel.
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl().replace(/\/$/, "");

export const site = {
  name: "Preem Pareva",
  brand: "PREEM PAREVA",
  role: "Product Analyst",
  company: "Media.net",
  location: "Mumbai",
  positioning: "Business × Technology × Analytics",
  seo: {
    title: "Preem Pareva — Business × Technology × Analytics",
    description:
      "Product Analyst at Media.net in Mumbai. Computer engineer who builds dashboards, automations and AI tools, and turns data into decisions.",
  },
  nav: [
    { id: "about", label: "About" },
    { id: "journey", label: "Journey" },
    { id: "impact", label: "Impact" },
    { id: "work", label: "Work" },
    { id: "domain", label: "Domain" },
    { id: "off-duty", label: "Off-duty" },
  ],
  hero: {
    eyebrow: "PORTFOLIO / 2026 — MUMBAI",
    lines: ["TURNING DATA,", "TECH & IDEAS INTO", "BUSINESS"],
    accent: "impact.",
    statement: "I turn data into decisions.",
    intro:
      "Product Analyst at Media.net. Computer engineer. I build dashboards, automations and AI tools, and I like proving they moved something.",
    primaryCta: { label: "See the receipts ↓", href: "#impact" },
    secondaryCta: { label: "Let’s talk ↗", href: "#contact" },
    status: [
      { label: "NOW", value: "PRODUCT ANALYST @ MEDIA.NET" },
      { label: "", value: "OPEN TO CONVERSATIONS", dot: true },
    ],
    ticker: [
      "Python",
      "SQL",
      "Tableau",
      "Power BI",
      "Redshift",
      "Excel",
      "Power Automate",
      "Header bidding",
      "RTB",
      "Lead gen",
      "A/B tests",
      "Git",
    ],
  },
  about: {
    eyebrow: "01 / ABOUT",
    before: "Hi, I’m",
    accent: "Preem.",
    intro: "I’m the person who asks “but why did that number move?” and then can’t sleep until I find out.",
    bio: [
      "I’m a computer engineer who ended up loving the business side of technology. At Media.net I work on customer acquisition and lead generation: funnels, traffic quality, experiments, and the data behind them.",
      "Before that I spent a few months at RP Tech turning slow, manual enterprise processes into automations, dashboards and an internal AI platform.",
      // [[highlight]] marks the phrase rendered with the soft lime highlight.
      "I learn by building things, breaking them, and [[figuring out why]]. I’m also the extrovert in the room: I helped lead a 5,000+ person college fest, and I’m happiest when I can explain a messy technical thing to a non-technical person in two minutes.",
    ],
    photo: { src: "/preem.jpg", alt: "Preem Pareva, smiling, arms crossed, at the office in Mumbai" },
    tiles: [
      {
        label: "HOW I APPROACH PROBLEMS",
        title: "Question, break down, test.",
        body: "Check the data is real, segment it, make several guesses, kill the wrong ones.",
      },
      {
        label: "WHAT PULLS ME IN",
        title: "Experiments & automation",
        body: "Anything where a hunch can become a measured result, or a boring task can disappear.",
      },
      {
        label: "CURRENTLY",
        title: "Going deeper on AdTech",
        body: "Also building this site, and quietly plotting an MBA.",
      },
    ],
    askMeAbout: ["funnels", "building with AI", "A/B tests", "running a fest", "Ferrari"],
  },
  contact: {
    eyebrow: "07 / CONTACT",
    before: "Let’s build",
    accent: "something.",
    body: "Hiring, building, or just good AdTech chat? I reply fast. (And yes, an MBA is on the horizon, so I’m always up for career talk.)",
    email: "prempareva12@gmail.com",
    // Handle taken from the resume header; confirm the full URL before launch.
    linkedin: "https://www.linkedin.com/in/preempareva",
    resume: {
      href: "/Preem_Pareva_Resume.pdf",
      approval: "approved" as Approval,
    },
    footer: ["© 2026 PREEM PAREVA", "MUMBAI, INDIA"],
  },
};
