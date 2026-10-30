"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader({ home = true }: { home?: boolean }) {
  const [active, setActive] = useState<string>("");
  const barRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const prefix = home ? "" : "/";

  // Scroll progress
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      barRef.current?.style.setProperty("--p", String(p));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Active section
  useEffect(() => {
    if (!home) return;
    const sections = site.nav
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const first = site.nav.find((n) => visible.get(n.id));
        setActive(first ? first.id : "");
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  // Keep the active link visible inside the horizontally scrollable mobile nav
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !active) return;
    const link = nav.querySelector<HTMLElement>(`a[href$="#${active}"]`);
    if (!link) return;
    const left = link.offsetLeft - nav.clientWidth / 2 + link.clientWidth / 2;
    nav.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <header className="site-header">
      <div className="progress" ref={barRef} aria-hidden="true" />
      <div className="container header-inner">
        <a className="brand" href={home ? "#top" : "/"} aria-label={`${site.name}, back to top`}>
          {site.brand}
          <span className="status-dot" aria-hidden="true" />
        </a>
        <nav className="nav" ref={navRef} aria-label="Sections">
          {site.nav.map((n) => (
            <a key={n.id} href={`${prefix}#${n.id}`} aria-current={active === n.id ? "true" : undefined}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="actions">
          <ThemeToggle />
          <a className="btn btn-primary btn-sm" href={`${prefix}#contact`}>
            Say hi
          </a>
        </div>
      </div>
    </header>
  );
}
