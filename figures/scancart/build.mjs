// ScanCart scan bench: seven probe heads on a gantry test one listing tray;
// a dial gauge swings to the Trust Score only when the slowest probe lifts.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../kit/iso-kit.mjs";
import { kitScript } from "../kit/inline.mjs";
import { frameScript } from "../frame.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const theme = process.argv.includes("--dark") ? "dark" : "light";
const OUT = process.argv.find((a) => a.startsWith("--out="))?.slice(6) ?? join(HERE, "..", "..", "public", "figures", "scancart.html");

// ── Truth: utils/trustScore.js FUSION_WEIGHTS + orchestrator.js order ──
// Durations and per-check scores are one example scan (each agent has a 10 s timeout).
const CHECKS = [
  { key: "review", name: "Reviews", weight: 0.2, score: 72, secs: 2.6 },
  { key: "rating", name: "Ratings", weight: 0.1, score: 60, secs: 1.4 },
  { key: "quality", name: "Quality", weight: 0.1, score: 68, secs: 2.1 },
  { key: "alternatives", name: "Alternatives", weight: 0, score: null, secs: 3.0 },
  { key: "seller", name: "Seller", weight: 0.25, score: 55, secs: 3.4 },
  { key: "price", name: "Price", weight: 0.15, score: 62, secs: 1.8 },
  { key: "compliance", name: "Compliance", weight: 0.2, score: 75, secs: 1.5, after: ["seller", "price"] },
];

const WIDTH = 600;
const HEIGHT = 380;

const PLATE = { x: -158, y: -58, w: 340, d: 116, r: 8 };
const PLATE_H = 12;
const FOOT_H = 5;

const TRAY = { x: -116, y: -15, w: 204, d: 30, r: 3 };
const TRAY_Z = 5; // on two rails 5 tall
const TRAY_H = 6;
const TRAY_TOP = TRAY_Z + TRAY_H;

const BAR = { x: -142, y: -8, w: 262, d: 16, r: 2 };
const BAR_Z = 104;
const BAR_H = 9;
const HOUSE_Z = 86;
const HOUSE_D = 14;
const REST_GAP = 24; // tip clearance above the pad when lifted
const TIP_H = 2.4;
const PAD_H = 0.8;
const PRESS = TRAY_TOP + PAD_H; // tip rests on the pad

// Housings sized by weight, laid along x with a 4-unit gap.
let cursor = TRAY.x + 6;
const PROBES = CHECKS.map((c) => {
  const w = Math.round(8 + c.weight * 64);
  const p = { ...c, x: cursor, w, cx: cursor + w / 2 };
  cursor += w + 4.6;
  return p;
});

const POSTS = [BAR.x + 7, BAR.x + BAR.w - 7];
const DIAL = [154, 26];
const DIAL_R = 18;
const DIAL_Z = 22;
const DIAL_H = 8;
const DIAL_TOP = DIAL_Z + DIAL_H;
const ARC_FROM = (-150 * Math.PI) / 180;
const ARC_SPAN = (300 * Math.PI) / 180;

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0), ...k.boxCorners(BAR, BAR_Z, BAR_Z + BAR_H), [DIAL[0] + DIAL_R, DIAL[1] + DIAL_R, DIAL_TOP]],
  WIDTH,
  HEIGHT,
  { pad: 30, azimuth: 38 },
);

const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

function plate() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7, -PLATE_H - FOOT_H, 1.6, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.4, -PLATE_H - FOOT_H + 1.6, FOOT_H - 1.6, P, 28), { tone: "mid" }));
  }
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.6), { tone: "mid", inner: L(k.sideSeam(PLATE, -6, P, 8), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  const screws = k.corners(PLATE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5 }));
  // ruler strip along the front edge, 0..10 s at 20 units per second
  const strip = { x: TRAY.x, y: PLATE.y + PLATE.d - 16, w: 204, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 2, strip.x + strip.w - 2, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 1, strip.y + 3.5, 0.6]), at([strip.x + strip.w - 1, strip.y + 3.5, 0.6])], { size: 0.45 }));
  // label plate, front left
  const label = { x: PLATE.x + 14, y: PLATE.y + PLATE.d - 30, w: 26, d: 16, r: 1.4 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P), { tone: "faint" }));
  [[4, 18], [4, 14], [4, 20]].forEach(([dx, len], i) => out.push(L(k.lineOnTop([label.x + dx, label.y + 4.5 + i * 3.5], [label.x + dx + len, label.y + 4.5 + i * 3.5], 0.8, P), { tone: "lo", free: true })));
  return out.join("");
}

