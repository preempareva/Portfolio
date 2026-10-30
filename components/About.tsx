import Image from "next/image";
import { site } from "@/content/site";
import SectionHeading from "./SectionHeading";

function withHighlight(text: string) {
  const parts = text.split(/\[\[(.+?)\]\]/);
  return parts.map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part));
}

export default function About() {
  const { about } = site;
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading id="about-title" eyebrow={about.eyebrow} before={about.before} accent={about.accent} />
        <div className="about-grid">
          <figure className="about-photo card" data-reveal>
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              width={630}
              height={723}
              sizes="(min-width: 960px) 360px, 100vw"
              priority={false}
            />
          </figure>
          <div className="card about-bio" data-reveal>
            <p className="about-intro">
              {about.intro}
            </p>
            {about.bio.map((p, i) => (
              <p key={i}>{withHighlight(p)}</p>
            ))}
          </div>
        </div>
        <div className="about-tiles">
          {about.tiles.map((t) => (
            <div key={t.label} className="card tile" data-reveal>
              <p className="eyebrow">{t.label}</p>
              <h3 className="tile-title">{t.title}</h3>
              <p className="muted">{t.body}</p>
            </div>
          ))}
          <div className="card tile" data-reveal>
            <p className="eyebrow">ASK ME ABOUT</p>
            <ul className="pill-list">
              {about.askMeAbout.map((a) => (
                <li key={a} className="pill">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
