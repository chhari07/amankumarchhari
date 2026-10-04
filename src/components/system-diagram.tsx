import type { NodeKind, SystemDesign, SystemEdge, SystemNode } from "@/content/projects";
import { kinds } from "./diagram";

// Grid geometry (SVG units)
const W = 184; // node width
const H = 78; // node height
const COL = 254; // column pitch (70px gap for edge labels)
const ROW = 124; // row pitch
const PAD = 36;

type Side = "left" | "right" | "top" | "bottom";
type Box = { x: number; y: number; cx: number; cy: number };

const box = (n: SystemNode): Box => {
  const x = PAD + n.col * COL;
  const y = PAD + 18 + n.row * ROW;
  return { x, y, cx: x + W / 2, cy: y + H / 2 };
};

/** Which sides an edge leaves from and arrives at. */
function sides(e: SystemEdge, s: SystemNode, t: SystemNode): [Side, Side] {
  if (e.route === "vh") return [t.row > s.row ? "bottom" : "top", t.col > s.col ? "left" : "right"];
  if (s.col === t.col) return t.row > s.row ? ["bottom", "top"] : ["top", "bottom"];
  return t.col > s.col ? ["right", "left"] : ["left", "right"];
}

function anchor(b: Box, side: Side, offset: number) {
  switch (side) {
    case "left": return { x: b.x, y: b.cy + offset };
    case "right": return { x: b.x + W, y: b.cy + offset };
    case "top": return { x: b.cx + offset, y: b.y };
    case "bottom": return { x: b.cx + offset, y: b.y + H };
  }
}

/** Wrap a subtitle into at most three lines that fit the box. */
function wrap(text: string, max = 27, maxLines = 3): string[] {
  const words = text.split(" ");
  const lines: string[] = [""];
  for (const w of words) {
    const cur = lines[lines.length - 1];
    if ((cur + " " + w).trim().length <= max) lines[lines.length - 1] = (cur + " " + w).trim();
    else if (lines.length < maxLines) lines.push(w);
    else {
      lines[maxLines - 1] = lines[maxLines - 1].slice(0, max - 1) + "…";
      break;
    }
  }
  return lines;
}

function EdgeLabel({ x, y, text, anchorStart }: { x: number; y: number; text: string; anchorStart?: boolean }) {
  const lines = text.split("\n");
  const w = Math.max(...lines.map((l) => l.length)) * 6.2 + 8;
  const h = lines.length * 12 + 4;
  const rx = anchorStart ? x : x - w / 2;
  return (
    <g>
      <rect x={rx} y={y - h / 2} width={w} height={h} rx="4" className="fill-surface" />
      <text x={rx + w / 2} y={y - h / 2 + 11} textAnchor="middle" className="fill-muted" fontSize="10.5">
        {lines.map((l, i) => (
          <tspan key={i} x={rx + w / 2} dy={i ? 12 : 0}>{l}</tspan>
        ))}
      </text>
    </g>
  );
}

