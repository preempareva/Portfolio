import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { work } from "@/content/work";
import { isVisible } from "@/lib/flags";

type Params = { slug: string };

const published = () => work.filter(isVisible);

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return published().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const item = published().find((w) => w.slug === slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.problem,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { type: "article", url: `/work/${slug}`, title: item.title, description: item.problem },
  };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const list = published();
  const index = list.findIndex((w) => w.slug === slug);
  if (index === -1) notFound();
  const item = list[index];
  const prev = list[index - 1];
  const next = list[index + 1];
  const { default: Body } = await import(`@/content/case-studies/${slug}.mdx`);

  return (
    <>
      <SiteHeader home={false} />
      <main id="main" className="section case">
        <div className="container case-inner">
          <Link className="text-link" href="/#work">
            ← Back to all work
          </Link>
          <header className="case-head">
            <p className="eyebrow">
              {item.n} · {item.kicker} · {item.category}
            </p>
            <h1 className="h-section case-title">{item.title}</h1>
            <p className="section-intro">{item.problem}</p>
          </header>

          <section className="card case-snapshot" aria-labelledby="snapshot">
            <h2 id="snapshot" className="label label-accent">
              SNAPSHOT
            </h2>
            <dl>
              <div>
                <dt className="label">CONTEXT</dt>
                <dd>{item.context}</dd>
              </div>
              <div>
                <dt className="label">STATUS</dt>
                <dd>{item.status}</dd>
              </div>
              <div>
                <dt className="label">THE OUTCOME</dt>
                <dd className="outcome">{item.outcome}</dd>
              </div>
              <div>
                <dt className="label">TOOLS</dt>
                <dd>
                  <ul className="tool-list">
                    {item.tools.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </section>

          <article className="prose">
            <Body />
          </article>

          <nav className="case-nav" aria-label="More case studies">
            {prev ? (
              <Link className="card case-nav-link" href={`/work/${prev.slug}`} rel="prev">
                <span className="eyebrow">← PREVIOUS · {prev.n}</span>
                <span className="case-nav-title">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="card case-nav-link is-next" href={`/work/${next.slug}`} rel="next">
                <span className="eyebrow">NEXT · {next.n} →</span>
                <span className="case-nav-title">{next.title}</span>
              </Link>
            ) : null}
          </nav>

          <Link className="btn btn-ghost" href="/#work">
            ← Back to all work
          </Link>
        </div>
      </main>
    </>
  );
}
