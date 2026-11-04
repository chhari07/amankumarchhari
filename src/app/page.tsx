/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { AppIcon, Dot, Footer, Letters, MenuBar, Rise } from "@/components/chrome";
import { Ill, roleIcons, stepIcons } from "@/components/illustrations";
import { WorkIndex } from "@/components/work-index";
import { awards, dock, education, experience, guards, hero, pick, principles, projects, proof, roleText, site } from "@/content/portfolio";
import { kits, tools } from "@/content/tools";

const css = (v: Record<string, string>) => v as React.CSSProperties;

export default function Home() {
  return (
    <>
      <MenuBar />
      <main>
        {/* Hero: giant SOLOX, cut-out portrait in front, one line + two CTAs. */}
        <header className="hero">
          <div className="hero-top label">
            <span>
              <Dot i={0} />
              {site.year} · Selected works
            </span>
            <span>{site.title}</span>
          </div>
          <div>
            <div className="stage">
              <h1 className="display" aria-label={`${hero.word}, ${site.name}`}>
                <Rise text={hero.word} />
              </h1>
              <img className="me fade" src="/solox-cutout.webp" alt={`Illustrated portrait of ${site.name}`} width={900} height={1180} />
            </div>
          </div>
          <div className="hero-foot fade">
            <p className="sub">{site.line}</p>
            <div className="cta">
              <a className="pill dark" href="#work">
                See the work
              </a>
              <Link className="pill" href="/contact">
                Get in touch
              </Link>
            </div>
          </div>
        </header>

        {/* (01) What I do */}
        <section id="what" className="pad">
          <div className="sechead label">
            <span>(01) What I do</span>
            <span className="mute">Problem → launch</span>
          </div>
          <h2 className="statement display">
            One person, from the client&apos;s problem <em>to the launch poster.</em>
          </h2>
          <p className="intro">{site.intro}</p>
          <div className="steps">
            {site.steps.map((s, i) => (
              <div key={s.k} style={css({ "--c": pick(i) })}>
                <Ill name={stepIcons[i]} />
                <b>{s.k}</b>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* (02) Work */}
        <section id="work" className="pad">
          <div className="sechead label">
            <span>(02) Selected work</span>
            <span className="mute">{String(projects.length).padStart(2, "0")} case studies</span>
          </div>
          <WorkIndex projects={projects} />
        </section>

        {/* (03) Proof */}
        <section className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(03) Measured, not estimated</span>
            <span className="mute">JMeter · evals · results</span>
          </div>
          <div className="proof">
            {proof.map((p, i) => (
              <div key={p.v} style={css({ "--c": pick(i) })}>
                <Dot i={i} />
                <b className="display">{p.v}</b>
                <span>{p.l}</span>
              </div>
            ))}
          </div>
        </section>

        {/* (04) How I build AI, from the full-stack site */}
        <section id="ai" className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(04) How I build AI</span>
            <span className="mute">Applied AI</span>
          </div>
          <h2 className="ai-head display">A model demo takes an afternoon. Making it safe for real users, real data and real money is the job.</h2>
          <div className="guards">
            {guards.map((g, i) => (
              <div key={g.t} style={css({ "--c": pick(i) })}>
                <Dot i={i} />
                <h3>{g.t}</h3>
                <p>{g.d}</p>
              </div>
            ))}
          </div>
        </section>
        <div className="ticker" aria-label={principles.join(" ")}>
          <div>
            {[...principles, ...principles, ...principles].map((p, i) => (
              <span key={i} className="display">
                {p} <b>✳</b>
              </span>
            ))}
          </div>
        </div>

        {/* (05) Posters + films */}
        <section id="creatives" className="pad">
          <div className="sechead label">
            <span>(05) Posters · films</span>
            <span className="mute">AI-assisted, art-directed by me</span>
          </div>
          <div className="wall">
            {projects
              .filter((p) => p.poster)
              .map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`}>
                  <img src={p.poster} alt={`${p.name} launch poster`} loading="lazy" />
                  <p className="label mute">{p.name} · launch poster</p>
                </Link>
              ))}
          </div>
          <div className="films">
            {site.brandVideos.map((v) => (
              <div key={v.name}>
                <video src={v.video} poster={v.video.replace(".mp4", ".jpg")} controls muted playsInline preload="none" />
                <p className="label mute" style={{ fontSize: 13, marginTop: 10 }}>
                  <a href={v.href} target="_blank" rel="noopener">
                    {v.name}
                  </a>{" "}
                  · {v.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* (06) Tools + kits teaser */}
        <section id="tools" className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(06) Tools I use every day</span>
            <span className="mute">Tools · UI Kit</span>
          </div>
          <div className="tool-cards">
            {tools.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} style={css({ "--c": t.color })}>
                <AppIcon src={t.logo} size={56} alt={`${t.name} icon`} />
                <span className="display">{t.name}</span>
                <span className="label mute">{t.kind}</span>
                <p>{t.tagline}</p>
              </Link>
            ))}
          </div>
          <div className="kit-cards">
            {kits.map((k) => (
              <Link key={k.slug} href={`/ui-kit#${k.slug}`} style={css({ "--c": k.color })}>
                <img src={k.images[0].src} alt={k.images[0].alt} loading="lazy" />
                <div>
                  <span className="display">{k.name}</span>
                  <span className="pill dark">Install →</span>
                </div>
                <p>{k.tagline}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* (07) Experience + recognition, from the full-stack site */}
        <section id="experience" className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(07) Experience &amp; recognition</span>
            <span className="mute">Since 2023</span>
          </div>
          <div className="xp">
            <div>
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
              <div className="xp-item">
                <div className="xp-head">
                  <h3>{education.degree}</h3>
                  <span className="label mute">{education.years}</span>
                </div>
                <p className="mute">{education.school}</p>
              </div>
            </div>
            <div className="awards">
              {awards.map((a) => (
                <a key={a.t} href={a.href} target="_blank" rel="noopener">
                  <span className="display">{a.t}</span>
                  <span>{a.d}</span>
                  <span className="label">Certificate ↗</span>
                </a>
              ))}
            </div>
          </div>
          <p className="label mute dock-label">Stack I build with</p>
          <ul className="dock">
            {dock.map((d) => (
              <li key={d.s} style={css({ background: d.bg, color: d.fg })}>
                {d.s}
                <span className="tip">{d.n}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* (08) Roles */}
        <section id="roles" className="pad" style={{ paddingTop: 0 }}>
          <div className="sechead label">
            <span>(08) Hire me as</span>
            <span className="mute">Full-time · open to relocate</span>
          </div>
          <ul className="roles">
            {site.roles.map((r, i) => (
              <li key={r} style={css({ "--c": pick(i) })}>
                <span>
                  <Ill name={roleIcons[r]} size={64} />
                  <span className="display" style={{ display: "block" }}>
                    {r}
                  </span>
                </span>
                <p>{roleText[r]}</p>
              </li>
            ))}
          </ul>
          <div className="linkrow label" style={{ justifyContent: "flex-start", marginTop: 34 }}>
            <a href="/Aman_Kumar_Chhari_Resume_Design_Engineer.pdf" target="_blank">
              Resume · Design Engineer ↓
            </a>
            <a href="/Aman_Kumar_Chhari_Resume_AI_Product_Engineer.pdf" target="_blank">
              Resume · AI Product Engineer ↓
            </a>
            <a href="/Aman_Kumar_Chhari_Resume.pdf" target="_blank">
              Resume · Full-stack ↓
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pad talk">
          <p className="label">(09) Contact</p>
          <Link href="/contact" className="big display multi">
            <Letters text="Let's talk" />
          </Link>
          <div className="talk-row">
            <a className="mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <span className="mute">{site.location}</span>
          </div>
          <div className="cta">
            {site.links.slice(0, 2).map((l) => (
              <a key={l.href} className="pill ghost" href={l.href} target="_blank" rel="noopener">
                {l.label} ↗
              </a>
            ))}
            <a className="pill ghost" href="/Aman_Kumar_Chhari_Resume_Design_Engineer.pdf" target="_blank">
              Resume ↓
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
