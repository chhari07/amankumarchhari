/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { AppIcon, MenuBar, Dot, Footer, Letters, Rise } from "@/components/chrome";
import { CopyCommand } from "@/components/copy-command";
import { Ill, type IllName } from "@/components/illustrations";
import { palette } from "@/content/portfolio";
import { kits } from "@/content/tools";

export const metadata: Metadata = {
  title: "UI Kit",
  description: "Open-source UI kits for the Ubuntu desktop, and the SOLOX design system this site is built with.",
};

const ink = [
  { name: "Ink", hex: "#0A0A0A", note: "All text and lines" },
  { name: "Paper", hex: "#FFFFFF", note: "Every background" },
  { name: "Mute", hex: "#6B6B6B", note: "Labels and meta" },
  { name: "Line", hex: "#0000001F", note: "Rules, 12% ink" },
];
const accentNames = ["Orange", "Green", "Blue", "Yellow", "Red"];
const allIcons: IllName[] = ["listen", "build", "guard", "brand", "tell", "design", "creative", "ai", "deploy", "clock", "usb", "calendar", "topbar"];

export default function UiKitPage() {
  return (
    <>
      <MenuBar />
      <main>
        <header className="page-hero pad">
          <p className="label mute">
            <Dot i={2} />
            Open source · design system
          </p>
          <h1 className="display" aria-label="UI Kit">
            <Rise text="UI Kit" />
          </h1>
          <p className="page-intro fade">
            Two open-source kits that restyle the Ubuntu desktop, each installed with one command. Below them is the SOLOX design system: the type,
            colours and components this site is made from.
          </p>
        </header>

        {kits.map((k, i) => (
          <section key={k.slug} id={k.slug} className="pad kit" style={{ "--c": k.color, "--accent": k.color } as React.CSSProperties}>
            <div className="sechead label">
              <span>
                <Dot i={i + 2} />
                Kit {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mute">{k.meta}</span>
            </div>
            <div className="tool-title" style={{ marginTop: 28 }}>
              <AppIcon src={k.logo} size={120} alt={`${k.name} icon`} />
              <h2 className="display kit-name" style={{ margin: 0 }}>
                {k.name}
              </h2>
            </div>
            <p className="kit-tag">{k.tagline}</p>
            <div className={`kit-media n${k.images.length}`}>
              {k.images.map((im) => (
                <img key={im.src} src={im.src} alt={im.alt} loading="lazy" />
              ))}
            </div>
            <div className="kit-grid">
              <div>
                <h3 className="label mute">What&apos;s inside</h3>
                <ul className="kit-list">
                  {k.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="label mute">Install</h3>
                <CopyCommand command={k.install} />
                <p className="kit-note">{k.installNote}</p>
                <div className="cs-links" style={{ padding: "18px 0 0" }}>
                  {k.links.map((l) => (
                    <a key={l.href} className="pill" href={l.href} target="_blank" rel="noopener">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
                <video className="kit-film" src={k.video} poster={k.video.replace(".mp4", ".jpg")} controls muted playsInline preload="none" />
                <p className="label mute" style={{ fontSize: 12, marginTop: 8 }}>
                  14-second brand film
                </p>
              </div>
            </div>
          </section>
        ))}

        {/* The design system this site is built with, shown as live components. */}
        <section id="design-system" className="pad ds">
          <div className="sechead label">
            <span>
              <Dot i={4} />
              SOLOX design system
            </span>
            <span className="mute">Live components from this site</span>
          </div>

          <div className="ds-block">
            <h3 className="label mute">01 · Type</h3>
            <div className="ds-type">
              <div>
                <p className="display" style={{ fontSize: "clamp(80px, 12vw, 180px)", margin: 0 }}>
                  Aa
                </p>
                <p className="label">Anton · display · uppercase · line-height 0.86</p>
              </div>
              <div>
                <p style={{ fontSize: "clamp(56px, 8vw, 120px)", margin: 0, lineHeight: 1, fontWeight: 500 }}>Aa</p>
                <p className="label">Inter · body 16–21 px · labels 14 px uppercase</p>
              </div>
            </div>
          </div>

          <div className="ds-block">
            <h3 className="label mute">02 · Colour</h3>
            <p className="ds-note">Black and white at rest. Colour appears only on hover, one accent per project.</p>
            <div className="swatches">
              {ink.map((c) => (
                <div key={c.name} className="swatch">
                  <i style={{ background: c.hex }} />
                  <b>{c.name}</b>
                  <span>{c.hex}</span>
                  <span className="mute">{c.note}</span>
                </div>
              ))}
              {palette.map((hex, i) => (
                <div key={hex} className="swatch accent" style={{ "--c": hex } as React.CSSProperties}>
                  <i />
                  <b>{accentNames[i]}</b>
                  <span>{hex.toUpperCase()}</span>
                  <span className="mute">Hover accent</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ds-block">
            <h3 className="label mute">03 · Buttons &amp; labels</h3>
            <div className="ds-row" style={{ "--accent": palette[2] } as React.CSSProperties}>
              <span className="pill case-pill">Pill button ↗</span>
              <span className="linkrow label" style={{ margin: 0 }}>
                <a href="#design-system">Underline link ↗</a>
              </span>
              <span className="label">
                <Dot i={0} />
                Section label
              </span>
              <span className="label mute">Meta · 2026</span>
            </div>
          </div>

          <div className="ds-block">
            <h3 className="label mute">04 · Hover type</h3>
            <p className="display multi ds-hover">
              <Letters text="Hover me" />
            </p>
          </div>

          <div className="ds-block">
            <h3 className="label mute">05 · Line illustrations</h3>
            <p className="ds-note">Hand-drawn style, 3 px black stroke, an offset shape that fills with colour on hover. Drawn as SVG for this site.</p>
            <div className="ds-icons">
              {allIcons.map((n, i) => (
                <div key={n} style={{ "--c": palette[i % palette.length] } as React.CSSProperties}>
                  <Ill name={n} size={72} />
                  <span className="label mute">{n}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
