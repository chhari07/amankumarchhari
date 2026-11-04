/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon, MenuBar, Footer, Rise } from "@/components/chrome";
import { getTool, tools } from "@/content/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata(props: PageProps<"/tools/[slug]">): Promise<Metadata> {
  const t = getTool((await props.params).slug);
  return t ? { title: t.name, description: t.tagline } : {};
}

export default async function ToolPage(props: PageProps<"/tools/[slug]">) {
  const t = getTool((await props.params).slug);
  if (!t) notFound();
  const i = tools.indexOf(t);
  const next = tools[(i + 1) % tools.length];

  return (
    <>
      <MenuBar />
      <main className="case" style={{ "--accent": t.color, "--c": t.color } as React.CSSProperties}>
        <header className="cs-hero tool-hero">
          <p className="label mute">
            <Link href="/tools">Tools</Link> / {String(i + 1).padStart(2, "0")}
          </p>
          <div className="tool-title">
            <AppIcon src={t.logo} size={140} alt={`${t.name} icon`} />
            <h1 className="display" aria-label={t.name}>
              <Rise text={t.name} />
            </h1>
          </div>
          <p className="tag fade">{t.tagline}</p>
          <div className="cs-meta label">
            <div>
              <span>Type</span>
              {t.kind}
            </div>
            <div>
              <span>Built with</span>
              {t.stack}
            </div>
            <div>
              <span>Role</span>
              Solo: idea, design, build
            </div>
            <div>
              <span>Status</span>
              {t.status}
            </div>
          </div>
        </header>

        {t.shots ? (
          <div className="tool-shots pad">
            {t.shots.map((sh) => (
              <figure key={sh.src}>
                <img src={sh.src} alt={sh.alt} width={620} height={1332} loading="lazy" />
                <figcaption className="label mute">{sh.label}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}

        <div className="cs-body">
          <h2 className="display">The problem</h2>
          <p>{t.problem}</p>
        </div>
        <div className="cs-body">
          <h2 className="display">What it does</h2>
          <ul>
            {t.does.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
        <div className="cs-body">
          <h2 className="display">How it&apos;s built</h2>
          <ul>
            {t.built.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <div className="cs-links">
          {t.links.length ? (
            t.links.map((l) => (
              <a key={l.href} className="pill" href={l.href} {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
                {l.label} ↗
              </a>
            ))
          ) : (
            <span className="label mute">Private build · demo on request</span>
          )}
        </div>

        <Link href={`/tools/${next.slug}`} className="next" style={{ "--c": next.color } as React.CSSProperties}>
          <span className="label mute">Next tool 👉</span>
          <span className="display">{next.name}</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
