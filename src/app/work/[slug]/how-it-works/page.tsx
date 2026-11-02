import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuArrowLeft, LuArrowRight, LuCircleAlert, LuCpu, LuDatabase, LuExternalLink, LuFileCode, LuGithub, LuMonitorSmartphone,
  LuServer, LuShieldCheck, LuSquareTerminal, LuUser, LuWorkflow,
} from "react-icons/lu";
import type { IconType } from "react-icons";
import { notFound } from "next/navigation";
import { Pill, SectionTitle } from "@/components/ui";
import { getProject } from "@/content/projects";
import { getWalkthrough, walkthroughs, type WalkStep } from "@/content/how-it-works";

export const dynamicParams = false;

export function generateStaticParams() {
  return walkthroughs.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]/how-it-works">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  const walk = getWalkthrough(slug);
  return project && walk ? { title: `How ${project.name} works`, description: walk.oneLine } : {};
}

const WHO: Record<WalkStep["who"], { label: string; icon: IconType; tone: string }> = {
  user: { label: "user", icon: LuUser, tone: "text-navy" },
  app: { label: "app", icon: LuMonitorSmartphone, tone: "text-teal" },
  server: { label: "server", icon: LuServer, tone: "text-amber" },
  ai: { label: "ai", icon: LuCpu, tone: "text-violet" },
  data: { label: "data", icon: LuDatabase, tone: "text-moss" },
};

export default async function HowItWorks(props: PageProps<"/work/[slug]/how-it-works">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  const walk = getWalkthrough(slug);
  if (!project || !walk) notFound();

  const i = walkthroughs.findIndex((w) => w.slug === slug);
  const next = getProject(walkthroughs[(i + 1) % walkthroughs.length].slug)!;
  const repo = project.links.find((l) => /github/i.test(l.label));

  return (
    <article className="py-10">
      <Link href={`/work/${slug}`} className="term-btn gap-2 px-5 py-2.5 text-base"><LuArrowLeft className="size-5" aria-hidden /> case study</Link>

      <header className="mt-8">
        <Pill label={`how it works · ${slug}`} center={false} />
        <h1 className="display ink mt-6 pb-1 text-5xl sm:text-7xl">How {project.name} works</h1>
        <p className="mt-3 max-w-3xl text-lg">{walk.oneLine}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a href={walk.tryUrl} target="_blank" rel="noreferrer" className="term-btn term-btn-solid"><LuExternalLink aria-hidden /> try it live</a>
          {repo && <a href={repo.href} target="_blank" rel="noreferrer" className="term-btn"><LuGithub aria-hidden /> source code</a>}
          <a href="#run" className="term-btn"><LuSquareTerminal aria-hidden /> run it locally</a>
        </div>
      </header>

      {/* Video + poster with QR */}
      <section className="mt-10 grid gap-6 lg:grid-cols-[1.9fr_1fr]">
        <figure className="card overflow-hidden">
          <video controls preload="metadata" poster={walk.video.poster} className="aspect-video w-full bg-black">
            <source src={walk.video.src} type="video/mp4" />
          </video>
          <figcaption className="flex justify-between border-t border-line px-4 py-2 text-xs text-muted">
            <span>Narrated walkthrough</span><span>{walk.video.length}</span>
          </figcaption>
        </figure>
        <div className="grid grid-cols-[1fr_auto] gap-4 lg:grid-cols-1">
          <a href={walk.posterArt} target="_blank" rel="noreferrer" className="card block overflow-hidden">
            <Image src={walk.posterArt} alt={`${project.name} poster`} width={1200} height={1600} className="max-h-[22rem] w-full object-cover object-top" />
          </a>
          <div className="card flex flex-col items-center justify-center gap-2 p-4 text-center">
            <Image src={walk.qr} alt={`QR code for ${walk.tryUrl}`} width={128} height={128} className="size-28 sm:size-32" unoptimized />
            <p className="text-xs text-muted">scan to open<br /><span className="break-all text-fg">{walk.tryUrl.replace("https://", "")}</span></p>
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="mt-16">
        <SectionTitle icon={LuWorkflow}>Step by step</SectionTitle>
        <p className="mb-6 max-w-3xl text-muted">What happens, in order, and the files in the repo that do it.</p>
        <ol className="relative space-y-4 before:absolute before:top-2 before:bottom-2 before:left-[1.15rem] before:w-px before:bg-line">
          {walk.steps.map((s, n) => {
            const who = WHO[s.who];
            return (
              <li key={s.title} className="relative flex gap-4">
                <span className="z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface2 font-mono text-xs text-navy">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <div className="card min-w-0 flex-1 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-bright">{s.title}</h3>
                    <span className={`inline-flex items-center gap-1 rounded-full border border-line px-2 py-px text-[11px] ${who.tone}`}>
                      <who.icon className="size-3" aria-hidden /> {who.label}
                    </span>
                  </div>
                  <p className="mt-1.5 text-fg">{s.what}</p>
                  {s.detail && (
                    <pre className="mt-3 overflow-x-auto rounded-lg bg-bright px-3 py-2 font-mono text-[12px] text-surface2">{s.detail}</pre>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.files.map((f) => (
                      <code key={f} className="inline-flex items-center gap-1 rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[11.5px] text-muted">
                        <LuFileCode className="size-3" aria-hidden /> {f}
                      </code>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Safety nets */}
      <section className="mt-16">
        <SectionTitle icon={LuShieldCheck}>What keeps it safe</SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {walk.guards.map((g) => (
            <div key={g.title} className="card p-4">
              <p className="font-semibold text-bright">{g.title}</p>
              <p className="mt-1 text-muted">{g.text}</p>
              <code className="mt-3 block truncate font-mono text-[11.5px] text-dim">{g.file}</code>
            </div>
          ))}
        </div>
      </section>

      {/* Honest limits */}
      <section className="mt-16">
        <SectionTitle icon={LuCircleAlert}>Honest limits</SectionTitle>
        <ul className="space-y-1.5">
          {walk.limits.map((l) => (
            <li key={l} className="flex gap-2"><span className="text-rust">!</span><span>{l}</span></li>
          ))}
        </ul>
      </section>

      {/* Run locally */}
      <section id="run" className="mt-16 scroll-mt-20">
        <SectionTitle icon={LuSquareTerminal}>Run it locally</SectionTitle>
        <div className="grid gap-4 md:grid-cols-2">
          {walk.run.map((r) => (
            <div key={r.label} className="card overflow-hidden">
              <p className="border-b border-line bg-surface px-4 py-2 text-xs uppercase text-dim">{r.label}</p>
              <pre className="overflow-x-auto p-4 font-mono text-[12.5px] text-fg">
                {r.cmds.map((c) => <span key={c} className="block"><span className="text-moss">$</span> {c}</span>)}
              </pre>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">API keys and database URLs go in a local env file; see the project README.</p>
      </section>

      <nav className="mt-16 flex flex-wrap justify-between gap-3 border-t border-line pt-6">
        <Link href={`/work/${slug}`} className="term-btn"><LuArrowLeft aria-hidden /> {project.name} case study</Link>
        <Link href={`/work/${next.slug}/how-it-works`} className="term-btn">how {next.name} works <LuArrowRight aria-hidden /></Link>
      </nav>
    </article>
  );
}
