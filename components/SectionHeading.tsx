type Props = {
  eyebrow: string;
  before: string;
  accent: string;
  intro?: string;
  tone?: "lime" | "red";
  as?: "h1" | "h2";
  center?: boolean;
  id?: string;
};

export default function SectionHeading({ eyebrow, before, accent, intro, tone = "lime", as = "h2", center, id }: Props) {
  const H = as;
  return (
    <header className={`section-head${center ? " is-center" : ""}`} data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <H className="h-section" id={id}>
        {before} <em className={`serif-accent${tone === "red" ? " is-red" : ""}`}>{accent}</em>
      </H>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </header>
  );
}
