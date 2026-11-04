"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SoloxLogo } from "@/components/solox-logo";

const NAV = [
  { href: "/#work", label: "Work", match: "/work" },
  { href: "/tools", label: "Tools", match: "/tools" },
  { href: "/ui-kit", label: "UI Kit", match: "/ui-kit" },
  { href: "/about", label: "About", match: "/about" },
  { href: "/contact", label: "Contact", match: "/contact" },
];

// Mac-style menu bar (from the full-stack site), in the SOLOX black & white.
export function MenuBar({ dark = false }: { dark?: boolean }) {
  const path = usePathname();
  const [now, setNow] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const tick = () =>
      setNow(
        new Date().toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).replace(",", " "),
      );
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <header className={`menubar ${dark ? "dark" : ""} ${open ? "open" : ""}`}>
      <Link href="/" className="mb-brand" aria-label="SOLOX, home">
        <SoloxLogo dark={dark} />
      </Link>
      <nav className="mb-nav">
        {NAV.map((n) => (
          <Link key={n.label} href={n.href} className={path.startsWith(n.match) ? "on" : ""}>
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="mb-right">
        <a className="mb-resume" href="/Aman_Kumar_Chhari_Resume_Design_Engineer.pdf" target="_blank">
          Resume ↓
        </a>
        <span className="mb-status">
          <i /> Open to work
        </span>
        <span className="mb-clock" suppressHydrationWarning>
          {now}
        </span>
      </div>
      <button className="mb-burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        <i />
        <i />
      </button>
    </header>
  );
}
