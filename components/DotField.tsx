"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type Dot = { x: number; y: number; phase: number; speed: number; base: number };

const RADIUS = 150; // cursor influence, px

export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Reduced motion: dots only twinkle (opacity), no wave, drift or cursor push.
    const reduce = prefersReducedMotion();
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let color = "";
    let raf = 0;
    let last = 0;
    let onScreen = true;
    const target = { x: -9999, y: -9999, active: false };
    const pointer = { x: -9999, y: -9999, k: 0 };

    const readColor = () => {
      color = getComputedStyle(document.documentElement).getPropertyValue("--dot").trim() || "rgba(200,255,61,.6)";
    };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 640 ? 26 : 30;
      dots = [];
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          if (Math.random() < 0.72) {
            dots.push({ x, y, phase: Math.random() * Math.PI * 2, speed: 0.5 + Math.random() * 1.1, base: 0.18 + Math.random() * 0.4 });
          }
        }
      }
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = color;
      // Ease the pointer so the field follows smoothly.
      pointer.x += (target.x - pointer.x) * 0.18;
      pointer.y += (target.y - pointer.y) * 0.18;
      pointer.k += ((target.active ? 1 : 0) - pointer.k) * 0.08;
      const s = t / 1000;
      for (const d of dots) {
        let a = d.base * (0.55 + 0.45 * Math.sin(s * d.speed + d.phase));
        let x = d.x;
        let y = d.y;
        let r = 1.25;
        if (!reduce) {
          const wave = Math.max(0, Math.sin((d.x * 0.7 + d.y) / 170 - s * 1.1));
          a += wave * wave * wave * 0.55;
          r += wave * wave * 0.5;
          if (pointer.k > 0.01) {
            const dx = x - pointer.x;
            const dy = y - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < RADIUS && dist > 0.1) {
              const k = (1 - dist / RADIUS) * pointer.k;
              a += k * 0.9;
              r += k * 2.2;
              const push = k * k * 18;
              x += (dx / dist) * push;
              y += (dy / dist) * push;
            }
          }
        }
        ctx.globalAlpha = Math.min(1, a);
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frameGap = reduce ? 120 : 0;
    const loop = (t: number) => {
      if (!onScreen || document.hidden) {
        raf = 0;
        return;
      }
      if (t - last >= frameGap) {
        draw(t);
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      target.active = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      target.x = x;
      target.y = y;
    };
    const onLeave = () => {
      target.active = false;
    };

    readColor();
    build();
    draw(0);
    start();

    const ro = new ResizeObserver(() => {
      build();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
    });
    io.observe(canvas);

    const mo = new MutationObserver(readColor);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onVis = () => !document.hidden && start();
    document.addEventListener("visibilitychange", onVis);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={ref} className="dot-field" aria-hidden="true" />;
}
