"use client";

import { useEffect, useState } from "react";

const WORDS = ["data,", "tech,", "ideas,"];

/**
 * First-visit intro. Timing and exit are pure CSS (see `.intro` in globals.css), so the
 * overlay always clears even if JS stalls. The inline theme script adds `intro-seen`
 * to <html> on repeat visits in the same session, which hides it entirely.
 */
export default function Intro() {
  const [n, setN] = useState(0);

  useEffect(() => {
    try {
      sessionStorage.setItem("intro-seen", "1");
    } catch {}
    if (document.documentElement.classList.contains("intro-seen")) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / 1450);
      setN(Math.round(100 * (1 - Math.pow(1 - k, 2))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-top">
        <span className="brand">
          PREEM PAREVA <span className="status-dot" />
        </span>
        <span className="eyebrow">PORTFOLIO / 2026</span>
      </div>
      <div className="intro-words">
        {WORDS.map((word, i) => (
          <span key={word} className="intro-word" style={{ ["--d" as string]: `${0.05 + i * 0.36}s` }}>
            {word}
          </span>
        ))}
        <span className="intro-word is-last" style={{ ["--d" as string]: `${0.05 + WORDS.length * 0.36}s` }}>
          <em className="serif-accent">impact.</em>
        </span>
      </div>
      <div className="intro-bottom">
        <span className="eyebrow">TURNING DATA INTO DECISIONS</span>
        <span className="intro-count">{String(n).padStart(3, "0")}</span>
      </div>
      <span className="intro-bar" />
    </div>
  );
}
