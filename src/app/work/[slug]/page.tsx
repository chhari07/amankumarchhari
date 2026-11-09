/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon, MenuBar, Footer, Rise } from "@/components/chrome";
import { getProject, projects } from "@/content/portfolio";
import { getDeep } from "@/content/fullstack";
import { getSystem, userFlows } from "@/content/case-diagrams";
import { Architecture, FlowLanes } from "@/components/case-diagrams";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = getProject((await props.params).slug);
  return p ? { title: p.name, description: p.tagline } : {};
}

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const p = getProject((await props.params).slug);
  if (!p) notFound();
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];
  const deep = getDeep(p.slug);
  const system = getSystem(p.slug);
  const flow = userFlows[p.slug];

  return (
    <>
      <MenuBar />
      <main style={{ "--accent": p.color } as React.CSSProperties} className="case">
        <header className="cs-hero">
          <p className="label mute">
            Case study {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
          <div className="tool-title">
            <AppIcon src={p.logo} size={140} alt={`${p.name} icon`} />
            <h1 className="display" aria-label={p.name}>
              <Rise text={p.name} />
            </h1>
          </div>
          <p className="tag fade">{p.tagline}</p>
          <div className="cs-meta label">
            <div>
              <span>Type</span>
              {p.kind}
            </div>
            <div>
              <span>Role</span>
              {p.role}
            </div>
            <div>
              <span>Year</span>
              {p.year}
            </div>
            <div>
              <span>Stack</span>
              {p.stack}
            </div>
          </div>
        </header>

        <div className="cs-media">
          {p.poster ? <img src={p.poster} alt={`${p.name} launch poster`} /> : <img src={p.banner} alt={`${p.name} banner`} />}
          <div className="stackv">
            {p.video ? (
              <video src={p.video} poster={p.video.replace(".mp4", ".jpg")} controls playsInline preload="none" />
            ) : null}
            {p.poster ? <img src={p.banner} alt={`${p.name} case-study banner`} /> : null}
            {p.shot ? <img src={p.shot} alt={`${p.name} product screen`} loading="lazy" /> : null}
          </div>
        </div>

        <div className="cs-body">
          <h2 className="display">The problem</h2>
          <p>{p.problem}</p>
        </div>
        <div className="cs-body">
          <h2 className="display">What I built</h2>
          <ul>
            {p.built.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <div className="cs-body">
          <h2 className="display">The brand story</h2>
          <p>{p.story}</p>
        </div>

        <div className="cs-nums">
          {p.numbers.map((n) => (
            <div key={n.l}>
              <b className="display">{n.v}</b>
              <span>{n.l}</span>
            </div>
          ))}
        </div>

        {flow ? (
          <div className="cs-dia pad">
            <h2 className="display">User flow</h2>
            <p className="mute">{flow.caption}</p>
            <FlowLanes flow={flow} slug={p.slug} />
            <p className="dia-hint">Scroll sideways to see every step 👉</p>
          </div>
        ) : null}
        {system ? (
          <div className="cs-dia pad">
            <h2 className="display">Architecture</h2>
            {system.caption ? <p className="mute">{system.caption}</p> : null}
            <Architecture system={system} slug={p.slug} />
            <p className="dia-hint">Scroll sideways to see the whole system 👉</p>
          </div>
        ) : null}

        {deep ? (
          <>
            <div className="cs-body">
              <h2 className="display">Decisions</h2>
              <div className="decisions">
                {deep.decisions.map((d) => (
                  <div key={d.chose}>
                    <span className="label chose">Chose</span>
                    <h3>{d.chose}</h3>
                    <span className="label rejected">Rejected</span>
                    <p className="mute">{d.rejected}</p>
                    <p>{d.why}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="cs-body">
              <h2 className="display">When it fails</h2>
              <ul className="fails">
                {deep.failures.map((f) => (
                  <li key={f.what}>
                    <b>{f.what}</b>
                    <span>{f.handling}</span>
                  </li>
                ))}
              </ul>
            </div>
            {deep.loadTests ? (
              <div className="cs-tests pad">
                <h2 className="display">Load-tested with JMeter</h2>
                <p className="mute">{deep.loadTests.caption}</p>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr className="label mute">
                        <th>Test</th>
                        <th>Load</th>
                        <th>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deep.loadTests.rows.map((r) => (
                        <tr key={r.test + r.load}>
                          <td>
                            <b>{r.test}</b>
                          </td>
                          <td>{r.load}</td>
                          <td>
                            <i className="ok" />
                            {r.result}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </>
        ) : null}

        {p.note ? <p className="note">{p.note}</p> : null}
        <div className="cs-links">
          {p.links.map((l) => (
            <a key={l.href} className="pill" href={l.href} target="_blank" rel="noopener">
              {l.label} ↗
            </a>
          ))}
        </div>

        <Link href={`/work/${next.slug}`} className="next" style={{ "--c": next.color } as React.CSSProperties}>
          <span className="label mute">Next case study 👉</span>
          <span className="display">{next.name}</span>
        </Link>
      </main>
      <Footer />
    </>
  );
}