function floorCable() {
  // cable from the right post foot to the dial stand, lying on the plate
  const from = at([POSTS[1] + 5, 6, 0]);
  const to = at([DIAL[0] - 1, DIAL[1] - 10, 0]);
  const via = [at([POSTS[1] + 5, 24, 0])];
  return k.wireSvg(from, to, { via, tone: "lo", size: 0.9 });
}

function post(x) {
  const out = [];
  const foot = { x: x - 9, y: -11, w: 18, d: 22, r: 2 };
  out.push(S(k.slabOf(foot, 0, 4, P, 4, 0.6), { tone: "mid" }));
  out.push(D(k.corners(foot, 3).map(([px, py]) => at([px, py, 4])), { size: 0.45 }));
  out.push(S(k.slabOf({ x: x - 4.5, y: -5.5, w: 9, d: 11, r: 1.5 }, 4, BAR_Z - 4, P, 3, 0.4), { tone: "mid", inner: L([30, 60].map((z) => k.sideSeam({ x: x - 4.5, y: -5.5, w: 9, d: 11, r: 1.5 }, z, P, 3)).join(""), { tone: "faint" }) }));
  return out.join("");
}

function rails() {
  const out = [];
  for (const y of [-11, 6]) {
    const rail = { x: TRAY.x + 6, y, w: TRAY.w - 12, d: 5, r: 1 };
    out.push(S(k.slabOf(rail, 0, TRAY_Z, P, 3, 0.4), { tone: "mid" }));
    out.push(D([rail.x + 4, rail.x + rail.w - 4].map((x) => at([x, y + 2.5, TRAY_Z])), { size: 0.4 }));
  }
  return out.join("");
}

function tray() {
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(TRAY, 3), TRAY_Z, 0.1, P)}" style="filter:blur(4px)"/>`];
  out.push(S(k.slabOf(TRAY, TRAY_Z, TRAY_H, P, 5, 0.8), { tone: "hi", crease: "lo", inner: L(k.sideSeam(TRAY, TRAY_Z + 2, P, 5), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(TRAY, 2.4), TRAY_TOP, P), { tone: "faint" }));
  for (const p of PROBES) {
    out.push(L(k.ring(p.cx, 0, 5.2, TRAY_TOP, P, 28), { tone: "lo" }));
    out.push(S(k.cylinder(p.cx, 0, 4, TRAY_TOP, PAD_H, P, 28), { tone: "hi", crease: "lo" }));
  }
  out.push(D([[TRAY.x + 3.5, -11], [TRAY.x + 3.5, 11], [TRAY.x + TRAY.w - 3.5, -11], [TRAY.x + TRAY.w - 3.5, 11]].map(([x, y]) => at([x, y, TRAY_TOP])), { size: 0.45 }));
  return out.join("");
}

// A plunger built at its pressed position (tip on the pad); lifted with translateAlong.
function plunger(p) {
  const out = [];
  const top = HOUSE_Z + 2; // pressed: 2 into the housing; lifted: still under the bar top
  out.push(S(k.cylinder(p.cx, 0, 1.5, PRESS + TIP_H, top - PRESS - TIP_H, P, 16), { tone: "hi", crease: "none" }));
  out.push(S(k.cylinder(p.cx, 0, 3, PRESS, TIP_H, P, 24, 0.3), { tone: "hi", crease: "lo" }));
  return out.join("");
}

function housing(p) {
  const out = [];
  const plan = { x: p.x, y: -HOUSE_D / 2, w: p.w, d: HOUSE_D, r: 1.4 };
  out.push(S(k.cylinder(p.cx, 0, 3, HOUSE_Z - 4, 4, P, 24), { tone: "mid" })); // gland collar
  out.push(L(k.sideArc(p.cx, 0, 3, HOUSE_Z - 2, P, 16), { tone: "faint" }));
  out.push(S(k.slabOf(plan, HOUSE_Z, BAR_Z - HOUSE_Z, P, 3, 0.5), { tone: p.weight ? "mid" : "lo", inner: L(k.sideSeam(plan, HOUSE_Z + 6, P, 3), { tone: "faint" }) }));
  // weight scale on the front face: one tick per 5% of weight
  const n = Math.round(p.weight * 20);
  for (let i = 0; i < n; i++) {
    const x = p.x + 3 + i * ((p.w - 6) / Math.max(1, n - 1 || 1));
    out.push(L(k.segment([x, HOUSE_D / 2, HOUSE_Z + 6], [x, HOUSE_D / 2, HOUSE_Z + 10], P), { tone: "lo" }));
  }
  out.push(D([at([p.x + 2, HOUSE_D / 2, BAR_Z - 2.5]), at([p.x + p.w - 2, HOUSE_D / 2, BAR_Z - 2.5])], { size: 0.4 }));
  return out.join("");
}

