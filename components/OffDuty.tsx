"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { offDuty, offDutyIntro } from "@/content/offDuty";
import { prefersReducedMotion } from "@/lib/motion";
import { toast } from "@/lib/toast";
import SectionHeading from "./SectionHeading";

function CardText({ category, title, body, hint }: { category: string; title: string; body: string; hint: string }) {
  return (
    <div className="od-text">
      <p className="eyebrow">{category}</p>
      <h3 className="od-title">{title}</h3>
      <p className="muted">
        {body} <span className="od-hint">{hint}</span>
      </p>
    </div>
  );
}

function Wheel({ cx }: { cx: number }) {
  return (
    <g className="wheel" style={{ transformOrigin: `${cx}px 120px` }}>
      <circle cx={cx} cy="120" r="30" fill="none" stroke="currentColor" strokeWidth="5" />
      {[0, 45, 90, 135].map((a) => (
        <line
          key={a}
          x1={cx - 28}
          y1="120"
          x2={cx + 28}
          y2="120"
          stroke="currentColor"
          strokeWidth="2"
          transform={`rotate(${a} ${cx} 120)`}
        />
      ))}
      <circle cx={cx} cy="120" r="4" fill="currentColor" />
    </g>
  );
}

function BikeCard() {
  const c = offDuty.bike;
  const [rolling, setRolling] = useState(false);
  useEffect(() => {
    if (!rolling) return;
    const t = setTimeout(() => setRolling(false), 1600);
    return () => clearTimeout(t);
  }, [rolling]);
  return (
    <li className={`card od-card od-bike${rolling ? " is-rolling" : ""}`} data-reveal>
      <button type="button" className="od-art" onClick={() => setRolling(true)} aria-label="Roll the bike">
        <svg viewBox="0 0 320 170" aria-hidden="true">
          <Wheel cx={80} />
          <Wheel cx={240} />
          <path d="M80 120 L130 80 L200 80 L240 120" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
          <path d="M130 80 L150 112 L200 112 L200 80" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M118 70 Q150 52 196 66 L192 82 L124 82 Z" className="fill-red" />
          <path d="M196 66 L214 50 L232 52" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M96 66 L124 70" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </button>
      <CardText {...c} />
    </li>
  );
}

function F1Card() {
  const c = offDuty.f1;
  const [lit, setLit] = useState(0);
  const [phase, setPhase] = useState<"idle" | "running" | "go">("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function start() {
    if (phase === "running") return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("running");
    setLit(0);
    const step = prefersReducedMotion() ? 250 : 650;
    for (let i = 1; i <= 5; i++) timers.current.push(window.setTimeout(() => setLit(i), step * i));
    const hold = step * 5 + 500 + Math.random() * 1200;
    timers.current.push(
      window.setTimeout(() => {
        setLit(0);
        setPhase("go");
        toast(c.toast);
      }, hold)
    );
  }

  const label = phase === "running" ? "Race start in progress" : phase === "go" ? "Replay the race start" : "Start the race";

  return (
    <li className="card od-card od-f1" data-reveal>
      <button type="button" className="od-art" onClick={start} aria-label={label} aria-disabled={phase === "running"}>
        <span className="f1-lights" aria-hidden="true">
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`f1-light${lit >= i ? " is-on" : ""}`} />
          ))}
        </span>
        <svg viewBox="0 0 320 150" aria-hidden="true">
          <path d="M40 100 L110 100 L130 78 L200 70 L250 74 L250 98 L290 98" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M90 100 L120 74 L170 66 L210 70 L232 92 L120 100 Z" className="fill-red" />
          <rect x="250" y="56" width="26" height="34" fill="none" stroke="currentColor" strokeWidth="4" />
          <path d="M150 66 Q160 50 178 54" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="100" cy="108" r="20" fill="var(--s2)" stroke="currentColor" strokeWidth="5" />
          <circle cx="232" cy="108" r="20" fill="var(--s2)" stroke="currentColor" strokeWidth="5" />
        </svg>
        <span className="od-status">{phase === "go" ? "GO! · tap to replay" : phase === "running" ? "Hold…" : "Tap to start"}</span>
      </button>
      <CardText {...c} />
    </li>
  );
}

function TravelCard() {
  const c = offDuty.travel;
  const [x, setX] = useState(0.35);
  const move = (e: PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setX(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
  };
  // Marker follows the dashed route from (40,140) to (270,40).
  const mx = 40 + x * 230;
  const my = 140 - x * 100 - Math.sin(x * Math.PI * 2) * 10;
  return (
    <li className="card od-card od-travel" data-reveal>
      <button
        type="button"
        className="od-art"
        onPointerMove={move}
        onPointerDown={move}
        onClick={(e) => e.detail === 0 && setX((v) => (v >= 1 ? 0 : Math.min(1, v + 0.2)))}
        aria-label="Move along the route"
      >
        <svg viewBox="0 0 320 170" aria-hidden="true">
          <path d="M20 150 L90 80 L120 110 L170 40 L240 120 L300 150 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M40 140 Q110 110 150 100 T270 40" fill="none" className="stroke-red" strokeWidth="3" strokeDasharray="6 7" />
          <circle cx="250" cy="34" r="13" className="fill-red" style={{ transform: `translate(${(x - 0.5) * 24}px, ${(0.5 - x) * 10}px)` }} />
          <circle cx={mx} cy={my} r="6" className="fill-red" />
          <g transform={`rotate(${x * 360 - 180} 44 40)`}>
            <circle cx="44" cy="40" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M44 28 L48 40 L44 52 L40 40 Z" className="fill-red" />
          </g>
        </svg>
      </button>
      <CardText {...c} />
    </li>
  );
}

function AdventureCard() {
  const c = offDuty.adventure;
  const [i, setI] = useState(0);
  return (
    <li className="card od-card od-adventure" data-reveal>
      <button
        type="button"
        className="od-art"
        onClick={() => setI((v) => (v + 1) % c.prompts.length)}
        aria-label={`Shuffle the prompt. Current prompt: ${c.prompts[i]}`}
      >
        <svg viewBox="0 0 320 170" aria-hidden="true">
          {[80, 60, 40, 22].map((r) => (
            <ellipse key={r} cx="190" cy="100" rx={r * 1.6} ry={r * 0.7} fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />
          ))}
          <path d="M60 150 Q130 120 190 96" fill="none" className="stroke-red" strokeWidth="3" strokeDasharray="5 7" />
          <path d="M190 96 L190 40" stroke="currentColor" strokeWidth="3" />
          <path d="M190 40 L222 52 L190 64 Z" className="fill-red" />
        </svg>
        <span key={i} className="od-prompt">
          {c.prompts[i]}
        </span>
      </button>
      <CardText {...c} />
    </li>
  );
}

export default function OffDuty() {
  return (
    <section id="off-duty" className="section off-duty" aria-labelledby="offduty-title">
      <div className="container">
        <SectionHeading id="offduty-title" tone="red" {...offDutyIntro} />
        <ul className="od-grid">
          <BikeCard />
          <F1Card />
          <TravelCard />
          <AdventureCard />
        </ul>
      </div>
    </section>
  );
}
