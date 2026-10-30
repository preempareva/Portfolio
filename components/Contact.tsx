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
    } catch {
      toast(`Couldn’t copy. Email: ${contact.email}`);
    }
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
