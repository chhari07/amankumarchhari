import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  LuArrowLeft, LuChartBar, LuCircleAlert, LuExternalLink, LuGithub, LuLayers, LuListTodo, LuScale, LuTarget, LuZap,
} from "react-icons/lu";
import { notFound } from "next/navigation";
import { CaseTabs } from "@/components/case-tabs";
import { DecisionDiagram, Diagram, FailureDiagram, Figure } from "@/components/diagram";
import { SystemDiagram } from "@/components/system-diagram";
import { Prompt, SectionTitle, Tag } from "@/components/ui";
import { getProject, projects } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = getProject((await props.params).slug);
  return project ? { title: project.name, description: project.tagline } : {};
}

const isTodo = (v: string) => v.startsWith("TODO");

export default async function CaseStudy(props: PageProps<"/work/[slug]">) {
  const project = getProject((await props.params).slug);
  if (!project) notFound();
  const diagramCount = project.diagrams.length + 3; // + system design, decisions, failure paths

  return (
    <article className="py-10">
      <Link href="/#work" className="inline-flex items-center gap-2 text-muted hover:text-bright"><LuArrowLeft aria-hidden /> cd ..</Link>

      {/* 30-second block */}
      <header className="mt-8">
        <Prompt cmd="cat README.md" path={`~/projects/${project.slug}`} />
        <h1 className="mt-6 text-3xl font-extrabold text-bright sm:text-5xl">
          <span className="text-dim"># </span>{project.name}
        </h1>
        <p className="mt-3 text-lg">{project.tagline}</p>
        <p className="mt-1 text-muted">{project.role} · {project.year}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => <Tag key={s}>{s}</Tag>)}
        </div>
        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.links.map((l, i) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className={`term-btn ${i === 0 ? "term-btn-solid" : ""}`}>
                {/github/i.test(l.label) ? <LuGithub aria-hidden /> : <LuExternalLink aria-hidden />} {l.label.toLowerCase()}
              </a>
            ))}
          </div>
        )}
      </header>

      {project.cover && (
        <figure className="group mt-10 border border-line bg-surface">
          <figcaption className="border-b border-line px-3 py-1.5 text-xs text-dim">{project.cover.split("/").at(-1)}</figcaption>
          <Image src={project.cover} alt={`${project.name} screenshot`} width={1600} height={900} priority className="w-full grayscale transition duration-300 group-hover:grayscale-0" />
        </figure>
      )}

      <section className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <SectionTitle icon={LuTarget}>Problem</SectionTitle>
          <p>{project.problem}</p>
        </div>
        <div>
          <SectionTitle icon={LuZap}>In short</SectionTitle>
          <ul className="space-y-1.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2"><span className="text-dim">-</span><span>{h}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* Deep section: written or diagram view */}
      <div className="mt-14">
        <CaseTabs
          count={diagramCount}
          text={
            <>
          <section className="mt-8">
            <SectionTitle icon={LuLayers}>Architecture</SectionTitle>
            <p className="mb-5 max-w-3xl text-muted">{project.architecture.summary}</p>
            <div className="mb-6">
              <Figure title="System design" caption={project.system.caption}>
                <SystemDiagram design={project.system} id={`${project.slug}-text`} />
              </Figure>
            </div>
            <ol className="border border-line bg-surface">
              {project.architecture.flow.map((step, i) => (
                <li key={step} className="flex gap-4 border-b border-line px-4 py-2 last:border-b-0">
                  <span className="text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14">
            <SectionTitle icon={LuScale}>Decisions</SectionTitle>
            <div className="space-y-4">
              {project.decisions.map((d) => (
                <pre key={d.chose} className="whitespace-pre-wrap border border-line bg-surface p-4 font-mono">
                  <span className="block text-bright">+ {d.chose}</span>
                  <span className="block text-dim line-through">- {d.rejected}</span>
                  <span className="mt-2 block text-muted">  {d.why}</span>
                </pre>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <SectionTitle icon={LuCircleAlert}>Failure handling</SectionTitle>
            <div className="border border-line">
              <div className="hidden grid-cols-2 gap-6 border-b border-line bg-surface px-4 py-2 text-xs uppercase text-dim sm:grid">
                <span>failure</span><span>handling</span>
              </div>
              {project.failures.map((f) => (
                <div key={f.what} className="grid gap-1 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-2 sm:gap-6">
                  <p className="text-bright">{f.what}</p>
                  <p className={isTodo(f.handling) ? "text-dim italic" : "text-muted"}>{f.handling}</p>
                </div>
              ))}
            </div>
          </section>
            </>
          }
          diagrams={
            <div className="space-y-6 pt-8">
              <Figure title="System design" caption={project.system.caption} index={0}>
                <SystemDiagram design={project.system} id={`${project.slug}-diagrams`} />
              </Figure>
              {project.diagrams.map((d, i) => <Diagram key={d.title} diagram={d} index={i + 1} />)}
              <DecisionDiagram decisions={project.decisions} index={project.diagrams.length + 1} />
              <FailureDiagram failures={project.failures} index={project.diagrams.length + 2} />
            </div>
          }
        />
      </div>

      <section className="mt-14">
        <SectionTitle icon={LuChartBar}>Numbers</SectionTitle>
        <div className={`grid grid-cols-2 gap-px border border-line bg-line ${["md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3", "md:grid-cols-4"][Math.min(project.metrics.length, 4) - 1]} ${project.metrics.length === 1 ? "grid-cols-1" : ""}`}>
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-bg p-4">
              <p className={`text-3xl font-bold ${isTodo(m.value) ? "text-dim" : "text-bright"}`}>{m.value}</p>
              <p className="mt-1 text-xs text-muted">{m.label}</p>
              {m.note && <p className="text-xs text-dim">{m.note}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <SectionTitle icon={LuListTodo}>Next</SectionTitle>
        <ul className="space-y-1">
          {project.next.map((n) => (
            <li key={n}><span className="text-dim">- [ ]</span> {n}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}
