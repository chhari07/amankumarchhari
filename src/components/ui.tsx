import type { IconType } from "react-icons";
import { LuPlay } from "react-icons/lu";

export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-surface2/70 px-2 py-px text-xs text-muted">{children}</span>;
}

/** Small media-player pill that labels a section: `● | ▶ | about` */
export function Pill({ label, center = true, className = "" }: { label: string; center?: boolean; className?: string }) {
  return (
    <p className={`${center ? "mx-auto" : ""} flex w-fit items-center gap-2 rounded-full border border-line bg-surface2/70 px-2.5 py-1 text-[11px] text-muted shadow-sm ${className}`}>
      <span className="size-1.5 rounded-full bg-dim" aria-hidden />
      <span className="h-3 w-px bg-line" aria-hidden />
      <LuPlay className="size-2 fill-bright text-bright" aria-hidden />
      <span className="h-3 w-px bg-line" aria-hidden />
      {label}
    </p>
  );
}

/** A section, introduced by its pill and an optional headline. */
export function Block({
  id,
  label,
  title,
  children,
  className = "",
}: {
  id?: string;
  label: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-14 ${className}`}>
      <Pill label={label} />
      {title && <h2 className="display ink mx-auto mt-6 max-w-2xl text-center text-4xl sm:text-5xl">{title}</h2>}
      <div className={title ? "mt-12" : "mt-8"}>{children}</div>
    </section>
  );
}

/** Heading used in case studies. */
export function SectionTitle({ children, icon: Icon }: { children: React.ReactNode; icon?: IconType }) {
  return (
    <h2 className="mb-3 flex items-center gap-2 text-xl font-semibold tracking-tight text-bright">
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

/** Thin rounded progress bar with a percentage. */
export function Bar({ value }: { value: number }) {
  return (
    <span className="flex flex-1 items-center gap-3" aria-label={`${value}%`}>
      <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
        <span className="block h-full rounded-full bg-bright" style={{ width: `${value}%` }} />
      </span>
      <span className="w-9 text-right text-xs tabular-nums text-muted">{value}%</span>
    </span>
  );
}
