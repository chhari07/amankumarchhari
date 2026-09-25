import type { IconType } from "react-icons";
import {
  LuBot, LuBriefcase, LuCode, LuCreditCard, LuFileText, LuFolderGit2, LuGithub, LuGlobe, LuGraduationCap,
  LuLayoutDashboard, LuLinkedin, LuMail, LuMapPin, LuPuzzle, LuRocket, LuServer, LuTrophy, LuUser,
} from "react-icons/lu";
import { SiClaude, SiNextdotjs, SiNodedotjs, SiPostgresql, SiTypescript } from "react-icons/si";
import { ProjectCard } from "@/components/project-card";
import { Bar, Block, Prompt } from "@/components/ui";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

const ascii = String.raw`
    _    __  __    _    _   _
   / \  |  \/  |  / \  | \ | |
  / _ \ | |\/| | / _ \ |  \| |
 / ___ \| |  | |/ ___ \| |\  |
/_/   \_\_|  |_/_/   \_\_| \_|`;

const buildIcons: Record<string, IconType> = {
  "Web apps": LuGlobe,
  "APIs & backends": LuServer,
  "Dashboards & SaaS": LuLayoutDashboard,
  "Auth & payments": LuCreditCard,
  "AI features": LuBot,
  "Browser extensions": LuPuzzle,
};
const stackIcons: Record<string, IconType> = {
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Postgres: SiPostgresql,
  "Claude API": SiClaude,
};
const toolIcons: Record<string, IconType> = { Frontend: LuCode, Backend: LuServer, "Applied AI": LuBot, Infra: LuRocket };

const wins = site.achievements.filter((a) => a.startsWith("Winner")).length;
const stats: [IconType, string, string][] = [
  [LuFolderGit2, String(projects.length), "products built"],
  [LuBriefcase, "2023", "building for clients since"],
  [LuTrophy, `${wins} + ${site.achievements.length - wins}`, "hackathon wins + finals"],
];

