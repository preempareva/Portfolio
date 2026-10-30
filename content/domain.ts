export type Topic = {
  id: string;
  name: string;
  blurb: string;
  quote: string;
  learned: string;
  related: string[];
};

export type TopicGroup = { label: string; topics: Topic[] };

export type Step = { id: string; label: string; explain: string; topics: string[] };

export const domainIntro = {
  eyebrow: "05 / DOMAIN",
  before: "What I",
  accent: "understand.",
  intro:
    "Not a skills list. This is how I think a problem through, and the ideas I lean on at each step. Tap a step or a topic.",
};

export const steps: Step[] = [
  {
    id: "moves",
    label: "A metric moves",
    explain: "Something on a dashboard shifts. Before reacting, I ask what the business is trying to achieve and whether this movement matters for it.",
    topics: ["product-analytics", "dashboards", "lead-generation"],
  },
  {
    id: "check",
    label: "Check the data",
    explain: "Is the source fresh, is the grain what I think it is, and can a join quietly duplicate or drop rows? Only then do I trust the number.",
    topics: ["sql", "python", "dashboards"],
  },
  {
    id: "explain",
    label: "Explain it",
    explain: "Segment it, make several guesses, kill the wrong ones. The answer usually sits in how traffic, users and the marketplace interact.",
    topics: ["product-analytics", "ad-ecosystem", "programmatic-rtb"],
  },
  {
    id: "test",
    label: "Test the idea",
    explain: "If a change might help, test it properly and look past the headline metric for what it costs elsewhere.",
    topics: ["experiments", "sql", "lead-generation"],
  },
  {
    id: "fix",
    label: "Fix or automate",
    explain: "Fix the workflow first, then automate whatever someone is still doing by hand every day.",
    topics: ["automation", "process-optimisation", "python", "ai-workflows", "enterprise-systems"],
  },
  {
    id: "measure",
    label: "Measure the change",
    explain: "Close the loop: did the fix actually move the thing it was meant to move, and did anything else move with it?",
    topics: ["dashboards", "experiments", "product-analytics"],
  },
];

export const groups: TopicGroup[] = [
  {
    label: "PRODUCT & BUSINESS THINKING",
    topics: [
      {
        id: "product-analytics",
        name: "Product analytics",
        blurb: "A metric moving is a clue, not a conclusion.",
        quote: "A metric moving is a clue, not a conclusion.",
        learned:
          "I monitor funnels and KPIs, then write findings with a cause, the impact and a next step. I ask what the business is really trying to achieve before I touch the data.",
        related: ["sql", "experiments", "lead-generation"],
      },
      {
        id: "experiments",
        name: "Experiments",
        blurb: "A win on one metric can hide a loss on another.",
        quote: "A win on one metric can hide a loss on another.",
        learned:
          "I set up, monitor and read out A/B tests in lead generation. I check the split is clean first, then look past the headline number, because a lift at one funnel step can come with a drop further down.",
        related: ["product-analytics", "sql", "lead-generation"],
      },
      {
        id: "process-optimisation",
        name: "Process optimisation",
        blurb: "If someone does it by hand every day, it’s a product problem.",
        quote: "If someone does it by hand every day, it’s a product problem.",
        learned:
          "At RP Tech most of my wins started as someone’s daily routine: a report filtered by hand, emails sent one by one. Mapping the routine with the team first made the automation obvious.",
        related: ["automation", "python", "enterprise-systems"],
      },
    ],
  },
  {
    label: "DATA & ANALYTICS",
    topics: [
      {
        id: "sql",
        name: "SQL",
        blurb: "The query is the easy part. The right question isn’t.",
        quote: "The query is the easy part. The right question isn’t.",
        learned:
          "Most of my day at Media.net is SQL on Redshift. The real work is checking freshness, grain and whether a join fans out or drops rows before I believe the answer.",
        related: ["product-analytics", "dashboards", "python"],
      },
      {
        id: "dashboards",
        name: "Dashboards",
        blurb: "A good dashboard answers the first question before anyone asks it.",
        quote: "A good dashboard answers the first question before anyone asks it.",
        learned:
          "I build Tableau and Power BI dashboards that open on the question people ask most, then let them drill down to the detail behind it.",
        related: ["sql", "product-analytics", "automation"],
      },
      {
        id: "python",
        name: "Python",
        blurb: "The glue between messy sources and a clean output.",
        quote: "The glue between messy sources and a clean output.",
        learned:
          "Python is how I turned large Excel exports and four separate scripts into single runs with standardised, SQL-ready output.",
        related: ["automation", "sql", "process-optimisation"],
      },
    ],
  },
  {
    label: "ADTECH & MARKETPLACE",
    topics: [
      {
        id: "programmatic-rtb",
        name: "Programmatic & RTB",
        blurb: "Every page load is a tiny auction, decided in milliseconds.",
        quote: "Every page load is a tiny auction, decided in milliseconds.",
        learned:
          "I’m learning AdTech from the ground up at Media.net: how bids, auctions and header bidding decide what a user sees, and why speed and traffic quality matter so much.",
        related: ["ad-ecosystem", "lead-generation"],
      },
      {
        id: "lead-generation",
        name: "Lead generation",
        blurb: "Margin lives in the funnel: who arrives, who converts, who’s worth paying for.",
        quote: "Margin lives in the funnel: who arrives, who converts, who’s worth paying for.",
        learned:
          "This is my day-to-day: funnels, traffic quality and experiments. I look at each step to see where people drop off and whether the traffic arriving is real.",
        related: ["product-analytics", "experiments", "ad-ecosystem"],
      },
      {
        id: "ad-ecosystem",
        name: "Ad ecosystem",
        blurb: "Advertisers, publishers and users all have to win.",
        quote: "Advertisers, publishers and users all have to win.",
        learned:
          "Every change I look at has three sides: what the advertiser pays for, what the publisher earns and what the user experiences. A fix that helps one and hurts another isn’t a win.",
        related: ["programmatic-rtb", "lead-generation"],
      },
    ],
  },
  {
    label: "BUILD & AUTOMATE",
    topics: [
      {
        id: "automation",
        name: "Automation",
        blurb: "Fix the workflow before you automate it.",
        quote: "Fix the workflow before you automate it.",
        learned:
          "My first invoice-flow design was one central flow, and it broke on inconsistent inputs. Rebuilding it as independent per-company flows is what made it hold up.",
        related: ["process-optimisation", "python", "enterprise-systems"],
      },
      {
        id: "ai-workflows",
        name: "AI workflows",
        blurb: "AI is useful when it’s wired into the data people already use.",
        quote: "AI is useful when it’s wired into the data people already use.",
        learned:
          "Apex taught me that a chatbot alone isn’t the product. Connecting it to real reports, with proper access control, is what made people use it. I build with Claude Code regularly.",
        related: ["automation", "enterprise-systems", "python"],
      },
      {
        id: "enterprise-systems",
        name: "Enterprise systems",
        blurb: "Real systems have permissions, owners and handovers.",
        quote: "Real systems have permissions, owners and handovers.",
        learned:
          "At RP Tech I worked around SAP, Power Platform and SharePoint. Working code wasn’t the finish line: access, ownership and a clean handover were.",
        related: ["ai-workflows", "automation", "process-optimisation"],
      },
    ],
  },
];

export const allTopics: Topic[] = groups.flatMap((g) => g.topics);
