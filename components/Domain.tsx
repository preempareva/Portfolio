"use client";

import { useRef, useState } from "react";
import { allTopics, domainIntro, groups, steps } from "@/content/domain";
import { prefersReducedMotion } from "@/lib/motion";
import SectionHeading from "./SectionHeading";

const byId = Object.fromEntries(allTopics.map((t) => [t.id, t]));

export default function Domain() {
  const [stepId, setStepId] = useState(steps[0].id);
  const [topicId, setTopicId] = useState(allTopics[0].id);
  const panelRef = useRef<HTMLDivElement>(null);

  const step = steps.find((s) => s.id === stepId)!;
  const topic = byId[topicId];
  const stepTopics = new Set(step.topics);

  function pickTopic(id: string, reveal = true) {
    setTopicId(id);
    // On single-column layouts the panel sits below the groups: bring it into view.
    if (reveal && window.matchMedia("(max-width: 959px)").matches) {
      panelRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "nearest" });
    }
  }

  return (
    <section id="domain" className="section" aria-labelledby="domain-title">
      <div className="container">
        <SectionHeading id="domain-title" {...domainIntro} />

        <div data-reveal>
          <ol className="steps" aria-label="How I work a problem through">
            {steps.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className="step"
                  aria-pressed={s.id === stepId}
                  onClick={() => setStepId(s.id)}
                >
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.label}
                </button>
                {i < steps.length - 1 ? (
                  <span className="step-arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
          <div className="step-explain" aria-live="polite">
            <p>{step.explain}</p>
            <p className="label">IDEAS I LEAN ON HERE</p>
            <ul className="pill-list">
              {step.topics.map((id) => (
                <li key={id}>
                  <button
                    type="button"
                    className="pill pill-btn"
                    aria-pressed={id === topicId}
                    onClick={() => pickTopic(id)}
                  >
                    {byId[id].name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="domain-layout">
          <div className="domain-groups">
            {groups.map((g) => (
              <div key={g.label} className="card domain-group" data-reveal>
                <p className="eyebrow">{g.label}</p>
                <ul>
                  {g.topics.map((t) => {
                    const selected = t.id === topicId;
                    const related = !selected && (topic.related.includes(t.id) || stepTopics.has(t.id));
                    return (
                      <li key={t.id}>
                        <button
                          type="button"
                          className={`topic${selected ? " is-selected" : ""}${related ? " is-related" : ""}`}
                          aria-pressed={selected}
                          onClick={() => pickTopic(t.id)}
                        >
                          <span className="topic-name">
                            {t.name}
                            {related ? <span className="sr-only"> (related)</span> : null}
                          </span>
                          <span className="topic-blurb">{t.blurb}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="domain-panel-wrap">
            <div className="card domain-panel" ref={panelRef} aria-live="polite">
              <p className="eyebrow">WHAT I’VE LEARNED</p>
              <h3 className="card-title">{topic.name}</h3>
              <blockquote className="domain-quote">“{topic.quote}”</blockquote>
              <p className="muted">{topic.learned}</p>
              <p className="label">CONNECTS TO</p>
              <ul className="pill-list">
                {topic.related.map((id) => (
                  <li key={id}>
                    <button type="button" className="pill pill-btn" onClick={() => pickTopic(id, false)}>
                      {byId[id].name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
