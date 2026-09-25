import type { IconType } from "react-icons";
import { site } from "@/content/site";

export const user = site.name.split(" ")[0].toLowerCase();

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="border border-line px-1.5 text-xs text-muted">{children}</span>;
}

/** A shell prompt line: `aman@portfolio:~$ cmd` */
export function Prompt({ cmd, path = "~", cursor }: { cmd?: string; path?: string; cursor?: boolean }) {
  return (
    <p className="break-all">
      <span className="text-muted">{user}@portfolio</span>
      <span className="text-dim">:</span>
      <span className="text-fg">{path}</span>
      <span className="text-dim">$</span> <span className="text-bright">{cmd}</span>
      {cursor && <span className="cursor ml-1" aria-hidden />}
    </p>
  );
}

/** A section = one command and its output. */
export function Block({
  id,
  cmd,
  path,
  children,
  className = "",
}: {
  id?: string;
  cmd: string;
  path?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-16 py-10 ${className}`}>
      <Prompt cmd={cmd} path={path} />
      <div className="mt-4">{children}</div>
    </section>
  );
}

/** Markdown-style heading used in case studies. */
export function SectionTitle({ children, icon: Icon, level = 2 }: { children: React.ReactNode; icon?: IconType; level?: 2 | 3 }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 font-bold text-bright">
      <span className="text-dim">{"#".repeat(level)}</span>
      {Icon && <Icon className="size-4 text-muted" aria-hidden />}
      {children}
    </h2>
  );
}

/** Icon + label, aligned to the text baseline. */
export function IconText({ icon: Icon, children, className = "" }: { icon: IconType; children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Icon className="size-[1.05em] shrink-0" aria-hidden />
      {children}
    </span>
  );
}

/** ASCII progress bar: [########..] 80% */
export function Bar({ value, width = 20 }: { value: number; width?: number }) {
  const filled = Math.round((value / 100) * width);
  return (
    <span aria-label={`${value}%`} className="whitespace-pre">
      <span className="text-dim">[</span>
      <span className="text-fg">{"#".repeat(filled)}</span>
      <span className="text-dim">{".".repeat(width - filled)}</span>
      <span className="text-dim">]</span> <span className="text-muted">{String(value).padStart(3)}%</span>
    </span>
  );
}
