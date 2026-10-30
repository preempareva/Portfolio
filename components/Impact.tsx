import { chapters, impactIntro } from "@/content/impact";
import { isVisible } from "@/lib/flags";
import Counter from "./Counter";
import SectionHeading from "./SectionHeading";

export default function Impact() {
  return (
    <section id="impact" className="section" aria-labelledby="impact-title">
      <div className="container">
        <SectionHeading id="impact-title" {...impactIntro} />
        {chapters.map((ch) => {
          const stats = ch.stats.filter(isVisible);
          if (!stats.length) return null;
          return (
            <div key={ch.eyebrow} className="chapter">
              <div className="chapter-head" data-reveal>
                <p className="eyebrow">{ch.eyebrow}</p>
                <h3 className="chapter-title">{ch.heading}</h3>
                <p className="muted">{ch.intro}</p>
              </div>
              <ul className={`stat-grid${stats.length === 2 ? " is-pair" : ""}`}>
                {stats.map((s) => (
                  <li key={s.label} className="card stat" data-reveal>
                    <p className="stat-value">
                      <Counter value={s.value} />
                    </p>
                    <p className="stat-label">{s.label}</p>
                    <p className="muted">{s.body}</p>
                    {s.detail ? <p className="stat-detail">{s.detail}</p> : null}
                    <p className="source-chip">
                      <span aria-hidden="true">✓</span> {s.source}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
