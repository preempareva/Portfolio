"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// Only pure numbers with an optional non-numeric suffix count up ("24", "99.7%").
// Ranges and arrows ("3–4 hrs", "4 → 1") render as-is.
const NUMERIC = /^(\d+(?:\.\d+)?)(\D*)$/;

export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(NUMERIC);
    if (!el || !match || prefersReducedMotion()) return;
    // Already on screen at mount: leave the final value, no flash.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const fmt = (n: number) => n.toFixed(decimals) + suffix;
    setDisplay(fmt(0));

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1100;
        const tick = (t: number) => {
          const k = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          setDisplay(k === 1 ? value : fmt(target * eased));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <>
      <span ref={ref} aria-hidden="true">
        {display}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}
