import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuExternalLink, LuFolder, LuGithub } from "react-icons/lu";
import type { Project } from "@/content/projects";
import { Tag } from "./ui";

export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const live = project.links.find((l) => /live|demo/i.test(l.label) && !/video/i.test(l.label));
  const repo = project.links.find((l) => /github/i.test(l.label));
  const href = `/work/${project.slug}`;

  return (
    <article className={`group flex flex-col border border-line bg-surface transition hover:border-muted ${featured ? "md:col-span-2" : ""}`}>
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5 text-xs text-dim">
        <span className="flex items-center gap-1.5"><LuFolder aria-hidden /> ~/projects/{project.slug}/</span>
        <span className="flex items-center gap-2">
          {live && <span className="flex items-center gap-1 text-muted"><span className="size-1.5 rounded-full bg-fg" /> live</span>}
          {project.year}
        </span>
      </div>
      {project.cover && (
        <Link href={href} tabIndex={-1} className={`relative block overflow-hidden border-b border-line ${featured ? "aspect-[21/9]" : "aspect-[16/9]"}`}>
          <Image
            src={project.cover}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover object-top opacity-80 grayscale transition duration-300 group-hover:scale-[1.02] group-hover:opacity-100 group-hover:grayscale-0"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-4">
        <Link href={href}>
          <span className="font-bold text-bright hover:underline">{project.name}</span>
          <span className="text-muted"> — {project.tagline}</span>
        </Link>
        <ul className="mt-3 space-y-1 text-[13px]">
          {project.highlights.slice(0, featured ? 3 : 2).map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-dim">›</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-5 text-[13px]">
          <Link href={href} className="term-btn term-btn-solid">case study <LuArrowRight aria-hidden /></Link>
          {live && <a href={live.href} target="_blank" rel="noreferrer" className="term-btn"><LuExternalLink aria-hidden /> live</a>}
          {repo && <a href={repo.href} target="_blank" rel="noreferrer" className="term-btn"><LuGithub aria-hidden /> code</a>}
        </div>
      </div>
    </article>
  );
}
