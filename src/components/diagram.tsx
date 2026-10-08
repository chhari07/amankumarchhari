import type { IconType } from "react-icons";
import {
  LuArrowDown, LuArrowRight, LuBot, LuCircleAlert, LuCloud, LuCornerDownRight, LuDatabase, LuMonitor,
  LuServer, LuShieldCheck, LuUser, LuX,
} from "react-icons/lu";
import type { Decision, Diagram as DiagramData, DiagramNode, DiagramStep, NodeKind } from "@/content/projects";

/** Each node kind gets one theme accent; class strings are spelled out so Tailwind can see them. */
type Tone = { text: string; tint: string; border: string; fill: string; fillTint: string; stroke: string };
const tone = {
  navy: { text: "text-navy", tint: "bg-navy/10", border: "border-navy/40", fill: "fill-navy", fillTint: "fill-navy/15", stroke: "stroke-navy/60" },
  violet: { text: "text-violet", tint: "bg-violet/10", border: "border-violet/40", fill: "fill-violet", fillTint: "fill-violet/15", stroke: "stroke-violet/60" },
  moss: { text: "text-moss", tint: "bg-moss/10", border: "border-moss/40", fill: "fill-moss", fillTint: "fill-moss/15", stroke: "stroke-moss/60" },
  pink: { text: "text-pink", tint: "bg-pink/10", border: "border-pink/40", fill: "fill-pink", fillTint: "fill-pink/15", stroke: "stroke-pink/60" },
  amber: { text: "text-amber", tint: "bg-amber/10", border: "border-amber/40", fill: "fill-amber", fillTint: "fill-amber/15", stroke: "stroke-amber/60" },
  teal: { text: "text-teal", tint: "bg-teal/10", border: "border-teal/40", fill: "fill-teal", fillTint: "fill-teal/15", stroke: "stroke-teal/60" },
  rust: { text: "text-rust", tint: "bg-rust/10", border: "border-rust/40", fill: "fill-rust", fillTint: "fill-rust/15", stroke: "stroke-rust/60" },
} satisfies Record<string, Tone>;

export const kinds: Record<NodeKind, { icon: IconType; tag: string; tone: Tone }> = {
  actor: { icon: LuUser, tag: "user", tone: tone.navy },
  client: { icon: LuMonitor, tag: "client", tone: tone.violet },
  service: { icon: LuServer, tag: "service", tone: tone.moss },
  ai: { icon: LuBot, tag: "ai", tone: tone.pink },
  store: { icon: LuDatabase, tag: "data", tone: tone.amber },
  external: { icon: LuCloud, tag: "external", tone: tone.teal },
  gate: { icon: LuShieldCheck, tag: "guard", tone: tone.rust },
};

/** A titled frame, like a terminal pane. */
export function Figure({ title, caption, index, children }: { title: string; caption?: string; index?: number; children: React.ReactNode }) {
  return (
    <figure className="card overflow-hidden">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-2.5">
        <span className="font-medium text-bright">
          {index !== undefined && <span className="text-navy">fig.{index + 1} </span>}
          {title}
        </span>
        {caption && <span className="text-xs text-muted">{caption}</span>}
      </figcaption>
      <div className="overflow-x-auto p-4 sm:p-6">{children}</div>
    </figure>
  );
}

