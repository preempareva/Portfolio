import type { Approval } from "@/lib/flags";
import { INVESTIGATION_COUNT } from "./impact";

export type WorkItem = {
  slug: string;
  n: string;
  kicker: string;
  category: string;
  title: string;
  problem: string;
  outcome: string;
  did: string;
  approach?: string;
  tools: string[];
  context: string;
  approval: Approval;
};

export const workIntro = {
  eyebrow: "04 / WORK",
  before: "Problems I",
  accent: "solved.",
  intro:
    "Six real problems, what I did about each, and what changed. Tap a card for the full story. Details stay high level on purpose.",
};

export const work: WorkItem[] = [
  {
    slug: "apex-ai-platform",
    n: "01",
    kicker: "APEX",
    category: "AI PLATFORM",
    title: "Turning a basic internal chatbot into a business platform",
    problem:
      "Staff had data spread across SAP reports and spreadsheets, and only a very basic internal AI assistant to help.",
    outcome: "Live on its own domain, presented to the MD, and handed over with documentation.",
    did: "Rebuilt and rebranded it as Apex with Claude Code: SAP report integration, inventory and sales modules, and email alerts.",
    approach:
      "Gathered requirements from each team first, built role-based access with admin approval and OTP signup, then tuned login, response time and stability.",
    tools: ["Python", "AI", "SAP APIs"],
    context: "RP Tech India · Feb — May 2026",
    approval: "approved",
  },
  {
    slug: "daily-logistics-report",
    n: "02",
    kicker: "AUTOMATION",
    category: "IMPORTS TEAM",
    title: "Daily logistics report, built to run itself",
    problem:
      "A 3–4 hour daily task: filtering large Excel files, mapping coordinators across 60+ brands and emailing people one by one, with a high risk of errors.",
    outcome: "Zero manual intervention and consistent daily reports, tested and production-ready.",
    did: "Built a Python dispatcher to process the source data, map the relevant coordinators, create structured reports and send them automatically. The workflow was production-ready on 16 April 2026.",
    tools: ["Python", "pandas", "openpyxl", "SAP API", "SMTP"],
    context: "RP Tech India · Imports team",
    approval: "approved",
  },
  {
    slug: "invoice-inbox-automation",
    n: "03",
    kicker: "WORKFLOW",
    category: "FINANCE OPERATIONS",
    title: "Invoice inbox automation",
    problem:
      "Invoice emails arrived from 20+ companies across 24 mailboxes, with inconsistent inputs and heavy manual sorting.",
    outcome: "A stable, team-owned setup, handed over after testing and migration.",
    did: "Built Power Automate flows with SharePoint and structured Outlook folders. The first central-flow design did not handle inconsistent inputs reliably, so I redesigned it as independent per-company flows and tested the handover.",
    tools: ["Power Automate", "SharePoint", "Outlook"],
    context: "RP Tech India · Finance operations",
    approval: "approved",
  },
  {
    slug: "warehouse-observability",
    n: "04",
    kicker: "OBSERVABILITY",
    category: "DATA PLATFORM",
    title: "Seeing what the data warehouse was doing",
    problem: "There was no structured view of who used the warehouse, where time went, or when queries queued up.",
    outcome: "Teams can drill from a daily trend straight to the queries behind it, which wasn’t possible before.",
    did: "Built a query-performance dashboard to make warehouse usage and query behavior easier to inspect. Diagnosed that the default history window was too short and moved the reporting to a persisted dataset.",
    tools: ["SQL", "Redshift", "Tableau"],
    context: "Media.net · Data platform",
    approval: "approved",
  },
  {
    slug: "bot-traffic-check",
    n: "05",
    kicker: "DATA QUALITY",
    category: "TRAFFIC",
    title: "Is flagged bot traffic costing real money?",
    problem: "Raw “bad traffic” rates looked alarming for one campaign, and nobody knew if revenue was at risk.",
    outcome: "About 99.7% match rate. Crawler re-hits were inflating the bad share, and there was no revenue leak.",
    did: "Joined bot-check results to click records, validated the match quality, segmented the suspicious activity and traced the inflated share to crawler re-hits rather than a revenue-impacting issue.",
    tools: ["SQL", "Redshift", "Data quality", "Traffic analysis"],
    context: "Media.net · Traffic quality",
    approval: "approved",
  },
  {
    slug: "metric-investigations",
    n: "06",
    kicker: "PRODUCT ANALYTICS",
    category: "GROUPED CASE STUDY",
    title: "Turning “something looks off” into answers",
    problem:
      "Funnel drops, reporting mismatches and experiment readouts kept needing a clear, defensible cause, and the movement alone didn’t explain what had happened.",
    outcome: `${INVESTIGATION_COUNT} written investigations, each with the likely cause, impact, status and next step.`,
    did: "Checked definitions, freshness and joins before trusting a number, segmented the data, compared the relevant periods or cohorts, and wrote up what I found so the team had a clearer basis for action.",
    tools: ["SQL", "Tableau", "Product analytics"],
    context: "Media.net · Several investigations, grouped",
    approval: "approved",
  },
];
