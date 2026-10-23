"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LuArrowUpRight, LuChevronLeft, LuChevronRight, LuGithub } from "react-icons/lu";
import type { Project } from "@/content/projects";
import { site } from "@/content/site";

// Work section: a coverflow of project banners. The front card is the active project;
// its neighbours peek out behind it, tilted. On first view the stack starts grey and
// folded, then colours in and fans out; after that it advances every few seconds.

const ADVANCE_MS = 3800;

// Where a card sits relative to the active one: 0 front, ±1 neighbours, 2 hidden behind.
function place(offset: number, open: boolean) {
  if (!open) return { transform: "translateX(-50%) scale(0.86)", opacity: offset === 0 ? 1 : 0, zIndex: offset === 0 ? 30 : 10 };
  if (offset === 0) return { transform: "translateX(-50%) scale(1)", opacity: 1, zIndex: 30 };
  if (offset === 1) return { transform: "translateX(calc(-50% + var(--peek))) scale(0.78) rotateY(-14deg)", opacity: 1, zIndex: 20 };
  if (offset === -1) return { transform: "translateX(calc(-50% - var(--peek))) scale(0.78) rotateY(14deg)", opacity: 1, zIndex: 20 };
  return { transform: "translateX(-50%) scale(0.6)", opacity: 0, zIndex: 0 };
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const list = projects.filter((p) => p.card);
  const n = list.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Fan out the first time the section scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setOpen(true);
        io.disconnect();
      }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance, unless hovered or the visitor prefers reduced motion.
  useEffect(() => {
    if (!open || paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), ADVANCE_MS);
    return () => clearInterval(t);
  }, [open, paused, n]);

  const go = (d: number) => setActive((a) => (a + d + n) % n);

  return (
    <div
      ref={root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="flex flex-col items-center overflow-x-clip py-6"
    >
      <div
        className="relative w-full [perspective:1400px] [--card:min(620px,80vw)] [--peek:min(390px,32vw)]"
        style={{ height: "calc(var(--card) * 0.5625)" }}
        aria-roledescription="carousel"
      >
        {list.map((p, i) => {
          let offset = (i - active + n) % n;
          if (offset > n / 2) offset -= n;
          const front = offset === 0;
          const style = place(offset, open);
          return (
            <div
              key={p.slug}
              aria-hidden={!front}
              style={style}
              className="absolute left-1/2 top-0 w-[var(--card)] transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
            >
              {front ? (
                <Link
                  href={`/work/${p.slug}`}
                  aria-label={`${p.name} case study`}
                  className="group relative block overflow-hidden rounded-[1.6rem] shadow-[0_24px_50px_-22px_rgb(30_40_90/0.55)] ring-1 ring-black/5 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <Image
                    src={p.card!}
                    alt={`${p.name}: ${p.tagline}`}
                    width={1600}
                    height={900}
                    sizes="620px"
                    className={`w-full transition duration-[1200ms] ${open ? "grayscale-0" : "grayscale"}`}
                  />
                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                    <LuArrowUpRight className="size-5" aria-hidden />
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => go(offset)}
                  className="block w-full overflow-hidden rounded-[1.6rem] shadow-[0_18px_40px_-20px_rgb(30_40_90/0.45)] ring-1 ring-black/5"
                >
                  <Image src={p.card!} alt="" width={1600} height={900} sizes="500px" className="w-full brightness-[0.92]" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Pager: arrows + dots, like the pill under the cards in the reference */}
      <div className="mt-8 flex items-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous project" className="grid size-8 place-items-center rounded-full border border-line bg-surface2/80 text-muted transition hover:text-bright">
          <LuChevronLeft aria-hidden />
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-[#2a2a2c] px-2.5 py-1.5">
          {list.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${p.name}`}
              aria-current={i === active}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-5 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next project" className="grid size-8 place-items-center rounded-full border border-line bg-surface2/80 text-muted transition hover:text-bright">
          <LuChevronRight aria-hidden />
        </button>
      </div>

      <p className="mt-5 text-center text-sm text-muted" aria-live="polite">
        <Link href={`/work/${list[active].slug}`} className="term-link">{list[active].name}</Link> · {list[active].tagline}
      </p>
      <a href={site.links.github} target="_blank" rel="noreferrer" className="term-btn mt-6">
        <LuGithub aria-hidden /> More on GitHub
      </a>
    </div>
  );
}
