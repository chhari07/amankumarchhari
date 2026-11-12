// Hand-drawn style line illustrations. Black strokes; the offset shape fills with --c on hover
// (see .ill in globals.css). Drawn for this site, no external assets.

export type IllName = "listen" | "build" | "guard" | "brand" | "tell" | "design" | "creative" | "ai" | "deploy" | "clock" | "usb" | "pocket" | "calendar" | "reply" | "topbar" | "notch" | "snap";

const ICONS: Record<IllName, { fill: string; stroke: string }> = {
  listen: {
    fill: `<path d="M22 22h56a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H46L32 76V64H22a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z"/>`,
    stroke: `<path d="M22 22h56a6 6 0 0 1 6 6v30a6 6 0 0 1-6 6H46L32 76V64H22a6 6 0 0 1-6-6V28a6 6 0 0 1 6-6z"/><path d="M28 34h40M28 43h30M28 52h18"/>`,
  },
  build: {
    fill: `<rect x="18" y="20" width="64" height="44" rx="5"/>`,
    stroke: `<rect x="18" y="20" width="64" height="44" rx="5"/><path d="M8 74h84l-6 8H14z"/><path d="M40 33l-9 9 9 9M60 33l9 9-9 9M54 29l-8 26"/>`,
  },
  guard: {
    fill: `<path d="M50 12l30 10v22c0 21-13 35-30 42-17-7-30-21-30-42V22z"/>`,
    stroke: `<path d="M50 12l30 10v22c0 21-13 35-30 42-17-7-30-21-30-42V22z"/><path d="M36 48l10 10 19-21"/>`,
  },
  brand: {
    fill: `<rect x="24" y="12" width="52" height="72" rx="3"/>`,
    stroke: `<rect x="24" y="12" width="52" height="72" rx="3"/><path d="M50.0 25.0 L53.8 34.7 L64.3 35.4 L56.2 42.0 L58.8 52.1 L50.0 46.5 L41.2 52.1 L43.8 42.0 L35.7 35.4 L46.2 34.7Z"/><path d="M34 66h32M34 74h20"/>`,
  },
  tell: {
    fill: `<rect x="10" y="24" width="60" height="46" rx="6"/>`,
    stroke: `<rect x="10" y="24" width="60" height="46" rx="6"/><path d="M32 36l20 11-20 11z"/><path d="M78 37q6 10 0 20M86 30q11 17 0 34"/>`,
  },
  design: {
    fill: `<path d="M50 14l15 31-15 37-15-37z"/>`,
    stroke: `<path d="M24 30L10 50l14 20M76 30l14 20-14 20"/><path d="M50 14l15 31-15 37-15-37z"/><circle cx="50" cy="46" r="3.5"/><path d="M50 50v18"/>`,
  },
  creative: {
    fill: `<path d="M50 16a23 23 0 0 0-14 41c3 3 4 6 4 10h20c0-4 1-7 4-10a23 23 0 0 0-14-41z"/>`,
    stroke: `<path d="M50 16a23 23 0 0 0-14 41c3 3 4 6 4 10h20c0-4 1-7 4-10a23 23 0 0 0-14-41z"/><path d="M41 75h18M43 83h14"/><path d="M14 22l7 5M86 22l-7 5M8 44h8M92 44h-8"/><path d="M45 48l5-9 5 9"/>`,
  },
  ai: {
    fill: `<rect x="22" y="32" width="56" height="44" rx="10"/>`,
    stroke: `<rect x="22" y="32" width="56" height="44" rx="10"/><path d="M50 32V20"/><circle cx="50" cy="15" r="4.5"/><circle cx="39" cy="51" r="5"/><circle cx="61" cy="51" r="5"/><path d="M40 64h20M16 48v14M84 48v14"/>`,
  },
  deploy: {
    fill: `<rect x="28" y="38" width="44" height="30" rx="6"/>`,
    stroke: `<rect x="28" y="38" width="44" height="30" rx="6"/><path d="M41 38V22M59 38V22"/><path d="M50 68v6q0 10 12 10h26"/><path d="M14 30l6 4M12 46h7"/>`,
  },
  clock: {
    fill: `<rect x="16" y="22" width="68" height="56" rx="8"/>`,
    stroke: `<rect x="16" y="22" width="68" height="56" rx="8"/><path d="M16 50h68"/><path d="M27 34h14l-8 32M58 34h14v32M54 66h22"/><path d="M30 78v8M70 78v8"/>`,
  },
  usb: {
    fill: `<rect x="34" y="40" width="32" height="44" rx="6"/>`,
    stroke: `<rect x="34" y="40" width="32" height="44" rx="6"/><rect x="40" y="16" width="20" height="24" rx="4"/><path d="M46 24h8M46 31h8"/><path d="M50 84v8"/><path d="M14 30l8 6M86 30l-8 6M10 52h9M90 52h-9"/>`,
  },
  pocket: {
    fill: `<rect x="30" y="12" width="40" height="76" rx="8"/>`,
    stroke: `<rect x="30" y="12" width="40" height="76" rx="8"/><path d="M44 20h12"/><rect x="38" y="34" width="24" height="24" rx="2"/><path d="M42 38h6v6h-6zM52 48h6v6h-6zM52 38h6M42 54h6"/><circle cx="50" cy="78" r="3"/><path d="M80 30q8 8 0 16M86 24q14 14 0 28"/>`,
  },
  calendar: {
    fill: `<rect x="14" y="20" width="72" height="62" rx="6"/>`,
    stroke: `<rect x="14" y="20" width="72" height="62" rx="6"/><path d="M14 34h72M30 12v14M70 12v14"/><path d="M24 44h8v8h-8zM38 44h8v8h-8zM52 44h8v8h-8zM66 44h8v8h-8zM24 58h8v8h-8zM38 58h8v8h-8zM52 58h8v8h-8z"/>`,
  },
  reply: {
    fill: `<path d="M14 24h56a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H40L26 74V62H14a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6z"/>`,
    stroke: `<path d="M14 24h56a6 6 0 0 1 6 6v26a6 6 0 0 1-6 6H40L26 74V62H14a6 6 0 0 1-6-6V30a6 6 0 0 1 6-6z"/><path d="M22 36h40M22 46h26"/><path d="M92 58l-10-8v5c-12 0-18 6-20 16 5-6 10-8 20-8v5z"/>`,
  },
  notch: {
    fill: `<rect x="10" y="18" width="80" height="64" rx="6"/>`,
    stroke: `<rect x="10" y="18" width="80" height="64" rx="6"/><path d="M32 18v8a8 8 0 0 0 8 8h20a8 8 0 0 0 8-8v-8"/><path d="M42 26h6M56 24v4M60 22v8M64 24v4"/><rect x="22" y="50" width="56" height="20" rx="5"/><path d="M30 57h28M30 63h18"/>`,
  },
  snap: {
    fill: `<rect x="12" y="20" width="36" height="60" rx="5"/>`,
    stroke: `<rect x="12" y="20" width="36" height="60" rx="5"/><rect x="54" y="20" width="34" height="27" rx="5"/><rect x="54" y="53" width="34" height="27" rx="5"/><path d="M20 32h18M20 40h12"/>`,
  },
  topbar: {
    fill: `<rect x="10" y="18" width="80" height="64" rx="6"/>`,
    stroke: `<rect x="10" y="18" width="80" height="64" rx="6"/><path d="M10 30h80"/><circle cx="18" cy="24" r="2"/><path d="M70 24h14"/><rect x="26" y="64" width="48" height="10" rx="5"/><path d="M34 69h0M44 69h0M54 69h0M64 69h0"/>`,
  },
};

export const stepIcons: IllName[] = ["listen", "build", "guard", "brand", "tell"];
export const roleIcons: Record<string, IllName> = {"Design Engineer": "design", "Creative Technologist": "creative", "AI Product Engineer": "ai", "Forward Deployed Engineer": "deploy"};

export function Ill({ name, size = 72 }: { name: IllName; size?: number }) {
  const icon = ICONS[name];
  return (
    <svg className="ill" width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <g className="f" transform="translate(5 5)" dangerouslySetInnerHTML={{ __html: icon.fill }} />
      <g className="s" dangerouslySetInnerHTML={{ __html: icon.stroke }} />
    </svg>
  );
}
