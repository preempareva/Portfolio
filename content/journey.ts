export type JourneyNode = {
  meta: string[];
  heading: string;
  workedOn: string;
  learned: string;
  contributed: string;
  current?: boolean;
};

export const journeyIntro = {
  eyebrow: "02 / JOURNEY",
  before: "How I got",
  accent: "here.",
  intro: "Oldest to newest. Each stop taught me something the last one couldn’t.",
};

// Oldest → newest.
export const journey: JourneyNode[] = [
  {
    meta: ["2022 — 2026 · B.TECH COMPUTER SCIENCE ENGINEERING", "DWARKADAS J. SANGHVI COLLEGE OF ENGINEERING, MUMBAI"],
    heading: "Built, led, published.",
    workedOn:
      "Core CS with IoT, blockchain and cybersecurity, a co-authored paper on blockchain-based event ticketing presented at IEEE HSWTech-2025, and TRINITY, the flagship fest.",
    learned: "Theory gets you started. Real problems involve people, deadlines and incomplete information.",
    contributed:
      "As Vice Chairperson I helped lead a multi-day festival with 5,000+ attendees, working with a 40-member team across sponsorship, logistics and publicity.",
  },
  {
    meta: ["FEB — MAY 2026 · RP TECH INDIA", "(RASHI PERIPHERALS)"],
    heading: "Intern, IT & Digital Transformation.",
    workedOn:
      "Python and Power Platform automations, Power BI reporting, and an internal AI operations platform called Apex.",
    learned: "How a large B2B distributor really runs, and why requirements gathering matters more than code.",
    contributed:
      "Built and improved workflows across Imports, Finance, BOS, Marketing and Lifestyle teams; presented Apex to the MD, then handed the work over cleanly.",
  },
  {
    meta: ["JUN 2026 — NOW · MEDIA.NET"],
    heading: "Product Analyst, Customer Acquisition.",
    workedOn:
      "Lead-gen funnel analytics, traffic quality, experiment readouts, and reporting reconciliation, using Redshift SQL and Tableau.",
    learned: "AdTech from the ground up, and how to turn a vague “something looks off” into a root cause.",
    contributed: "18 documented investigations and dashboards that gave teams visibility they didn’t have before.",
    current: true,
  },
];
