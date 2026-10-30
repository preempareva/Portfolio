"use client";

import Link from "next/link";
import { useState } from "react";
import type { WorkItem } from "@/content/work";

export default function WorkAccordion({ items }: { items: WorkItem[] }) {
  // One card open at a time; the first starts open, as in the walkthrough.
  const [open, setOpen] = useState<string | null>(items[0]?.slug ?? null);

  return (
    <ul className="work-list">
      {items.map((item) => {
        const isOpen = open === item.slug;
        const panelId = `work-panel-${item.slug}`;
        const btnId = `work-btn-${item.slug}`;
        return (
          <li key={item.slug} className={`card work-card${isOpen ? " is-open" : ""}`} data-reveal>
            <h3 className="work-heading">
              <button
                id={btnId}
                type="button"
                className="work-toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.slug)}
              >
                <span className="work-kicker">
                  <span className="work-n">{item.n}</span> {item.kicker} · {item.category}
                </span>
                <span className="work-title">{item.title}</span>
                <span className="work-affordance" aria-hidden="true">
                  {isOpen ? "− close" : "+ details"}
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="work-body" inert={!isOpen}>
              <div className="work-body-inner">
                <p className="label">THE PROBLEM</p>
                <p>{item.problem}</p>
                <p className="label">THE OUTCOME</p>
                <p className="outcome">{item.outcome}</p>
                <p className="label label-accent">WHAT I DID</p>
                <p className="muted">{item.did}</p>
                {item.approach ? (
                  <>
                    <p className="label label-accent">HOW I APPROACHED IT</p>
                    <p className="muted">{item.approach}</p>
                  </>
                ) : null}
                <ul className="tool-list" aria-label="Tools">
                  {item.tools.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
                <Link className="text-link" href={`/work/${item.slug}`}>
                  Read the full case study →
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
