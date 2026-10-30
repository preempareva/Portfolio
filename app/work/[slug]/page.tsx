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
  return { title: item.title, description: item.problem, alternates: { canonical: `/work/${slug}` } };
}

export default async function CaseStudy({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const item = published().find((w) => w.slug === slug);
  if (!item) notFound();
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
                <dt className="label">THE PROBLEM</dt>
                <dd>{item.problem}</dd>
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

          <Link className="btn btn-ghost" href="/#work">
            ← Back to all work
          </Link>
        </div>
      </main>
    </>
  );
}
