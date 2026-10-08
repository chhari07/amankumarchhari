import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { LuBriefcase, LuFileText, LuGithub, LuGauge, LuLayers, LuLinkedin, LuMail, LuShieldCheck, LuTrophy, LuUserCheck, LuFileCheck, LuDownload } from "react-icons/lu";
import { SiClaude, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiTypescript } from "react-icons/si";
import { ProjectGrid } from "@/components/project-card";
import { Bar, Block } from "@/components/ui";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const stackIcons: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Postgres: SiPostgresql,
  "Claude API": SiClaude,
};

type DockItem = { label: string; icon: IconType; bg: string; fg: string; href?: string };
const dockTools: DockItem[] = site.stack.map((t) => ({ label: t.name, icon: stackIcons[t.name] ?? LuLayers, bg: t.bg, fg: t.fg }));
const dockLinks: DockItem[] = [
  { label: "Resume", icon: LuFileText, bg: "#f2c94c", fg: "#1a1a1a", href: site.links.resume },
  { label: "GitHub", icon: LuGithub, bg: "#24292f", fg: "#ffffff", href: site.links.github },
  { label: "LinkedIn", icon: LuLinkedin, bg: "#2d6fb8", fg: "#ffffff", href: site.links.linkedin },
  { label: "Email", icon: LuMail, bg: "linear-gradient(180deg,#5aa9ff,#2f6fde)", fg: "#ffffff", href: `mailto:${site.email}` },
];

const [roleA, roleB] = site.role.split(" & ");
const wins = site.achievements.filter((a) => a.startsWith("Winner"));
const finals = site.achievements.filter((a) => /finalist/i.test(a));

function DockIcon({ item }: { item: DockItem }) {
  const Icon = item.icon;
  const tile = (
    <span
      className="grid size-[min(30px,6.4vw)] place-items-center rounded-[min(8px,1.8vw)] sm:rounded-[12px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.06),0_2px_4px_rgb(0_0_0/0.08)] transition duration-200 group-hover:-translate-y-2 group-hover:scale-115 sm:size-12"
      style={{ background: item.bg, color: item.fg }}
    >
      <Icon className="size-[55%] sm:size-6" aria-hidden />
    </span>
  );
  return (
    <li className="group relative">
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-bright px-2 py-0.5 text-[11px] text-surface2 opacity-0 transition group-hover:opacity-100">
        {item.label}
      </span>
      {item.href ? <a href={item.href} aria-label={item.label}>{tile}</a> : <span aria-label={item.label}>{tile}</span>}
    </li>
  );
}