export function SystemDiagram({ design, id }: { design: SystemDesign; id: string }) {
  const byId = new Map(design.nodes.map((n) => [n.id, n]));
  const maxCol = Math.max(...design.nodes.map((n) => n.col));
  const maxRow = Math.max(...design.nodes.map((n) => n.row));
  const width = PAD * 2 + maxCol * COL + W;
  const height = PAD * 2 + 18 + maxRow * ROW + H;

  // Spread edges that share a node side so their ends don't overlap.
  const ends = design.edges.map((e) => {
    const s = byId.get(e.from)!;
    const t = byId.get(e.to)!;
    const [ss, ts] = sides(e, s, t);
    return { e, s, t, ss, ts };
  });
  const slots = new Map<string, number[]>();
  ends.forEach(({ s, t, ss, ts }, i) => {
    for (const key of [`${s.id}:${ss}`, `${t.id}:${ts}`]) slots.set(key, [...(slots.get(key) ?? []), i]);
  });
  const offset = (nodeId: string, side: Side, i: number) => {
    const list = slots.get(`${nodeId}:${side}`) ?? [i];
    const k = list.indexOf(i);
    const step = side === "left" || side === "right" ? 14 : 36;
    return (k - (list.length - 1) / 2) * step;
  };

  const marker = `arrow-${id}`;
  const usedKinds = [...new Set(design.nodes.map((n) => n.kind))] as NodeKind[];

  return (
    <div>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`System design: ${design.nodes.map((n) => n.label).join(", ")}`}
          className="h-auto w-full min-w-[720px] font-mono"
        >
          <defs>
            <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="fill-muted" />
            </marker>
            <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" className="fill-line" />
            </pattern>
          </defs>

          <rect width={width} height={height} fill={`url(#dots-${id})`} />

          {/* zones */}
          {design.zones.map((z) => {
            const x = PAD + z.cols[0] * COL - 14;
            const y = PAD + 18 + z.rows[0] * ROW - 30;
            const w = (z.cols[1] - z.cols[0]) * COL + W + 28;
            const h = (z.rows[1] - z.rows[0]) * ROW + H + 44;
            return (
              <g key={z.label}>
                <rect x={x} y={y} width={w} height={h} rx="14" className="fill-bg/50 stroke-dim" strokeDasharray="4 4" />
                <text x={x + 8} y={y + 14} fontSize="10" letterSpacing="1.5" className="fill-dim">{z.label.toUpperCase()}</text>
              </g>
            );
          })}

          {/* edges */}
          {ends.map(({ e, s, t, ss, ts }, i) => {
            const a = anchor(box(s), ss, offset(s.id, ss, i));
            const b = anchor(box(t), ts, offset(t.id, ts, i));
            let d: string;
            let lx: number;
            let ly: number;
            let side = false;
            if (e.route === "vh") {
              d = `M${a.x} ${a.y} V${b.y} H${b.x}`;
              lx = a.x + 6;
              ly = (a.y + b.y) / 2;
              side = true;
            } else if (ss === "top" || ss === "bottom") {
              d = `M${a.x} ${a.y} V${b.y}`;
              lx = a.x + 6;
              ly = (a.y + b.y) / 2;
              side = true;
            } else if (Math.abs(a.y - b.y) < 1) {
              d = `M${a.x} ${a.y} H${b.x}`;
              lx = (a.x + b.x) / 2;
              ly = a.y - 9;
            } else {
              const mx = (a.x + b.x) / 2 + (e.bend ?? 0);
              d = `M${a.x} ${a.y} H${mx} V${b.y} H${b.x}`;
              lx = mx;
              ly = a.y + (b.y - a.y) * (e.labelAt ?? 0.5);
            }
            return (
              <g key={`${e.from}-${e.to}`}>
                <path
                  d={d}
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="1.2"
                  strokeDasharray={e.dashed ? "4 3" : undefined}
                  markerEnd={`url(#${marker})`}
                  markerStart={e.both ? `url(#${marker})` : undefined}
                />
                {e.label && <EdgeLabel x={lx} y={ly} text={e.label} anchorStart={side} />}
              </g>
            );
          })}

          {/* nodes */}
          {design.nodes.map((n) => {
            const b = box(n);
            const Icon = kinds[n.kind].icon;
            return (
              <g key={n.id}>
                <rect x={b.x} y={b.y + 3} width={W} height={H} rx="10" className="fill-line" />
                <rect x={b.x} y={b.y} width={W} height={H} rx="10" className={`fill-surface2 ${n.kind === "gate" ? "stroke-fg" : "stroke-dim"}`} strokeWidth="1.2" />
                <Icon x={b.x + 10} y={b.y + 10} size={15} className="text-muted" aria-hidden />
                <text x={b.x + 32} y={b.y + 22} fontSize="13" fontWeight="700" className="fill-bright">{n.label}</text>
                {n.sub && (
                  <text x={b.x + 10} y={b.y + 41} fontSize="10.5" className="fill-muted">
                    {wrap(n.sub).map((l, i) => (
                      <tspan key={i} x={b.x + 10} dy={i ? 13 : 0}>{l}</tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* legend */}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
        {usedKinds.map((k) => {
          const Icon = kinds[k].icon;
          return (
            <li key={k} className="flex items-center gap-1.5"><Icon aria-hidden /> {kinds[k].tag}</li>
          );
        })}
        <li className="flex items-center gap-1.5"><span className="inline-block w-5 border-t border-muted" /> call</li>
        {design.edges.some((e) => e.dashed) && (
          <li className="flex items-center gap-1.5"><span className="inline-block w-5 border-t border-dashed border-muted" /> logical link</li>
        )}
        <li className="flex items-center gap-1.5 sm:hidden">← scroll →</li>
      </ul>
    </div>
  );
}