function bar() {
  const out = [];
  out.push(S(k.slabOf(BAR, BAR_Z, BAR_H, P, 3, 0.6), { tone: "mid", inner: L(k.sideSeam(BAR, BAR_Z + 4.5, P, 3), { tone: "faint" }) }));
  out.push(L(k.planOutline(k.insetPlan(BAR, 3), BAR_Z + BAR_H, P, 3), { tone: "faint" }));
  out.push(D(POSTS.flatMap((x) => [at([x - 3, -4, BAR_Z + BAR_H]), at([x + 3, 4, BAR_Z + BAR_H])]), { size: 0.5 }));
  out.push(D(PROBES.map((p) => at([p.cx, 0, BAR_Z + BAR_H])), { size: 0.4, tone: "lo" }));
  return out.join("");
}

function dial() {
  const out = [];
  const [x, y] = DIAL;
  out.push(`<path class="iso-halo" d="${k.haloOf({ x: x - 14, y: y - 14, w: 28, d: 28, r: 14 }, 0, 0.1, P)}" style="filter:blur(3px)"/>`);
  out.push(S(k.cylinder(x, y, 12, 0, 3, P, 40, 0.5), { tone: "mid" }));
  out.push(L(k.ring(x, y, 9.5, 3, P, 40), { tone: "faint" }));
  out.push(S(k.cylinder(x, y, 3.2, 3, DIAL_Z - 3, P, 24), { tone: "mid", crease: "none", inner: L(k.sideArc(x, y, 3.2, 20, P, 12), { tone: "faint" }) }));
  out.push(S(k.cylinder(x, y, DIAL_R, DIAL_Z, DIAL_H, P, 64, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(x, y, DIAL_R, DIAL_TOP - 3, DIAL_TOP, 80, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(x, y, DIAL_R, DIAL_TOP - 3, P, 40), { tone: "faint" }));
  out.push(L(k.ring(x, y, DIAL_R - 2, DIAL_TOP, P, 64), { tone: "lo" }));
  const ticks = k.radialTicks(x, y, DIAL_R - 2.6, 50, 5, DIAL_TOP, [1.2, 2.6], P, ARC_FROM, ARC_SPAN);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  // the 50 mark (CAUTION threshold) drawn hi
  const a50 = ARC_FROM + 0.5 * ARC_SPAN;
  out.push(L(k.lineOnTop([x + Math.sin(a50) * (DIAL_R - 6.4), y - Math.cos(a50) * (DIAL_R - 6.4)], [x + Math.sin(a50) * (DIAL_R - 2.6), y - Math.cos(a50) * (DIAL_R - 2.6)], DIAL_TOP, P), { tone: "hi" }));
  out.push(k.faceTextSvg(k.topMatrix([x, y + 7.5], DIAL_TOP, P, "x"), "TRUST", { size: 2.2, tone: "lo", anchor: "middle" }));
  out.push(L(k.ring(x, y, 1.6, DIAL_TOP, P, 16), { tone: "mid" }));
  // crown on the +x side
  out.push(S(k.slabOf({ x: x + DIAL_R - 1, y: y - 2.4, w: 5, d: 4.8, r: 1.2 }, DIAL_Z + 1.5, 5, P, 3), { tone: "mid" }));
  out.push(S(k.slabOf({ x: x + DIAL_R + 3.6, y: y - 3.2, w: 2.6, d: 6.4, r: 1.2 }, DIAL_Z + 0.8, 6.4, P, 3), { tone: "mid" }));
  return out.join("");
}

const needleAt = (score) => {
  const angle = ARC_FROM + (score / 100) * ARC_SPAN;
  const [x, y] = DIAL;
  return k.lineOnTop([x - Math.sin(angle) * 3.2, y + Math.cos(angle) * 3.2], [x + Math.sin(angle) * (DIAL_R - 4), y - Math.cos(angle) * (DIAL_R - 4)], DIAL_TOP + 0.2, P);
};

// Painter's order: plate, floor cable, far post, rails, tray, plungers (far to near), housings, near post, bar, dial.
const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A scan bench. A listing tray with seven test pads sits under a gantry carrying seven probe heads, each as wide as its check's weight in the Trust Score. Six probes drop together; the compliance probe drops after the seller and price probes lift. A dial gauge swings to the Trust Score only after the slowest probe lifts.",
  body: [
    plate(),
    floorCable(),
    post(POSTS[0]),
    rails(),
    tray(),
    ...PROBES.map((p) => `<g data-probe="${p.key}" class="sc-probe"><g data-part="rod" transform="${k.translateAlong(P, [0, 0, REST_GAP])}">${plunger(p)}</g>${housing(p)}</g>`),
    post(POSTS[1]),
    bar(),
    dial(),
    `<path data-part="needle" class="iso-line" data-tone="lit" data-free="start" d="${needleAt(0)}" style="stroke-width:1.1"/>`,
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const CHECKS = ${JSON.stringify(PROBES.map(({ key, name, weight, score, secs, after }) => ({ key, name, weight, score, secs, after: after ?? null })))};
const DIAL = ${JSON.stringify(DIAL)}, DIAL_R = ${DIAL_R}, DIAL_TOP = ${DIAL_TOP}, ARC_FROM = ${ARC_FROM}, ARC_SPAN = ${ARC_SPAN}, GAP = ${REST_GAP};
const needleAt = ${needleAt.toString().replace("k.lineOnTop", "lineOnTop")};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const readout = document.querySelector("[data-readout]");
const needle = svg.querySelector('[data-part="needle"]');
const still = matchMedia("(prefers-reduced-motion: reduce)");
const probes = CHECKS.map((c) => ({ ...c, el: svg.querySelector('[data-probe="' + c.key + '"]'), rod: svg.querySelector('[data-probe="' + c.key + '"] [data-part="rod"]'), lift: GAP, rate: 0 }));
const failed = new Set();
// Schedule: six start at 0; compliance starts when every check it waits on has finished (failed ones count as finished).
function schedule() {
  const end = {};
  for (const p of probes) if (!p.after) { p.start = 0; p.end = failed.has(p.key) ? 0 : p.secs; end[p.key] = p.end; }
  for (const p of probes) if (p.after) { p.start = Math.max(...p.after.map((k) => end[k])); p.end = failed.has(p.key) ? p.start : p.start + p.secs; end[p.key] = p.end; }
  return Math.max(...probes.map((p) => p.end));
}
// utils/trustScore.js: drop unavailable checks, re-normalise the remaining weights.
function trust() {
  const used = probes.filter((p) => p.weight > 0 && !failed.has(p.key));
  if (!used.length) return null;
  const total = used.reduce((s, p) => s + p.weight, 0);
  return Math.max(0, Math.min(100, Math.round(used.reduce((s, p) => s + p.score * p.weight, 0) / total)));
}
const level = (s) => s >= 90 ? "highly authentic" : s >= 70 ? "authentic" : s >= 50 ? "caution" : s >= 30 ? "suspicious" : "avoid";
let total = schedule(), score = trust(), clock = 0, shown = 0, needleRate = 0, frame = 0, last = 0, visible = false, round = 0, idle = 0, touring = !still.matches;
const TOUR_FAIL = [null, "review", null, "seller"];
function restart() { total = schedule(); score = trust(); clock = 0; }
function setFail(key, on) { on ? failed.add(key) : failed.delete(key); for (const p of probes) p.el.classList.toggle("sc-fail", failed.has(p.key)); describe(); }
function describe() {
  const ran = 7 - failed.size;
  stage.setAttribute("aria-valuetext", ran + " of 7 checks" + (score == null ? "" : ", Trust Score " + score + ", " + level(score)) + (failed.size ? ", failed: " + [...failed].join(", ") : ""));
}
function draw() {
  for (const p of probes) p.rod.setAttribute("transform", translateAlong(P, [0, 0, p.lift]));
  needle.setAttribute("d", needleAt(shown));
  const ran = 7 - failed.size;
  const running = probes.filter((p) => !failed.has(p.key) && clock >= p.start && clock < p.end).length;
  const text = clock < total
    ? "scanning · " + running + " running · " + clock.toFixed(1) + " s"
    : ran + " of 7 checks · trust " + (score == null ? "—" : score + " " + level(score)) + " · " + total.toFixed(1) + " s";
  if (readout.textContent !== text) readout.textContent = text;
}
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
  last = now;
  const calm = still.matches;
  clock += dt;
  if (touring && clock > total + 3.2) { round++; for (const p of probes) setFail(p.key, false); const f = TOUR_FAIL[round % TOUR_FAIL.length]; if (f) setFail(f, true); restart(); }
  for (const p of probes) {
    const down = !failed.has(p.key) && clock >= p.start && clock < p.end;
    const want = down ? 0 : GAP;
    if (calm) { p.lift = want; p.rate = 0; continue; }
    for (let i = 0; i < 4; i++) { p.rate += ((want - p.lift) * 300 - p.rate * 30) * dt / 4; p.lift += p.rate * dt / 4; }
    if (Math.abs(want - p.lift) < 0.01 && Math.abs(p.rate) < 0.01) { p.lift = want; p.rate = 0; }
  }
  const aim = clock < total ? 0 : (score ?? 0);
  if (calm) { shown = aim; needleRate = 0; } else {
    for (let i = 0; i < 4; i++) { needleRate += ((aim - shown) * 60 - needleRate * 11) * dt / 4; shown += needleRate * dt / 4; }
    if (Math.abs(aim - shown) < 0.01 && Math.abs(needleRate) < 0.01) { shown = aim; needleRate = 0; }
  }
  draw();
  const settled = !touring && clock >= total && shown === aim && probes.every((p) => p.rate === 0);
  frame = visible && !settled ? requestAnimationFrame(tick) : 0;
}
const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
const interact = () => { touring = false; clearTimeout(idle); idle = setTimeout(() => { touring = !still.matches; run(); }, 3600); };
new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
svg.addEventListener("click", (event) => {
  const el = event.target.closest("[data-probe]");
  if (!el) return;
  interact();
  setFail(el.dataset.probe, !failed.has(el.dataset.probe));
  restart(); run();
});
stage.addEventListener("keydown", (event) => {
  const n = Number(event.key);
  if (n >= 1 && n <= 7) { event.preventDefault(); interact(); const key = probes[n - 1].key; setFail(key, !failed.has(key)); restart(); run(); }
  else if (event.key === " " || event.key === "Enter") { event.preventDefault(); interact(); restart(); run(); }
  else if (event.key === "Escape") { event.preventDefault(); interact(); for (const p of probes) setFail(p.key, false); restart(); run(); }
});
if (still.matches) { clock = total; shown = score ?? 0; }
describe();
draw();
`;

const css = `.sc-probe{cursor:pointer}.sc-probe>*{transition:opacity .4s}.sc-probe.sc-fail>*{opacity:.32}`;

const body = k.plateHtml({
  fig: "Fig A",
  title: "Scan bench",
  hint: "Click a probe to fail its check",
  readout: "scanning · 6 running · 0.0 s",
  keys: [
    { mark: "lit", label: "Needle: the Trust Score, set only after the slowest probe lifts" },
    { mark: "raised", label: "Probe width = the check's weight in the score" },
    { mark: "dim", label: "A failed check stays up and drops out of the score" },
  ],
  caption:
    "Seven probe heads, one per check. Six drop at once (reviews, ratings, quality, alternatives, seller, price); compliance drops after seller and price lift. Weights are ScanCart's own: seller 25%, reviews 20%, compliance 20%, price 15%, ratings 10%, quality 10%, alternatives 0%. A failed check is left out and the other weights are re-normalised. Timings and per-check scores are one example scan; each agent has a 10 s timeout.",
  body: `<style>${css}</style><div class="iso-stage" tabindex="0" role="slider" aria-label="Scan bench: keys 1 to 7 fail or restore a check, Space re-runs the scan, Escape restores all" aria-valuemin="0" aria-valuemax="100">${svg}</div>`,
});

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, k.pageHtml({ title: "ScanCart scan bench", theme, body, script: kitScript() + live + frameScript() }));
console.log("wrote", OUT, "probes", PROBES.map((p) => `${p.key}:${p.w}`).join(" "));
