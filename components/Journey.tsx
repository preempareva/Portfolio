import { journey, journeyIntro } from "@/content/journey";
import SectionHeading from "./SectionHeading";

export default function Journey() {
  return (
    <section id="journey" className="section" aria-labelledby="journey-title">
      <div className="container journey-layout">
        <div className="journey-head">
          <SectionHeading id="journey-title" {...journeyIntro} />
        </div>
        <ol className="timeline">
          {journey.map((node) => (
            <li key={node.heading} className={`timeline-node${node.current ? " is-current" : ""}`} data-reveal>
              <span className="timeline-marker" aria-hidden="true" />
              <article className="card timeline-card" aria-current={node.current ? "step" : undefined}>
                <div className="timeline-meta">
                  <p className="eyebrow">
                    {node.meta.map((m) => (
                      <span key={m} className="block">
                        {m}
                      </span>
                    ))}
                  </p>
                  {node.current ? <span className="now-chip">NOW</span> : null}
                </div>
                <h3 className="card-title">{node.heading}</h3>
                <dl className="timeline-facts">
                  <dt className="label-accent">WORKED ON</dt>
                  <dd>{node.workedOn}</dd>
                  <dt className="label-accent">LEARNED</dt>
                  <dd>{node.learned}</dd>
                  <dt className="label-accent">CONTRIBUTED</dt>
                  <dd>{node.contributed}</dd>
                </dl>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
