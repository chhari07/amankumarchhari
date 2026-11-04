"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AppIcon } from "@/components/chrome";
import type { Project } from "@/content/portfolio";

// Full-width project names. On hover, the project's poster follows the cursor.
export function WorkIndex({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const floater = useRef<HTMLDivElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = floater.current;
    if (el) el.style.left = `${e.clientX}px`, el.style.top = `${e.clientY}px`;
  };

  return (
    <>
      <ul className="index" onMouseMove={move} onMouseLeave={() => setActive(null)}>
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="row" style={{ "--c": p.color } as React.CSSProperties} onMouseEnter={() => setActive(p)}>
              <span className="num label mute">{String(i + 1).padStart(2, "0")}</span>
              <span className="tool-name">
                <AppIcon src={p.logo} size={64} alt={`${p.name} icon`} />
                <span className="name display">{p.name}</span>
              </span>
              <span className="meta label mute">
                {p.kind}
                <br />
                {p.year}
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="thumb" src={p.poster ?? p.banner} alt="" loading="lazy" />
            </Link>
          </li>
        ))}
      </ul>
      <div ref={floater} className={`floater ${active ? "on" : ""}`} aria-hidden>
        {active && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={active.poster ?? active.banner} alt="" />
        )}
      </div>
    </>
  );
}
