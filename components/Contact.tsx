"use client";

import { site } from "@/content/site";
import { isVisible } from "@/lib/flags";
import { toast } from "@/lib/toast";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const { contact } = site;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      toast(`Copied ${contact.email}`);
      return;
    } catch {}
    // Fallback for browsers/contexts without the async clipboard API (e.g. plain http).
    const area = document.createElement("textarea");
    area.value = contact.email;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    toast(ok ? `Copied ${contact.email}` : `Couldn’t copy. Email: ${contact.email}`);
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading
          id="contact-title"
          eyebrow={contact.eyebrow}
          before={contact.before}
          accent={contact.accent}
          intro={contact.body}
          center
        />
        <div className="contact-actions" data-reveal>
          <button type="button" className="btn btn-primary" onClick={copyEmail}>
            Copy email
          </button>
          <a className="btn btn-ghost" href={`mailto:${contact.email}`}>
            Email me ↗
          </a>
          <a className="btn btn-ghost" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          {isVisible(contact.resume) ? (
            <a className="btn btn-ghost" href={contact.resume.href} target="_blank" rel="noopener">
              Resume ↓
            </a>
          ) : null}
        </div>
        <footer className="site-footer">
          {contact.footer.map((f) => (
            <p key={f} className="eyebrow">
              {f}
            </p>
          ))}
        </footer>
      </div>
    </section>
  );
}
