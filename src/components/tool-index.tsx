"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AppIcon } from "@/components/chrome";
import type { Tool } from "@/content/tools";

// Full-width tool names with their line drawing. Tools that have screens show the first one next to the cursor on hover.
export function ToolIndex({ tools }: { tools: Tool[] }) {
  const [active, setActive] = useState<Tool | null>(null);
  const floater = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = floater.current;
    if (el) el.style.left = `${e.clientX}px`, el.style.top = `${e.clientY}px`;
  };
  return (
    <>
      <ul className="index" onMouseMove={move} onMouseLeave={() => setActive(null)}>
        {tools.map((t, i) => (
          <li key={t.slug}>
            <Link href={`/tools/${t.slug}`} className="row tool-row" style={{ "--c": t.color } as React.CSSProperties} onMouseEnter={() => setActive(t.shots ? t : null)}>
              <span className="num label mute">{String(i + 1).padStart(2, "0")}</span>
              <span className="tool-name">
                <AppIcon src={t.logo} size={64} alt={`${t.name} icon`} />
                <span className="name display">{t.name}</span>
              </span>
              <span className="meta label mute">{t.kind}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={floater} className={`floater phone ${active ? "on" : ""}`} aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {active?.shots ? <img src={active.shots[0].src} alt="" /> : null}
      </div>
    </>
  );
}
