import { site } from "@/content/site";
import DotField from "./DotField";
import Ticker from "./Ticker";

export default function Hero() {
  const { hero } = site;
  const last = hero.lines.length - 1;
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <DotField />
      <div className="container hero-inner">
        <p className="eyebrow hero-fade" style={{ ["--i" as string]: 0 }}>
          {hero.eyebrow}
        </p>
        <h1 id="hero-title" className="hero-title">
          {hero.lines.map((line, i) => (
            <span key={line} className="line">
              <span className="line-inner" style={{ ["--i" as string]: i }}>
                {line}
                {i === last ? (
                  <>
                    {" "}
                    <em className="serif-accent swoosh">
                      {hero.accent}
                      <svg viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M2 9 C 30 2, 70 2, 118 7" pathLength={1} />
                      </svg>
                    </em>
                  </>
                ) : null}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-statement hero-fade" style={{ ["--i" as string]: 4 }}>
          {hero.statement}
        </p>
        <p className="hero-intro hero-fade" style={{ ["--i" as string]: 5 }}>
          {hero.intro}
        </p>
        <div className="hero-ctas hero-fade" style={{ ["--i" as string]: 6 }}>
          <a className="btn btn-primary" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn-ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
        <dl className="hero-status hero-fade" style={{ ["--i" as string]: 7 }}>
          {hero.status.map((s) => (
            <div key={s.value} className="status-row">
              {s.dot ? (
                <dt>
                  <span className="status-dot" aria-hidden="true" />
                  <span className="sr-only">Status</span>
                </dt>
              ) : (
                <dt>{s.label}</dt>
              )}
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <a className="scroll-cue hero-fade" href="#about" style={{ ["--i" as string]: 8 }}>
          <span>SCROLL</span>
          <span className="scroll-line" aria-hidden="true" />
        </a>
      </div>
      <Ticker items={hero.ticker} />
    </section>
  );
}
