import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuPlus } from "react-icons/lu";
import type { Project } from "@/content/projects";
import { site } from "@/content/site";

// Work section: dark macOS-style project tiles.

const isLive = (p: Project) => p.links.find((l) => /live|demo/i.test(l.label) && !/video/i.test(l.label));

// Stack items shown as little avatar-style discs, coloured from a fixed set.
const discs = ["#2f6fde", "#8e5bd8", "#2fa35a", "#d6408f", "#e0901a", "#1597a8", "#ee5a24"];
const short: Record<string, string> = {
  next: "Nx", typescript: "Ts", javascript: "Js", node: "Nd", react: "Re", supabase: "Sb", postgres: "Pg",
  claude: "Ai", openai: "Ai", sarvam: "Ai", express: "Ex", capacitor: "Cp", indexeddb: "Db", clerk: "Ck", razorpay: "Rp",
};
const initials = (s: string) => {
  const word = s.toLowerCase().split(/[\s.·]+/)[0];
  return short[word] ?? word.charAt(0).toUpperCase() + word.slice(1, 2);
};
const colourOf = (s: string) => discs[[...s].reduce((a, c) => a + c.charCodeAt(0), 0) % discs.length];

function Tile({ project, wide }: { project: Project; wide?: boolean }) {
  const live = isLive(project);
  const shown = project.stack.slice(0, 3);
  const extra = project.stack.length - shown.length;
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative flex min-h-60 flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#2a2a2c] p-6 shadow-[0_12px_30px_-14px_rgb(0_0_0/0.45)] transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-[#303033] ${wide ? "sm:col-span-2" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-2xl font-semibold leading-snug text-white">{project.name}</p>
          <p className="text-sm text-white/45">/{project.slug}</p>
        </div>
        <LuArrowUpRight className="size-5 shrink-0 text-white/30 transition group-hover:text-white" aria-hidden />
      </div>
      <p className={`mt-3 text-[15px] leading-snug text-white/60 ${wide ? "max-w-xl" : "line-clamp-2"}`}>{project.tagline}</p>

      <div className="mt-auto flex items-center justify-between pt-6">
        <ul className="flex -space-x-1.5" aria-label="Built with">
          {shown.map((s) => (
            <li
              key={s}
              title={s}
              style={{ background: colourOf(s) }}
              className="grid size-9 place-items-center rounded-full text-xs font-semibold text-white ring-2 ring-[#2a2a2c]"
            >
              {initials(s)}
            </li>
          ))}
          {extra > 0 && (
            <li className="grid size-9 place-items-center rounded-full bg-[#1c1c1e] text-xs text-white/70 ring-2 ring-[#2a2a2c]">+{extra}</li>
          )}
        </ul>
        <span className="flex items-center gap-2 text-xs text-white/40">
          {project.year}
          {live && <span className="rounded bg-white/15 px-2 py-0.5 font-semibold tracking-wide text-white/80">LIVE</span>}
        </span>
      </div>
      {live && <span aria-hidden className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-[#5b6cf9] via-[#d6408f] to-[#ee5a24]" />}
    </Link>
  );
}

// Banner card: the whole image links to the case study (name and line are baked into the banner).
function BannerCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.name} case study`}
      className="group relative block overflow-hidden rounded-[1.75rem] shadow-[0_18px_40px_-18px_rgb(30_40_90/0.45)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-20px_rgb(40_80_200/0.5)] focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <Image
        src={project.card!}
        alt={`${project.name}: ${project.tagline}`}
        width={1600}
        height={900}
        sizes="(min-width: 640px) 50vw, 100vw"
        className="w-full transition duration-500 group-hover:scale-[1.02]"
      />
      <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-black/25 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
        <LuArrowUpRight className="size-5" aria-hidden />
      </span>
    </Link>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const banners = projects.filter((p) => p.card);
  const [featured, ...rest] = projects.filter((p) => !p.card);
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {banners.map((p) => <BannerCard key={p.slug} project={p} />)}
      {featured && <Tile project={featured} wide={!banners.length} />}
      {rest.map((p) => <Tile key={p.slug} project={p} />)}
      <a
        href={site.links.github}
        target="_blank"
        rel="noreferrer"
        aria-label="More on GitHub"
        className="grid min-h-24 place-items-center rounded-2xl border border-white/[0.05] bg-[#19191b] text-white/25 shadow-[0_12px_30px_-14px_rgb(0_0_0/0.45)] transition hover:text-white/60 sm:col-span-2"
      >
        <LuPlus className="size-12 stroke-1" aria-hidden />
      </a>
    </div>
  );
}