const info: [IconType, string, React.ReactNode][] = [
  [LuUser, "name", site.name],
  [LuCode, "role", site.role],
  [LuMapPin, "location", site.location],
  [LuGraduationCap, "education", `${site.education.degree}, ${site.education.school} (${site.education.years})`],
  [LuMail, "email", <a key="e" href={`mailto:${site.email}`} className="term-link">{site.email}</a>],
  [LuGithub, "github", <a key="g" href={site.links.github} className="term-link">github.com/chhari07</a>],
  [LuLinkedin, "linkedin", <a key="l" href={site.links.linkedin} className="term-link">linkedin.com/in/aman-chhari</a>],
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pb-10 pt-14 sm:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Prompt cmd="whoami" />
          <p className="flex items-center gap-2 border border-line px-2 py-0.5 text-xs text-muted">
            <span className="size-2 animate-pulse rounded-full bg-bright" /> available immediately
          </p>
        </div>
        <pre aria-label={site.name} className="mt-6 overflow-hidden text-[15px] font-bold leading-[1.05] text-bright sm:text-2xl">
          {ascii}
        </pre>
        <h1 className="mt-6 text-xl font-bold text-bright sm:text-3xl">
          {site.name} <span className="text-muted">— {site.role.toLowerCase().replace(" ai ", " AI ")}</span>
        </h1>
        <p className="mt-3 text-lg text-fg sm:text-xl">
          &gt; I build full-stack apps and the AI inside them.<span className="cursor ml-1" aria-hidden />
        </p>
        <p className="mt-4 max-w-2xl text-muted">{site.intro}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          <a href="#work" className="term-btn term-btn-solid"><LuFolderGit2 aria-hidden /> ls ~/projects</a>
          <a href={site.links.resume} className="term-btn"><LuFileText aria-hidden /> cat resume.pdf</a>
          <a href={`mailto:${site.email}`} className="term-btn"><LuMail aria-hidden /> mail me</a>
          <a href={site.links.github} aria-label="GitHub" className="term-btn"><LuGithub aria-hidden /></a>
          <a href={site.links.linkedin} aria-label="LinkedIn" className="term-btn"><LuLinkedin aria-hidden /></a>
        </div>

        <dl className="mt-10 grid border border-line sm:grid-cols-3">
          {stats.map(([Icon, value, label], i) => (
            <div key={label} className={`flex items-center gap-4 p-4 ${i ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}>
              <Icon className="size-5 shrink-0 text-muted" aria-hidden />
              <div className="flex flex-col-reverse">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="text-2xl font-bold text-bright">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </section>

      <hr className="border-line" />

      {/* About */}
      <Block id="about" cmd="cat about.txt">
        <p className="max-w-3xl">{site.about}</p>
        <dl className="mt-6 grid gap-x-6 gap-y-1 sm:grid-cols-[max-content_1fr]">
          {info.map(([Icon, k, v]) => (
            <div key={k} className="contents">
              <dt className="flex items-center gap-2 text-muted"><Icon aria-hidden className="shrink-0" />{k}</dt>
              <dd className="mb-2 text-bright sm:mb-0">{v}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <div className="grid gap-x-12 md:grid-cols-2">
        <Block cmd="ls ~/skills">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {site.builds.map((b) => {
              const Icon = buildIcons[b] ?? LuCode;
              return (
                <li key={b} className="flex items-center gap-2 border border-line px-3 py-2 hover:border-muted">
                  <Icon className="shrink-0 text-muted" aria-hidden /> {b}
                </li>
              );
            })}
          </ul>
        </Block>

        <Block cmd="stack --levels">
          <ul className="space-y-1.5">
            {site.stack.map((t) => {
              const Icon = stackIcons[t.name] ?? LuCode;
              return (
                <li key={t.name} className="flex flex-wrap items-center gap-x-3">
                  <span className="flex w-32 items-center gap-2 text-fg"><Icon className="shrink-0 text-muted" aria-hidden />{t.name}</span>
                  <Bar value={t.level} width={16} />
                </li>
              );
            })}
          </ul>
        </Block>
      </div>

      <Block cmd="cat ~/.tools">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(site.skills).map(([group, items]) => {
            const Icon = toolIcons[group] ?? LuCode;
            return (
              <div key={group} className="border border-line p-4">
                <p className="flex items-center gap-2 text-muted"><Icon aria-hidden /> {group.toLowerCase()}</p>
                <ul className="mt-2">
                  {items.map((s) => <li key={s}><span className="text-dim">- </span>{s}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </Block>

      <div id="experience" className="grid scroll-mt-16 gap-x-12 md:grid-cols-2">
        <Block cmd="cat experience.log">
          <ul className="space-y-5 border-l border-line pl-5">
            {site.experience.map((e) => (
              <li key={e.role} className="relative">
                <span className="absolute -left-[27px] top-1 grid size-3 place-items-center border border-muted bg-bg" />
                <p className="text-xs text-muted">[{e.when}]</p>
                <p className="flex items-center gap-2 font-bold text-bright"><LuBriefcase aria-hidden className="shrink-0 text-muted" />{e.role}</p>
                <p className="text-muted">{e.org}</p>
              </li>
            ))}
          </ul>
        </Block>

        <Block cmd="cat achievements.txt">
          <ul className="space-y-2">
            {site.achievements.map((a) => (
              <li key={a} className="flex items-start gap-2">
                <LuTrophy className={`mt-1 shrink-0 ${a.startsWith("Winner") ? "text-bright" : "text-dim"}`} aria-hidden />
                <span className={a.startsWith("Winner") ? "text-bright" : ""}>{a}</span>
              </li>
            ))}
          </ul>
        </Block>
      </div>

      <hr className="border-line" />

      {/* Projects */}
      <Block id="work" cmd="ls -la ~/projects">
        <p className="mb-4 text-muted">total {projects.length}</p>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} featured={i === 0} />
          ))}
        </div>
      </Block>

      {/* Principles */}
      <Block cmd="cat principles.md">
        <ol className="grid gap-2 sm:grid-cols-2">
          {site.principles.map((p, i) => (
            <li key={p} className="border border-line px-4 py-3">
              <span className="text-dim">{String(i + 1).padStart(2, "0")}</span> <span className="text-bright">{p}</span>
            </li>
          ))}
        </ol>
      </Block>
    </>
  );
}
