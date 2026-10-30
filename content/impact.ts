import type { Approval } from "@/lib/flags";

export type Stat = {
  value: string;
  label: string;
  body: string;
  detail?: string;
  source: "VERIFIED" | "DOCUMENTED";
  approval: Approval;
};

export type Chapter = {
  eyebrow: string;
  heading: string;
  intro: string;
  stats: Stat[];
};

export const impactIntro = {
  eyebrow: "03 / IMPACT",
  before: "The",
  accent: "receipts.",
  intro:
    "Every figure here comes from my own project notes. Where the numbers belong to the business, I describe what changed instead of what it earned.",
};

export const INVESTIGATION_COUNT = "18";

export const chapters: Chapter[] = [
  {
    eyebrow: "CHAPTER ONE · THE INTERNSHIP",
    heading: "Taking manual work off people’s plates.",
    intro:
      "At RP Tech, the wins came from spotting daily routines that quietly ate hours, then rebuilding them as pipelines that run without anyone touching them.",
    stats: [
      {
        value: "3–4 hrs",
        label: "saved, every single day",
        body: "A daily logistics report that needed hours of filtering, mapping and emailing now builds and sends itself.",
        detail: "Brand-wise, coordinator-specific reports with exception sheets, delivered automatically.",
        source: "VERIFIED",
        approval: "approved",
      },
      {
        value: "24",
        label: "inboxes automated",
        body: "Invoice emails across 20+ companies, handled by independent flows after my first single-flow design didn’t hold up.",
        source: "VERIFIED",
        approval: "approved",
      },
      {
        value: "4 → 1",
        label: "OEM scripts, one pipeline",
        body: "Lenovo, HP, ASUS and Dell serial-number workflows now run as one Python file with SQL-ready output.",
        source: "VERIFIED",
        approval: "approved",
      },
    ],
  },
  {
    eyebrow: "CHAPTER TWO · AS A PRODUCT ANALYST",
    heading: "Making data worth trusting.",
    intro:
      "At Media.net the job shifted from building tools to questioning data: checking joins, explaining anomalies and writing it up so teams can act.",
    stats: [
      {
        value: "99.7%",
        label: "match rate on a traffic-quality join",
        body: "While checking whether flagged bot traffic was costing money, I linked bot-check results to click records and found crawler re-hits inflating the “bad” share, with no revenue leak.",
        source: "VERIFIED",
        approval: "approved",
      },
      {
        value: INVESTIGATION_COUNT,
        label: "investigations written up",
        body: "Funnel drops, reporting mismatches and experiment readouts, each documented with findings, status and next steps.",
        source: "DOCUMENTED",
        approval: "approved",
      },
    ],
  },
];
