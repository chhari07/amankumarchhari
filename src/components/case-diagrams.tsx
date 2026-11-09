// Case-study diagrams drawn as inline SVG in the SOLOX look: white paper, black hairlines,
// Anton numbers, Inter labels. Colour (the project's --accent) only appears on hover.
import type { NodeKind, SystemDesign, SystemEdge, SystemNode } from "@/content/fullstack";
import type { UserFlow } from "@/content/case-diagrams";

/* ── helpers ── */
function wrap(text: string, max: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (cur && (cur + " " + w).length > max) {
      lines.push(cur);
      cur = w;
    } else cur = cur ? cur + " " + w : w;
  }
  if (cur) lines.push(cur);
  return lines;
}
type Pt = [number, number];
function pointAt(pts: Pt[], t: number): Pt {
  const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let d = seg.reduce((a, b) => a + b, 0) * t;
  for (let i = 0; i < seg.length; i++) {
    if (d <= seg[i] || i === seg.length - 1) {
      const k = seg[i] ? Math.min(d / seg[i], 1) : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    d -= seg[i];
  }
  return pts[0];
}
const KIND_TAG: Record<NodeKind, string> = {
  actor: "person",
  client: "app",
  service: "service",
  ai: "ai model",
  store: "data",
  external: "external",
  gate: "guard",
};

/* ── architecture ── */
const COLW = 312;
const NW = 214;
const NH = 96;
const ROWH = 150;
const PADX = 30;
const TOP = 52;

function EdgeLabel({ at, text }: { at: Pt; text: string }) {
  const lines = text.split("\n");
  const w = Math.max(...lines.map((l) => l.length)) * 6.9 + 14;
  const h = lines.length * 13 + 8;
  return (
    <g className="ae-l">
      <rect x={at[0] - w / 2} y={at[1] - h / 2} width={w} height={h} rx={3} />
      {lines.map((l, i) => (
        <text key={i} x={at[0]} y={at[1] - h / 2 + 15 + i * 13} textAnchor="middle">
          {l}
        </text>
      ))}
    </g>
  );
}

function route(e: SystemEdge, a: SystemNode, b: SystemNode, box: (n: SystemNode) => { x: number; y: number }) {
  const A = box(a);
  const B = box(b);
  const acx = A.x + NW / 2;
  const acy = A.y + NH / 2;
  const bcx = B.x + NW / 2;
  const bcy = B.y + NH / 2;
  const right = bcx > acx;
  let pts: Pt[];
  let label: Pt;
  if (e.route === "vh") {
    const down = bcy > acy;
    const sx = acx + 30;
    pts = [[sx, down ? A.y + NH : A.y], [sx, bcy], [right ? B.x : B.x + NW, bcy]];
    label = pointAt(pts, e.labelAt ?? 0.5);
  } else if (Math.abs(a.col - b.col) < 0.01) {
    const down = bcy > acy;
    pts = [[acx, down ? A.y + NH : A.y], [bcx, down ? B.y : B.y + NH]];
    label = pointAt(pts, 0.5);
  } else if (Math.abs(a.row - b.row) < 0.01) {
    pts = [[right ? A.x + NW : A.x, acy], [right ? B.x : B.x + NW, bcy]];
    label = pointAt(pts, 0.5);
  } else {
    const dir = Math.sign(bcy - acy);
    const sx = right ? A.x + NW : A.x;
    const ex = right ? B.x : B.x + NW;
    const sy = acy + dir * 30;
    const ey = bcy - dir * 14;
    const mx = (sx + ex) / 2 + (e.bend ?? 0);
    pts = [[sx, sy], [mx, sy], [mx, ey], [ex, ey]];
    label = e.labelAt != null ? pointAt(pts, e.labelAt) : [mx, (sy + ey) / 2];
  }
  return { pts, label };
}

export function Architecture({ system, slug }: { system: SystemDesign; slug: string }) {
  const maxCol = Math.max(...system.nodes.map((n) => n.col));
  const maxRow = Math.max(...system.nodes.map((n) => n.row));
  const W = PADX * 2 + maxCol * COLW + NW;
  const H = TOP + maxRow * ROWH + NH + 34;
  const box = (n: SystemNode) => ({ x: PADX + n.col * COLW, y: TOP + n.row * ROWH });
  const byId = Object.fromEntries(system.nodes.map((n) => [n.id, n]));
  const kinds = [...new Set(system.nodes.map((n) => n.kind))];
  const mk = `arr-${slug}`;
  const desc = system.nodes.map((n) => `${n.label}${n.sub ? ` (${n.sub})` : ""}`).join("; ");
  const links = system.edges
    .map((e) => `${byId[e.from]?.label} ${e.both ? "↔" : "→"} ${byId[e.to]?.label}${e.label ? `: ${e.label.replace("\n", " ")}` : ""}`)
    .join("; ");

  return (
    <figure className="dia">
      <div className="dia-scroll">
        <svg viewBox={`0 0 ${W} ${H}`} className="arch" role="img" aria-label={`Architecture. Parts: ${desc}. Links: ${links}.`}>
          <defs>
            <marker id={mk} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0 L10 5 L0 10 z" className="ae-head" />
            </marker>
          </defs>
          {system.zones.map((z) => {
            const x = PADX + z.cols[0] * COLW - 18;
            const y = TOP + z.rows[0] * ROWH - 34;
            const w = (z.cols[1] - z.cols[0]) * COLW + NW + 36;
            const h = (z.rows[1] - z.rows[0]) * ROWH + NH + 50;
            return (
              <g key={z.label} className="az">
                <rect x={x} y={y} width={w} height={h} rx={14} />
                <text x={x + 14} y={y + 21}>
                  {z.label}
                </text>
              </g>
            );
          })}
          {system.edges.map((e) => {
            const a = byId[e.from];
            const b = byId[e.to];
            if (!a || !b) return null;
            const { pts } = route(e, a, b, box);
            return (
              <polyline
                key={e.from + e.to}
                points={pts.map((p) => p.join(",")).join(" ")}
                className={`ae${e.dashed ? " dashed" : ""}`}
                markerEnd={`url(#${mk})`}
                markerStart={e.both ? `url(#${mk})` : undefined}
              />
            );
          })}
          {system.nodes.map((n) => {
            const { x, y } = box(n);
            const sub = n.sub ? wrap(n.sub, 30).slice(0, 3) : [];
            return (
              <g key={n.id} className={`an k-${n.kind}`}>
                <rect x={x} y={y} width={NW} height={NH} rx={n.kind === "actor" ? NH / 2 : 12} />
                {n.kind === "store" ? <rect className="inner" x={x + 5} y={y + 5} width={NW - 10} height={NH - 10} rx={8} /> : null}
                <text className="an-k" x={x + (n.kind === "actor" ? 28 : 16)} y={y + 22}>
                  {KIND_TAG[n.kind]}
                </text>
                <text className="an-l" x={x + (n.kind === "actor" ? 28 : 16)} y={y + 43}>
                  {n.label}
                </text>
                {sub.map((l, i) => (
                  <text key={i} className="an-s" x={x + (n.kind === "actor" ? 28 : 16)} y={y + 61 + i * 14}>
                    {l}
                  </text>
                ))}
              </g>
            );
          })}
          {system.edges.map((e) => {
            const a = byId[e.from];
            const b = byId[e.to];
            if (!a || !b || !e.label) return null;
            return <EdgeLabel key={"l" + e.from + e.to} at={route(e, a, b, box).label} text={e.label} />;
          })}
        </svg>
      </div>
      <figcaption>
        <ul className="dia-key label">
          {kinds.map((k) => (
            <li key={k}>
              <i className={`kk k-${k}`} />
              {KIND_TAG[k]}
            </li>
          ))}
          <li>
            <i className="kl" />
            call
          </li>
          {system.edges.some((e) => e.dashed) ? (
            <li>
              <i className="kl dashed" />
              logical link
            </li>
          ) : null}
        </ul>
      </figcaption>
    </figure>
  );
}

/* ── user flow: swimlanes ── */
const LANEX = 150;
const PITCH = 176;
const BW = 156;
const BH = 150;
const LH = 176;
const FTOP = 0;

export function FlowLanes({ flow, slug }: { flow: UserFlow; slug: string }) {
  const lanes = [...new Set(flow.steps.map((s) => s.actor))];
  const W = LANEX + flow.steps.length * PITCH + 4;
  const H = FTOP + lanes.length * LH;
  const pos = flow.steps.map((s, i) => ({
    x: LANEX + i * PITCH,
    y: FTOP + lanes.indexOf(s.actor) * LH + (LH - BH) / 2,
  }));
  const mk = `uf-${slug}`;
  const aria = flow.steps.map((s, i) => `${i + 1}. ${s.actor}: ${s.title}. ${s.text}`).join(" ");

  return (
    <figure className="dia flowfig">
      <div className="dia-scroll">
        <svg viewBox={`0 0 ${W} ${H}`} className="flow" role="img" aria-label={`User flow: ${aria}`}>
          <defs>
            <marker id={mk} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" className="ae-head" />
            </marker>
          </defs>
          {lanes.map((l, i) => (
            <g key={l} className="lane">
              <line x1={0} x2={W} y1={FTOP + i * LH} y2={FTOP + i * LH} />
              {i === lanes.length - 1 ? <line x1={0} x2={W} y1={FTOP + (i + 1) * LH} y2={FTOP + (i + 1) * LH} /> : null}
              {wrap(l, 9).map((w, j, all) => (
                <text key={j} className="lane-n" x={0} y={FTOP + i * LH + LH / 2 + 12 - (all.length - 1) * 14 + j * 28}>
                  {w}
                </text>
              ))}
            </g>
          ))}
          {pos.slice(1).map((b, i) => {
            const a = pos[i];
            const ay = a.y + BH / 2;
            const by = b.y + BH / 2;
            const sx = a.x + BW;
            const ex = b.x;
            const mx = (sx + ex) / 2;
            const pts = ay === by ? `${sx},${ay} ${ex},${by}` : `${sx},${ay} ${mx},${ay} ${mx},${by} ${ex},${by}`;
            return <polyline key={i} points={pts} className="ae" markerEnd={`url(#${mk})`} />;
          })}
          {flow.steps.map((s, i) => {
            const { x, y } = pos[i];
            return (
              <g key={i} className="ub">
                <rect x={x} y={y} width={BW} height={BH} rx={12} />
                <text className="ub-n" x={x + 14} y={y + 40}>
                  {String(i + 1).padStart(2, "0")}
                </text>
                <text className="ub-t" x={x + 14} y={y + 64}>
                  {s.title}
                </text>
                {wrap(s.text, 21)
                  .slice(0, 5)
                  .map((l, j) => (
                    <text key={j} className="ub-s" x={x + 14} y={y + 84 + j * 14}>
                      {l}
                    </text>
                  ))}
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}