function Node({ node, compact }: { node: DiagramNode; compact?: boolean }) {
  const k = kinds[node.kind ?? "service"];
  const Icon = k.icon;
  return (
    <div className={`w-full rounded-xl border bg-surface2 ${k.tone.border}`}>
      <div className={`flex items-start gap-2 ${compact ? "px-2.5 py-2" : "px-3 py-2.5"}`}>
        <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md ${k.tone.tint} ${k.tone.text}`}>
          <Icon aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-bright">{node.label}</p>
          {node.note && <p className="text-xs text-muted">{node.note}</p>}
        </div>
        <span className={`shrink-0 text-[10px] uppercase tracking-wider ${k.tone.text}`}>{k.tag}</span>
      </div>
      {node.branch && (
        <p className="flex items-start gap-1.5 border-t border-dashed border-line px-3 py-1.5 text-xs text-muted">
          <LuCornerDownRight className="mt-0.5 shrink-0 text-rust" aria-hidden /> {node.branch}
        </p>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="flex flex-col items-center text-navy/60">
      <span className="h-3 w-px bg-navy/40" />
      <LuArrowDown className="-mt-0.5" />
    </div>
  );
}

function Step({ step }: { step: DiagramStep }) {
  if ("parallel" in step) {
    const n = step.parallel.length;
    const cols = n >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : n === 2 ? "sm:grid-cols-2" : "";
    return (
      <div className="w-full rounded-2xl border border-dashed border-navy/30 bg-navy/[0.03] p-2">
        <p className="mb-2 px-1 text-[10px] uppercase tracking-wider text-navy">
          {step.label ?? `parallel ×${n}`}
          {step.note && <span className="normal-case tracking-normal text-muted"> · {step.note}</span>}
        </p>
        <div className={`grid gap-2 ${cols}`}>
          {step.parallel.map((node) => <Node key={node.label} node={node} compact />)}
        </div>
      </div>
    );
  }
  return <Node node={step} />;
}

function Flow({ steps }: { steps: DiagramStep[] }) {
  return (
    <ol className="mx-auto flex max-w-3xl flex-col items-center">
      {steps.map((step, i) => (
        <li key={i} className="flex w-full flex-col items-center">
          {i > 0 && <Arrow />}
          <Step step={step} />
        </li>
      ))}
    </ol>
  );
}

function States({ states, exits }: { states: string[]; exits?: { state: string; note: string }[] }) {
  return (
    <div>
      <ol className="flex flex-wrap items-center gap-y-3">
        {states.map((s, i) => (
          <li key={s} className="flex items-center">
            {i > 0 && <LuArrowRight className="mx-2 text-navy/60" aria-hidden />}
            <span className={`rounded-full border px-3 py-1.5 ${i === states.length - 1 ? "border-moss bg-moss text-surface2" : i === 0 ? "border-navy/40 bg-navy/10 text-bright" : "border-line bg-surface2 text-bright"}`}>
              {i === 0 && <span className="text-navy">● </span>}
              {s}
            </span>
          </li>
        ))}
      </ol>
      {exits && exits.length > 0 && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {exits.map((e) => (
            <li key={e.state} className="flex items-start gap-2 rounded-xl border border-dashed border-rust/40 bg-rust/5 px-3 py-2">
              <LuX className="mt-1 shrink-0 text-rust" aria-hidden />
              <div>
                <p className="text-bright">{e.state}</p>
                <p className="text-xs text-muted">{e.note}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Diagram({ diagram, index }: { diagram: DiagramData; index: number }) {
  return (
    <Figure title={diagram.title} caption={diagram.caption} index={index}>
      {diagram.type === "flow" ? <Flow steps={diagram.steps} /> : <States states={diagram.states} exits={diagram.exits} />}
    </Figure>
  );
}

/** Rejected option → chosen option, with the reason underneath. */
export function DecisionDiagram({ decisions, index }: { decisions: Decision[]; index: number }) {
  return (
    <Figure title="Decisions" caption="what I rejected → what I chose, and why" index={index}>
      <ul className="space-y-5">
        {decisions.map((d) => (
          <li key={d.chose}>
            <div className="grid items-center gap-2 md:grid-cols-[1fr_auto_1fr]">
              <p className="rounded-xl border border-dashed border-rust/40 bg-rust/5 px-3 py-2 text-dim line-through decoration-rust/60">{d.rejected}</p>
              <LuArrowRight className="mx-auto rotate-90 text-navy/60 md:rotate-0" aria-hidden />
              <p className="rounded-xl border border-moss/50 bg-moss/10 px-3 py-2 text-bright">{d.chose}</p>
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-xs text-muted">
              <LuCornerDownRight className="mt-0.5 shrink-0 text-navy" aria-hidden /> {d.why}
            </p>
          </li>
        ))}
      </ul>
    </Figure>
  );
}

/** Failure → how the system handles it. */
export function FailureDiagram({ failures, index }: { failures: { what: string; handling: string }[]; index: number }) {
  return (
    <Figure title="Failure paths" caption="what can break → what the system does" index={index}>
      <ul className="space-y-3">
        {failures.map((f) => (
          <li key={f.what} className="grid items-center gap-2 md:grid-cols-[1fr_auto_1fr]">
            <p className="flex items-start gap-2 rounded-xl border border-rust/40 bg-rust/5 px-3 py-2 text-bright">
              <LuCircleAlert className="mt-1 shrink-0 text-rust" aria-hidden /> {f.what}
            </p>
            <LuArrowRight className="mx-auto rotate-90 text-navy/60 md:rotate-0" aria-hidden />
            <p className={`flex items-start gap-2 rounded-xl border px-3 py-2 ${f.handling.startsWith("TODO") ? "border-dashed border-line italic text-dim" : "border-moss/50 bg-moss/10 text-fg"}`}>
              <LuShieldCheck className={`mt-1 shrink-0 ${f.handling.startsWith("TODO") ? "text-dim" : "text-moss"}`} aria-hidden /> {f.handling}
            </p>
          </li>
        ))}
      </ul>
    </Figure>
  );
}