const ext = (href: string, label: string) => <a href={href} target="_blank" rel="noreferrer" className="term-link">{label}</a>;

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="flex flex-col items-center pt-24 text-center sm:pt-32">
        <Image
          src={site.avatar}
          alt={site.name}
          width={176}
          height={176}
          priority
          className="size-32 rounded-full object-cover shadow-[0_0_0_1px_rgb(0_0_0/0.06),0_10px_28px_-10px_rgb(0_0_0/0.3)] sm:size-44"
        />
        <p className="mt-4 text-sm font-medium text-fg">{site.name}</p>
        <h1 className="display ink mt-6 pb-1 text-[2.6rem] sm:text-7xl">
          {roleA} <LuLayers className="inline size-[0.8em] -translate-y-[0.06em] stroke-[1.6] text-[#2c2c2e]" aria-hidden /> &amp;
          <br />
          {roleB.toLowerCase().replace(" ai ", " AI ")}
        </h1>
        <a href="#hiring" className="mt-6 flex items-center gap-2 text-xs text-muted transition hover:text-bright">
          <span className="size-1.5 animate-pulse rounded-full bg-moss" /> available immediately · open to full-time roles
        </a>

        <ul className="card mt-24 flex max-w-full items-end gap-[min(6px,1vw)] rounded-[min(16px,3.5vw)] bg-surface2/70 p-[min(8px,1.6vw)] backdrop-blur sm:mt-32 sm:gap-2.5 sm:rounded-[22px] sm:px-3 sm:py-2.5">
          {dockTools.map((d) => <DockIcon key={d.label} item={d} />)}
          <li aria-hidden className="mx-px h-[min(28px,6vw)] w-px self-center bg-line sm:mx-1 sm:h-10" />
          {dockLinks.map((d) => <DockIcon key={d.label} item={d} />)}
        </ul>
      </section>

      {/* About */}
      <Block id="about" label="about" title="Hi there." className="mt-12">
        <div className="mx-auto max-w-xl space-y-5 text-fg">
          <p>{site.about}</p>
          <p>
            Recent work:{" "}
            {projects.map((p, i) => (
              <span key={p.slug}>
                <Link href={`/work/${p.slug}`} className="term-link">{p.name}</Link>
                {i < projects.length - 2 ? ", " : i === projects.length - 2 ? " and " : ""}
              </span>
            ))}
            .
          </p>
          <p>
            Hackathon winner ({wins.map((w) => w.replace("Winner, ", "")).join(", ")}), with national-level finishes at{" "}
            {finals.map((f) => f.split(", ")[1]).join(", ").replace(/, ([^,]*)$/, " and $1")}.
          </p>
          <p>{site.education.degree}, {site.education.school} ({site.education.years}).</p>
          <p className="flex flex-wrap gap-x-2 text-muted">
            {ext(site.links.github, "GitHub")}<span>·</span>{ext(site.links.resume, "Résumé")}<span>·</span>
            <a href={`mailto:${site.email}`} className="term-link">{site.email}</a>
          </p>
        </div>
      </Block>

      {/* Applied AI */}
      <Block id="applied-ai" label="applied ai" title="What is applied AI?">
        <div className="mx-auto max-w-xl">
          <p className="text-fg">{site.appliedAi.what}</p>
          <h3 className="mt-12 text-2xl font-semibold tracking-tight text-bright">Why an applied AI engineer?</h3>
          <p className="mt-3 text-fg">{site.appliedAi.whyIntro}</p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          {site.appliedAi.why.map((w, i) => {
            const Icon = [LuShieldCheck, LuUserCheck, LuFileCheck, LuGauge][i] ?? LuLayers;
            return (
              <li key={w.title} className="card p-5">
                <Icon className="size-5 text-muted" aria-hidden />
                <p className="mt-3 font-semibold tracking-tight text-bright">{w.title}</p>
                <p className="mt-1 text-sm text-muted">{w.text}</p>
              </li>
            );
          })}
        </ul>
      </Block>

      {/* Projects */}
      <Block id="work" label="work" title="Things I’ve shipped.">
        <div className="mx-auto max-w-6xl">
          <ProjectGrid projects={projects} />
        </div>
      </Block>

      {/* Experience & achievements */}
      <Block id="experience" label="experience" title="Experience & wins.">
        <div className="mx-auto max-w-xl space-y-10">
          <ul className="space-y-5">
            {site.experience.map((e) => (
              <li key={e.role} className="flex gap-3">
                <LuBriefcase className="mt-1 shrink-0 text-dim" aria-hidden />
                <div>
                  <p className="font-medium text-bright">{e.role}</p>
                  <p className="text-sm text-muted">{e.org} · {e.when}</p>
                </div>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {site.achievements.map((a) => (
              <li key={a} className="flex items-start gap-3">
                <LuTrophy className={`mt-1 shrink-0 ${a.startsWith("Winner") ? "text-rust" : "text-dim"}`} aria-hidden />
                <span className={a.startsWith("Winner") ? "text-bright" : "text-fg"}>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </Block>

      {/* Skills */}
      <Block label="skills" title="Tools of the trade.">
        <div className="mx-auto max-w-xl space-y-10">
          <ul className="space-y-2.5">
            {site.stack.map((t) => {
              const Icon = stackIcons[t.name] ?? LuLayers;
              return (
                <li key={t.name} className="flex items-center gap-4">
                  <span className="flex w-32 items-center gap-2 text-fg"><Icon className="shrink-0 text-muted" aria-hidden />{t.name}</span>
                  <Bar value={t.level} />
                </li>
              );
            })}
          </ul>
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {Object.entries(site.skills).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs uppercase tracking-wider text-dim">{group}</p>
                <p className="mt-1.5 text-fg">{items.join(" · ")}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-dim">I build</p>
            <p className="mt-1.5 text-fg">{site.builds.join(" · ")}</p>
          </div>
        </div>
      </Block>

      {/* Principles */}
      <Block label="principles" title="How I build.">
        <ol className="mx-auto max-w-xl space-y-2">
          {site.principles.map((p, i) => (
            <li key={p} className="flex gap-4">
              <span className="w-5 text-dim tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-bright">{p}</span>
            </li>
          ))}
        </ol>
      </Block>
      {/* Job search */}
      <Block id="hiring" label="open to work" title="What I’m looking for.">
        <div className="card mx-auto max-w-xl p-6 sm:p-8">
          <p className="text-xs uppercase tracking-wider text-dim">Roles</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {site.jobSearch.roles.map((r) => (
              <li key={r} className="rounded-full bg-bright px-3 py-1 text-sm text-surface2">{r}</li>
            ))}
          </ul>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6">
            {site.jobSearch.details.map((d) => (
              <div key={d.label}>
                <dt className="text-xs uppercase tracking-wider text-dim">{d.label}</dt>
                <dd className="mt-0.5 font-medium text-bright">{d.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 border-t border-line pt-6">
            <p className="text-xs uppercase tracking-wider text-dim">Teams I’d fit</p>
            <p className="mt-1.5 text-fg">{site.jobSearch.teams.join(" · ")}</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <a href={`mailto:${site.email}`} className="term-btn term-btn-solid"><LuMail aria-hidden /> Email me</a>
            <a href={site.links.resume} className="term-btn"><LuDownload aria-hidden /> Résumé</a>
            <a href={site.links.linkedin} className="term-btn"><LuLinkedin aria-hidden /> LinkedIn</a>
          </div>
        </div>
      </Block>
    </>
  );
}
