import type { IconType } from "react-icons";
import {
  LuArrowDown, LuArrowRight, LuBot, LuCircleAlert, LuCloud, LuCornerDownRight, LuDatabase, LuMonitor,
  LuServer, LuShieldCheck, LuUser, LuX,
} from "react-icons/lu";
import type { Decision, Diagram as DiagramData, DiagramNode, DiagramStep, NodeKind } from "@/content/projects";

export const kinds: Record<NodeKind, { icon: IconType; tag: string }> = {
  actor: { icon: LuUser, tag: "user" },
  client: { icon: LuMonitor, tag: "client" },
  service: { icon: LuServer, tag: "service" },
  ai: { icon: LuBot, tag: "ai" },
  store: { icon: LuDatabase, tag: "data" },
  external: { icon: LuCloud, tag: "external" },
  gate: { icon: LuShieldCheck, tag: "guard" },
};

/** A titled frame, like a terminal pane. */
export function Figure({ title, caption, index, children }: { title: string; caption?: string; index?: number; children: React.ReactNode }) {
  return (
    <figure className="card overflow-hidden">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-2.5">
        <span className="font-medium text-bright">
          {index !== undefined && <span className="text-dim">fig.{index + 1} </span>}
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
    <div className={`w-full rounded-xl border bg-surface2 ${node.kind === "gate" ? "border-muted" : "border-line"}`}>
      <div className={`flex items-start gap-2 ${compact ? "px-2.5 py-2" : "px-3 py-2.5"}`}>
        <Icon className="mt-1 shrink-0 text-muted" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-bright">{node.label}</p>
          {node.note && <p className="text-xs text-muted">{node.note}</p>}
        </div>
        <span className="shrink-0 text-[10px] uppercase tracking-wider text-dim">{k.tag}</span>
      </div>
      {node.branch && (
        <p className="flex items-start gap-1.5 border-t border-dashed border-line px-3 py-1.5 text-xs text-muted">
          <LuCornerDownRight className="mt-0.5 shrink-0" aria-hidden /> {node.branch}
        </p>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="flex flex-col items-center text-dim">
      <span className="h-3 w-px bg-line" />
      <LuArrowDown className="-mt-0.5" />
    </div>
  );
}

function Step({ step }: { step: DiagramStep }) {
  if ("parallel" in step) {
    const n = step.parallel.length;
    const cols = n >= 3 ? "sm:grid-cols-2 lg:grid-cols-3" : n === 2 ? "sm:grid-cols-2" : "";
    return (
      <div className="w-full rounded-2xl border border-dashed border-line p-2">
        <p className="mb-2 px-1 text-[10px] uppercase tracking-wider text-dim">
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
            {i > 0 && <LuArrowRight className="mx-2 text-dim" aria-hidden />}
            <span className={`rounded-full border px-3 py-1.5 ${i === states.length - 1 ? "border-bright bg-bright text-surface2" : "border-line bg-surface2 text-bright"}`}>
              {i === 0 && <span className="text-dim">● </span>}
              {s}
            </span>
          </li>
        ))}
      </ol>
      {exits && exits.length > 0 && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {exits.map((e) => (
            <li key={e.state} className="flex items-start gap-2 rounded-xl border border-dashed border-line px-3 py-2">
              <LuX className="mt-1 shrink-0 text-muted" aria-hidden />
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
              <p className="rounded-xl border border-dashed border-line px-3 py-2 text-dim line-through">{d.rejected}</p>
              <LuArrowRight className="mx-auto rotate-90 text-muted md:rotate-0" aria-hidden />
              <p className="rounded-xl border border-bright bg-surface2 px-3 py-2 text-bright">{d.chose}</p>
            </div>
            <p className="mt-2 flex items-start gap-1.5 text-xs text-muted">
              <LuCornerDownRight className="mt-0.5 shrink-0" aria-hidden /> {d.why}
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
            <p className="flex items-start gap-2 rounded-xl border border-line bg-surface2 px-3 py-2 text-bright">
              <LuCircleAlert className="mt-1 shrink-0 text-muted" aria-hidden /> {f.what}
            </p>
            <LuArrowRight className="mx-auto rotate-90 text-muted md:rotate-0" aria-hidden />
            <p className={`flex items-start gap-2 rounded-xl border px-3 py-2 ${f.handling.startsWith("TODO") ? "border-dashed border-line italic text-dim" : "border-muted text-fg"}`}>
              <LuShieldCheck className="mt-1 shrink-0 text-muted" aria-hidden /> {f.handling}
            </p>
          </li>
        ))}
      </ul>
    </Figure>
  );
}
