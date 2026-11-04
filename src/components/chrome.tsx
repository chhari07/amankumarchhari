import { pick, site } from "@/content/portfolio";

export { MenuBar } from "@/components/menu-bar";
import { SoloxLogo } from "@/components/solox-logo";

export function Footer() {
  return (
    <footer>
      <span className="foot-brand">
        <SoloxLogo className="on-light" />
        <SoloxLogo dark className="on-dark" />
        <span>
          © {site.year} {site.name}
        </span>
      </span>
      <span>{site.location}</span>
      <span className="foot-links">
        <a href="https://github.com/chhari07" target="_blank" rel="noopener">GitHub</a>
        <a href="https://www.linkedin.com/in/aman-kumar-chhari-9613bb235/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="/Aman_Kumar_Chhari_Resume_Design_Engineer.pdf" target="_blank">Resume ↓</a>
      </span>
    </footer>
  );
}

// Splits a word so each letter rises in on load.
export function Rise({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span className="rise" key={i}>
          <span style={{ animationDelay: `${delay + i * 0.06}s` }}>{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </>
  );
}

// Each letter carries a palette colour (--c); CSS lights them up on hover (.multi).
export function Letters({ text }: { text: string }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ "--c": pick(i) } as React.CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

// Small coloured square used in section labels.
export const Dot = ({ i }: { i: number }) => <i className="dot" style={{ background: pick(i) }} aria-hidden />;

// Rounded app-icon tile for projects, tools and kits.
export function AppIcon({ src, size = 64, alt = "" }: { src: string; size?: number; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="app-icon" src={src} alt={alt} width={size} height={size} style={{ width: size, height: size }} />;
}
