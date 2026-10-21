// User-flow staircases: one tile per step of a person's journey, rising as they
// go, in lanes for who acts; a pawn hops from tile to tile along the floor path.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../kit/iso-kit.mjs";
import { kitScript } from "../kit/inline.mjs";
import { frameScript } from "../frame.mjs";
import { FLOWS } from "./flows.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--dark") ? "dark" : "light";
const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));

const WIDTH = 600;
const HEIGHT = 320;

const TILE_W = 56;
const TILE_D = 32;
const PITCH = 66; // step pitch along x
const LANE = 50; // lane pitch along y
const BASE_H = 6; // first tile height
const RISE = 5; // each later tile is this much taller
const PLATE_H = 10;
const LABEL_EM = 7.5 * 0.64; // lane-name width per character (mono, size 7.5)

function build(slug, flow) {
  const { steps, lanes } = flow;
  const laneY = (lane) => ((lanes.length - 1) / 2 - lane) * LANE; // lane 0 nearest the viewer
  const tiles = steps.map((s, i) => {
    const x = i * PITCH - ((steps.length - 1) * PITCH) / 2 - TILE_W / 2;
    const y = laneY(s.lane) - TILE_D / 2;
    return { ...s, i, plan: { x, y, w: TILE_W, d: TILE_D, r: 3 }, cx: x + TILE_W / 2, cy: laneY(s.lane), h: BASE_H + i * RISE };
  });

  const left = tiles[0].plan.x - 22 - Math.max(...lanes.map((n) => n.length)) * LABEL_EM;
  const right = tiles[tiles.length - 1].plan.x + TILE_W + 14;
  const back = laneY(lanes.length - 1) - TILE_D / 2 - 14;
  const front = laneY(0) + TILE_D / 2 + 14;
  const PLATE = { x: left, y: back, w: right - left, d: front - back, r: 8 };
  const top = tiles[tiles.length - 1].h;

  const P = k.fitProjection(
    [...k.boxCorners(PLATE, -PLATE_H, 0), ...tiles.flatMap((t) => k.boxCorners(t.plan, 0, t.h + 26))],
    WIDTH,
    HEIGHT,
    { pad: 20, azimuth: 62 },
  );
  const at = (point) => k.iso(point, P);
  const S = (paths, style) => k.solidSvg(paths, style);
  const L = (d, style) => k.lineSvg(d, style);

  function plate() {
    const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H, PLATE_H, P)}"/>`];
    out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.4), { tone: "mid", inner: L(k.sideSeam(PLATE, -5, P, 8), { tone: "faint" }) }));
    out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
    out.push(k.dotsSvg(k.corners(PLATE, 10).map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
    // lane names and dividers
    lanes.forEach((name, lane) => {
      out.push(k.faceTextSvg(k.topMatrix([PLATE.x + 12, laneY(lane) + 2], 0, P, "x"), name.toUpperCase(), { size: 7.5, tone: "mid" }));
      if (lane) {
        const y = (laneY(lane) + laneY(lane - 1)) / 2;
        out.push(L(k.lineOnTop([PLATE.x + 8, y], [PLATE.x + PLATE.w - 8, y], 0, P), { tone: "faint", dashed: true }));
      }
    });
    return out.join("");
  }

  // Floor path through every tile's foot: out along x, across lanes at the midpoint, on to the next.
  function path() {
    const pts = [[tiles[0].cx, tiles[0].cy]];
    for (let i = 1; i < tiles.length; i++) {
      const a = tiles[i - 1];
      const b = tiles[i];
      const mid = (a.cx + b.cx) / 2;
      if (a.cy !== b.cy) pts.push([mid, a.cy], [mid, b.cy]);
      pts.push([b.cx, b.cy]);
    }
    return L(k.onTop(pts, 0.2, P), { tone: "hi", flow: true });
  }

  function tile(t) {
    const out = [`<path class="iso-halo" d="${k.haloOf(t.plan, 0, 0.1, P)}" style="filter:blur(3px)"/>`];
    out.push(S(k.slabOf(t.plan, 0, t.h, P, 4, 0.8), { tone: "hi", crease: "lo", inner: L(k.sideSeam(t.plan, t.h - 3, P, 4), { tone: "faint" }) }));
    out.push(L(k.planOutline(k.insetPlan(t.plan, 2.4), t.h, P, 4), { tone: "faint" }));
    out.push(k.faceTextSvg(k.topMatrix([t.plan.x + 5, t.plan.y + 10], t.h, P, "x"), String(t.i + 1).padStart(2, "0"), { size: 5, tone: "lo" }));
    out.push(k.faceTextSvg(k.topMatrix([t.plan.x + 5, t.plan.y + 23], t.h, P, "x"), t.name.toUpperCase(), { size: 7, tone: "hi" }));
    return `<g class="uf-step" data-step="${t.i}">${out.join("")}</g>`;
  }

  // The pawn, built standing on the first tile and moved with translateAlong.
  function pawn() {
    const { cx, cy, h } = tiles[0];
    const z = h;
    return [
      S(k.cylinder(cx + 14, cy, 6, z, 2.4, P, 32, 0.4), { tone: "hi", lit: true }),
      S(k.cylinder(cx + 14, cy, 2.6, z + 2.4, 9, P, 20), { tone: "hi", lit: true, crease: "none" }),
      S(k.cylinder(cx + 14, cy, 4.4, z + 11.4, 4.4, P, 28, 1.2), { tone: "hi", lit: true }),
    ].join("");
  }

  const order = [...tiles].sort((a, b) => k.depthOf([a.cx, a.cy, 0], P) - k.depthOf([b.cx, b.cy, 0], P));
  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label: `${flow.title}: ${steps.map((s, i) => `${i + 1}. ${lanes[s.lane]}: ${s.name}, ${s.note}`).join(". ")}.`,
    body: [plate(), path(), ...order.map(tile), `<g data-part="pawn">${pawn()}</g>`],
  });

  const live = `
const P = ${JSON.stringify(P)};
const LANES = ${JSON.stringify(lanes)};
const STEPS = ${JSON.stringify(tiles.map(({ name, note, lane, cx, cy, h }) => ({ name, note, lane, cx, cy, h })))};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const readout = document.querySelector("[data-readout]");
const note = document.querySelector("[data-note]");
const pawn = svg.querySelector('[data-part="pawn"]');
const tiles = [...svg.querySelectorAll(".uf-step")].sort((a, b) => a.dataset.step - b.dataset.step);
const still = matchMedia("(prefers-reduced-motion: reduce)");
const HOP = 0.7, DWELL = 2.2, END = 3.2;
let step = 0, from = 0, t = 1, wait = 0, frame = 0, last = 0, visible = false, idle = 0, touring = !still.matches;
const offset = (i) => [STEPS[i].cx - STEPS[0].cx, STEPS[i].cy - STEPS[0].cy, STEPS[i].h - STEPS[0].h];
const ease = (x) => x * x * (3 - 2 * x);
function show() {
  tiles.forEach((el, i) => {
    el.classList.toggle("uf-later", i > step);
    el.querySelector(".iso-solid").toggleAttribute("data-lit", i === step);
  });
  const s = STEPS[step];
  readout.textContent = String(step + 1).padStart(2, "0") + " / " + String(STEPS.length).padStart(2, "0") + " · " + LANES[s.lane].toLowerCase();
  note.innerHTML = "<b>" + s.name + "</b> · " + s.note;
  stage.setAttribute("aria-valuenow", step + 1);
  stage.setAttribute("aria-valuetext", "Step " + (step + 1) + " of " + STEPS.length + ", " + LANES[s.lane] + ": " + s.name + ". " + s.note);
}
function place() {
  const a = offset(from), b = offset(step), e = ease(t);
  const hop = still.matches || from === step ? 0 : Math.sin(Math.PI * t) * 14;
  pawn.setAttribute("transform", translateAlong(P, [a[0] + (b[0] - a[0]) * e, a[1] + (b[1] - a[1]) * e, a[2] + (b[2] - a[2]) * e + hop]));
}
function go(i) { from = step; step = (i + STEPS.length) % STEPS.length; t = still.matches ? 1 : 0; wait = 0; show(); run(); }
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  if (t < 1) t = Math.min(1, t + dt / HOP);
  else if (touring) { wait += dt; if (wait > (step === STEPS.length - 1 ? END : DWELL)) go(step + 1); }
  place();
  frame = visible && (t < 1 || touring) ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const interact = () => { touring = false; clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; run(); }, 4200); };
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
svg.addEventListener("click", (event) => {
  const el = event.target.closest("[data-step]");
  if (!el) return;
  interact(); go(Number(el.dataset.step));
});
stage.addEventListener("keydown", (event) => {
  const n = Number(event.key);
  if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); interact(); go(step + 1); }
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); interact(); go(step - 1); }
  else if (event.key === "Home") { event.preventDefault(); interact(); go(0); }
  else if (event.key === "End") { event.preventDefault(); interact(); go(STEPS.length - 1); }
  else if (n >= 1 && n <= STEPS.length) { event.preventDefault(); interact(); go(n - 1); }
});
show();
place();
`;

  const css = `.uf-step{cursor:pointer}.uf-step .iso-face-text{transition:opacity .4s}.uf-step.uf-later .iso-face-text{opacity:.3}.uf-note{margin:10px auto 0;max-width:46ch;min-height:3.2em;text-align:center;color:var(--anatomy-text);font-size:13.5px;line-height:1.5}.uf-note b{color:var(--anatomy-strong);font-weight:600}`;

  const body = k.plateHtml({
    fig: "Fig U",
    title: "User flow",
    hint: "Click a step, or use ← →",
    readout: `01 / ${String(steps.length).padStart(2, "0")} · ${lanes[steps[0].lane].toLowerCase()}`,
    keys: [
      { mark: "lit", label: "Where the user is now" },
      { mark: "raised", label: "Each step sits one level higher: the journey climbs left to right" },
      { mark: "dotted", label: "Lanes: who acts at that step" },
    ],
    caption: flow.caption,
    body: `<style>${css}</style><div class="iso-stage" tabindex="0" role="slider" aria-label="${flow.title}: arrow keys move between steps" aria-valuemin="1" aria-valuemax="${steps.length}">${svg}</div><p class="uf-note" data-note aria-hidden="true"></p>`,
  });

  const out = join(HERE, "..", "..", "public", "figures", `${slug}-flow.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, k.pageHtml({ title: flow.title, theme, body, script: kitScript() + live + frameScript() }));
  console.log("wrote", out, `${steps.length} steps, ${lanes.length} lanes, top ${top}`);
}

for (const [slug, flow] of Object.entries(FLOWS)) if (!only.length || only.includes(slug)) build(slug, flow);
