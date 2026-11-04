/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Dot, Footer, MenuBar } from "@/components/chrome";
import { about, awards, education, experience, lookingFor, pick, principles, site, skills } from "@/content/portfolio";

export const metadata: Metadata = { title: "About", description: about };

export default function AboutPage() {
  return (
    <>
      <MenuBar />
      <main>
        <header className="about-hero pad">
          <div className="about-photo">
            <img src="/solox-cutout.webp" alt={`Illustrated portrait of ${site.name}`} width={900} height={1180} />
          </div>
          <div>
            <p className="label">
              <Dot i={0} />
              About
            </p>
            <h1 className="display">{site.name}</h1>
            <p className="label about-title">{site.title}</p>
            <p className="page-intro">{about}</p>
            <p className="page-intro mute" style={{ marginTop: 16 }}>
              {education.degree}, {education.school} ({education.years}).
            </p>
          </div>
        </header>

        <section className="pad">
          <div className="sechead label">
            <span>(01) What I&apos;m looking for</span>
            <span className="mute">Full-time · entry level</span>
          </div>
          <div className="looking">
            {lookingFor.map((l) => (
              <div key={l.k}>
                <span className="label mute">{l.k}</span>
                <b>{l.v}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(02) Experience</span>
            <span className="mute">Since 2023</span>
          </div>
          {experience.map((e) => (
            <div key={e.role} className="xp-item">
              <div className="xp-head">
                <h3>{e.role}</h3>
                <span className="label mute">{e.when}</span>
              </div>
              <p className="mute">{e.org}</p>
              {e.points.length > 0 && (
                <ul>
                  {e.points.map((p) => (
                    <li key={p.name}>
                      <a href={p.href} target="_blank" rel="noopener">
                        <b>{p.name}</b>
                      </a>{" "}
                      ({p.when}): {p.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="awards row2">
            {awards.map((a) => (
              <a key={a.t} href={a.href} target="_blank" rel="noopener">
                <span className="display">{a.t}</span>
                <span>{a.d}</span>
                <span className="label">Certificate ↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(03) Skills</span>
            <span className="mute">Design + full stack + applied AI</span>
          </div>
          <div className="skills">
            {Object.entries(skills).map(([k, items]) => (
              <div key={k}>
                <h3 className="display">{k}</h3>
                <ul>
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(04) Principles</span>
            <span className="mute">How I work</span>
          </div>
          <div className="principles">
            {principles.map((p, i) => (
              <div key={p} style={{ "--c": pick(i) } as React.CSSProperties}>
                <Dot i={i} />
                <p className="display">{p}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
