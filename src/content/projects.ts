// One entry per case study. Each page renders two depths:
//   1. the 30-second block (summary, problem, highlights, links)
//   2. the deep section (architecture, decisions, failures, numbers)
// Anything marked TODO is evidence you still need to add.

export type Decision = { chose: string; rejected: string; why: string };
export type Metric = { label: string; value: string; note?: string };

// Diagrams rendered on each case study's "diagrams" tab.
export type NodeKind = "actor" | "client" | "service" | "ai" | "store" | "external" | "gate";
export type DiagramNode = { label: string; note?: string; kind?: NodeKind; branch?: string };
export type DiagramStep = DiagramNode | { parallel: DiagramNode[]; label?: string; note?: string };
// Illustrated system design: boxes placed on a grid (col, row), grouped into zones, joined by edges.
export type SystemNode = { id: string; label: string; sub?: string; kind: NodeKind; col: number; row: number };
export type SystemEdge = {
  from: string;
  to: string;
  label?: string; // "\n" splits into two lines
  dashed?: boolean; // logical / async link
  both?: boolean; // arrow at both ends
  route?: "vh"; // leave vertically, arrive horizontally (default: horizontal first)
  bend?: number; // shift the vertical segment by this many px
  labelAt?: number; // where the label sits along a bent edge, 0–1 (default 0.5)
};
export type SystemZone = { label: string; cols: [number, number]; rows: [number, number] };
export type SystemDesign = { caption?: string; zones: SystemZone[]; nodes: SystemNode[]; edges: SystemEdge[] };

export type Diagram =
  | { type: "flow"; title: string; caption?: string; steps: DiagramStep[] }
  | { type: "states"; title: string; caption?: string; states: string[]; exits?: { state: string; note: string }[] };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role: string;
  year: string;
  stack: string[];
  cover?: string; // path under /public, e.g. "/projects/closeby.png"
  links: { label: string; href: string }[];
  problem: string;
  highlights: string[];
  architecture: { summary: string; flow: string[] };
  decisions: Decision[];
  failures: { what: string; handling: string }[];
  metrics: Metric[];
  next: string[];
  system: SystemDesign;
  diagrams: Diagram[];
};

export const projects: Project[] = [
  {
    slug: "stack",
    name: "Stack",
    tagline: "A local-first reading app that makes you remember what you read",
    role: "Solo: product, design, Android app, sync, AI layer",
    year: "2026",
    stack: ["Next.js 16", "TypeScript", "Capacitor 8", "IndexedDB", "Supabase", "Deno Edge Functions", "Sarvam · Gemini · Groq · OpenAI · Claude", "pdf.js"],
    cover: "/projects/stack-site.png",
    links: [
      { label: "GitHub", href: "https://github.com/chhari07/stackforge" },
      // { label: "Play Store", href: "TODO" },
    ],
    problem:
      "People read a lot of articles, PDFs and news every day and forget almost all of it a week later. Read-later apps save links but never bring them back. Stack turns any line you select into a note that remembers where it came from, then shows your old highlights again on a spaced schedule, so what you read stays with you.",
    highlights: [
      "Local-first: everything lives in IndexedDB and works offline with no account; sign-in only adds sync across devices.",
      "Sync with a server-numbered seq per write: upload local changes, pull rows newer than the last one seen; unsynced local edits win.",
      "Stack AI runs in one Supabase Edge Function: checks sign-in, enforces a per-person daily limit, then falls back across five engines (Sarvam → Gemini → Groq → OpenAI → Claude).",
      "Daily review: 3 old highlights a day, pushed out 3 days, then ~2.5× longer each time you remember them.",
      "One Next.js codebase ships the website and a native Android app (Capacitor), with Java plugins for music, sharing and PDF discovery.",
    ],
    architecture: {
      summary:
        "A Next.js 16 app exported as a static bundle and wrapped in Capacitor for Android. The phone has no server of its own: data lives on the device, sync and AI go to Supabase, and no API key ever ships in the app.",
      flow: [
        "Reader saves an article, PDF or shared link (Share to Stack from any app)",
        "Reader mode cleans the page (Readability + DOMPurify); selecting text makes a highlight or note",
        "Every write goes to IndexedDB and is marked as changed, so it works offline",
        "When signed in, changes upload to the Supabase items table; rows from other devices download by seq",
        "Optional Stack AI calls the Edge Function: sign-in check → daily limit → engine fallback chain → streamed answer with page and note links",
        "Each morning the review picks 3 due highlights and reschedules them by how well you remembered",
      ],
    },
    decisions: [
      {
        chose: "Local-first IndexedDB, with sync as an optional extra",
        rejected: "Cloud database as the source of truth with a required account",
        why: "Reading happens on trains and in bad signal; the app has to open instantly and work with no network and no sign-up.",
      },
      {
        chose: "Server-assigned seq numbers and 'unsynced local edit wins'",
        rejected: "Timestamp-based last-write-wins",
        why: "Phone clocks drift; a server counter gives every device a clean 'give me everything after N' cursor, and nothing you just typed is overwritten.",
      },
      {
        chose: "AI only in a Supabase Edge Function with an engine fallback chain",
        rejected: "Calling one provider straight from the app",
        why: "Keys never ship in the APK, limits are enforced server-side, and free tiers can be stacked so one provider being down or out of credit doesn't break the feature.",
      },
      {
        chose: "One Next.js codebase exported to Capacitor",
        rejected: "A separate React Native app",
        why: "One solo developer, one codebase for web and Android; native Java plugins only where the web can't reach (music, share sheet, files).",
      },
    ],
    failures: [
      { what: "No network, or the user never signs in", handling: "Everything reads and writes IndexedDB; changes queue and upload on the next sync." },
      { what: "The same item edited on two devices", handling: "Local edits not yet uploaded win; everything else follows the server's seq order." },
      { what: "An AI engine is down, busy or out of credit", handling: "The function moves to the next engine; the app gets a reset event and drops the partial text." },
      { what: "A person hits the daily AI limit", handling: "The function refuses with a clear 429 message; the rest of the app keeps working." },
      { what: "A feed URL points at a private or local address", handling: "The website's feed proxy resolves the host and re-checks every redirect; private IPs are refused." },
    ],
    metrics: [
      { label: "AI engines in the fallback chain", value: "5" },
      { label: "News topics", value: "12" },
      { label: "Highlights reviewed per day", value: "3" },
      { label: "Daily AI requests per person", value: "50", note: "configurable" },
    ],
    next: ["Play Store release", "Grow testers from the soft launch", "iOS build (Capacitor project already in place)"],
    system: {
      caption: "No server on the phone: data lives on the device; sync and AI go to Supabase; no key ships in the app.",
      zones: [
        { label: "android · capacitor 8", cols: [1, 1], rows: [0, 2] },
        { label: "supabase", cols: [2, 2], rows: [0, 2] },
        { label: "ai engines", cols: [3, 3], rows: [0, 0] },
      ],
      nodes: [
        { id: "reader", label: "Reader", sub: "save · highlight · review · focus", kind: "actor", col: 0, row: 1 },
        { id: "sources", label: "News + web", sub: "BBC · The Hindu · HN · any RSS feed", kind: "external", col: 0, row: 2 },
        { id: "native", label: "Native plugins", sub: "Media3 music · share card · PDF discovery", kind: "service", col: 1, row: 0 },
        { id: "app", label: "Stack app", sub: "Next.js 16 static export · reader mode · pdf.js", kind: "client", col: 1, row: 1 },
        { id: "idb", label: "IndexedDB", sub: "local-first · every write tracked for sync", kind: "store", col: 1, row: 2 },
        { id: "ai", label: "AI function", sub: "sign-in check · daily limit · streams NDJSON", kind: "gate", col: 2, row: 0 },
        { id: "db", label: "Postgres", sub: "items table · server seq · RLS · PDF storage", kind: "store", col: 2, row: 1 },
        { id: "auth", label: "Supabase Auth", sub: "Google · email", kind: "external", col: 2, row: 2 },
        { id: "llm", label: "Fallback chain", sub: "Sarvam → Gemini → Groq → OpenAI → Claude", kind: "ai", col: 3, row: 0 },
      ],
      edges: [
        { from: "reader", to: "app", label: "uses" },
        { from: "app", to: "sources", label: "native\nHTTP" },
        { from: "app", to: "native", label: "plugins" },
        { from: "app", to: "idb", label: "every write" },
        { from: "app", to: "ai", label: "summarize\n· ask", bend: -12 },
        { from: "ai", to: "llm", label: "fallback" },
        { from: "idb", to: "db", label: "upload ·\npull > seq", both: true, bend: 12 },
        { from: "db", to: "auth", label: "user_id", dashed: true },
      ],
    },
    diagrams: [
      {
        type: "flow",
        title: "Save → Highlight → Remember",
        caption: "The product loop every screen serves.",
        steps: [
          { label: "save from anywhere", parallel: [
            { label: "Article / news", kind: "external", note: "reader mode: Readability + DOMPurify" },
            { label: "PDF / EPUB", kind: "client", note: "pdf.js reader · phone files · Telegram import" },
            { label: "Share to Stack", kind: "service", note: "from Chrome, WhatsApp, YouTube, Files" },
          ] },
          { label: "Select a line", kind: "actor", note: "Highlight · + Note · Share" },
          { label: "Note saved with its source", kind: "store", note: "painted back with the CSS Custom Highlight API" },
          { label: "Daily review", kind: "client", note: "3 due highlights each morning, also in the notification" },
          { label: "Export or search", kind: "service", note: "one search across everything · Markdown export to Obsidian / Notion" },
        ],
      },
      {
        type: "flow",
        title: "Stack AI request",
        caption: "Every AI feature goes through one Edge Function; the key never leaves the server.",
        steps: [
          { label: "Reader taps Summarize, Ask your Stack or Ask this PDF", kind: "actor" },
          { label: "Consent prompt in the app", kind: "gate", branch: "AI switched off in Settings → the buttons are hidden" },
          { label: "Verify Supabase sign-in", kind: "gate", branch: "not signed in → sign-in prompt" },
          { label: "Daily limit (ai_take in Postgres)", kind: "gate", branch: "over 50 today → 429, resets at midnight UTC" },
          { label: "engines, tried in order", parallel: [
            { label: "Sarvam AI", kind: "ai" },
            { label: "Google Gemini", kind: "ai", note: "first for PDFs" },
            { label: "Groq", kind: "ai" },
            { label: "OpenAI", kind: "ai" },
            { label: "Claude", kind: "ai" },
          ], note: "only engines with a key; on failure the next one takes over" },
          { label: "Streamed answer", kind: "client", note: "citations become page and note links" },
        ],
      },
      {
        type: "flow",
        title: "Sync",
        caption: "Local-first: the device is always the source of truth for unsynced edits.",
        steps: [
          { label: "Edit on the device", kind: "actor" },
          { label: "Write to IndexedDB + mark changed", kind: "store", note: "the app never waits on the network" },
          { label: "Signed in?", kind: "gate", branch: "no → stays local; backup file still works" },
          { label: "Upload changed items", kind: "service", note: "one row per item; the server stamps the next seq" },
          { label: "Download rows with seq > last seen", kind: "service", note: "pages of rows, cursor saved per account" },
          { label: "Merge", kind: "store", branch: "item edited here but not uploaded → local copy wins" },
        ],
      },
      {
        type: "states",
        title: "Highlight review schedule",
        caption: "A small spaced-repetition loop; 'Got it' pushes a highlight further out each time.",
        states: ["NEW", "DUE NEXT DAY", "GOT IT · 3 DAYS", "× 2.5 EACH TIME", "UP TO 365 DAYS"],
        exits: [
          { state: "SHOW AGAIN SOON", note: "back tomorrow with a 1-day interval" },
          { state: "STOP", note: "never shown in review again" },
        ],
      },
    ],
  },
  {
    slug: "closeby",
    name: "CloseBy",
    tagline: "AI-assisted marketplace for neighbourhood shops",
    role: "Solo: design, frontend, backend, AI layer",
    year: "2026",
    stack: ["Next.js 15", "TypeScript", "Supabase Postgres", "Clerk", "Claude API", "Razorpay"],
    cover: "/projects/closeby-site.png",
    links: [
      { label: "Live demo", href: "https://closeby-ashy.vercel.app" },
      { label: "GitHub", href: "https://github.com/chhari07/closeby" },
      // { label: "Demo video", href: "TODO" },
    ],
    problem:
      "Neighbourhood shop owners have no time to type a catalogue, and buyers can't see what a shop near them has in stock. CloseBy lets owners import stock from a shelf photo or voice list, and lets buyers order and pay online from shops nearby.",
    highlights: [
      "Every AI call passes one gateway: auth, rate limit, kill switch, daily spend cap, input cleaning, tool loop, cost logging.",
      "AI only drafts (stock imports, restock ideas, chat replies); the owner approves before anything is saved.",
      "Razorpay flow holds stock until payment is confirmed and auto-refunds rejected orders.",
      "27 eval cases covering Hindi aliases, misspellings and gibberish input.",
    ],
    architecture: {
      summary:
        "A Next.js app with a single server-side AI gateway. The model never writes to the database directly; it returns Zod-validated drafts that the owner approves.",
      flow: [
        "Owner uploads a shelf photo or voice list",
        "Gateway: auth → rate limit → kill switch → spend cap → input cleaning",
        "Claude tool loop returns a structured draft (validated with Zod)",
        "Owner reviews and approves the draft",
        "Approved items saved to Supabase Postgres; cost logged per call",
      ],
    },
    decisions: [
      {
        chose: "One gateway for every model call",
        rejected: "Calling the model from each feature directly",
        why: "Rate limits, spend caps and logging live in one place, so a new AI feature can't skip them.",
      },
      {
        chose: "Human approval before any write",
        rejected: "Letting the model save stock automatically",
        why: "A wrong price or quantity costs a real shop money; a review step is cheap.",
      },
      {
        chose: "Integer paise and a seven-state order machine",
        rejected: "Float rupees and free-form status strings",
        why: "No rounding errors, and illegal status jumps are rejected at the boundary.",
      },
    ],
    failures: [
      { what: "Model returns malformed or partial output", handling: "Zod validation fails closed; the owner sees an error, nothing is saved." },
      { what: "Daily AI spend exceeds the cap", handling: "Gateway refuses new calls until the next day; manual entry still works." },
      { what: "Prompt injection in uploaded text", handling: "Input cleaning plus tool-only output; the model can't trigger writes." },
    ],
    metrics: [
      { label: "Eval cases", value: "27" },
      { label: "Order states", value: "7" },
      { label: "p50 import latency", value: "TODO", note: "measure and fill in" },
      { label: "Cost per import", value: "TODO", note: "from cost logs" },
    ],
    next: ["Grow the eval set to ~100 hard cases", "Record a 90-second demo video", "Stock substitution suggestions"],
    system: {
      caption: "One Next.js app; every model call goes through the AI gateway, every order through the state machine.",
      zones: [
        { label: "clients", cols: [0, 0], rows: [0.5, 1.5] },
        { label: "next.js 15 · vercel", cols: [1, 2], rows: [0, 1] },
        { label: "managed services", cols: [3, 3], rows: [0, 3] },
      ],
      nodes: [
        { id: "buyer", label: "Buyer", sub: "search · order · pay · track", kind: "actor", col: 0, row: 0.5 },
        { id: "owner", label: "Shop owner", sub: "catalogue · orders · approves AI drafts", kind: "actor", col: 0, row: 1.5 },
        { id: "app", label: "Next.js app", sub: "App Router · server actions · role-gated dashboards", kind: "client", col: 1, row: 1 },
        { id: "gateway", label: "AI gateway", sub: "rate limit · kill switch · spend cap · input cleaning", kind: "gate", col: 2, row: 0 },
        { id: "orders", label: "Order service", sub: "7-state machine · integer paise", kind: "service", col: 2, row: 1 },
        { id: "llm", label: "Claude / OpenAI", sub: "tool loop · switchable provider", kind: "ai", col: 3, row: 0 },
        { id: "db", label: "Supabase", sub: "Postgres · Realtime · Storage · RLS", kind: "store", col: 3, row: 1 },
        { id: "auth", label: "Clerk", sub: "sessions · buyer / owner roles", kind: "external", col: 3, row: 2 },
        { id: "pay", label: "Razorpay", sub: "checkout · webhooks · refunds", kind: "external", col: 3, row: 3 },
      ],
      edges: [
        { from: "buyer", to: "app", label: "HTTPS" },
        { from: "owner", to: "app", label: "HTTPS" },
        { from: "app", to: "gateway", label: "AI\nhelpers" },
        { from: "app", to: "orders", label: "actions" },
        { from: "gateway", to: "llm", label: "tool loop" },
        { from: "gateway", to: "db", label: "tools ·\ncost logs", bend: -12 },
        { from: "orders", to: "db", label: "SQL" },
        { from: "orders", to: "pay", label: "checkout ·\nwebhooks", both: true, bend: 12, labelAt: 0.8 },
        { from: "app", to: "auth", label: "session", route: "vh", dashed: true },
      ],
    },
    diagrams: [
      {
        type: "flow",
        title: "System architecture",
        caption: "Each layer only talks to the one below it. The model never touches the database.",
        steps: [
          { label: "users", parallel: [
            { label: "Buyer", kind: "actor", note: "search nearby shops, order, pay, track" },
            { label: "Shop owner", kind: "actor", note: "catalogue, orders, AI drafts to approve" },
          ] },
          { label: "Next.js 15 app", kind: "client", note: "App Router · server actions · Clerk auth · role-gated dashboards" },
          { label: "server", parallel: [
            { label: "AI gateway", kind: "gate", note: "every model call goes through here" },
            { label: "Order service", kind: "service", note: "7-state machine · integer paise" },
            { label: "Realtime", kind: "service", note: "live order updates · in-order chat" },
          ] },
          { label: "providers + data", parallel: [
            { label: "Claude / OpenAI", kind: "ai", note: "tool loop · provider switchable" },
            { label: "Supabase Postgres", kind: "store", note: "catalogue · orders · cost logs · RLS" },
            { label: "Razorpay", kind: "external", note: "checkout · webhooks · refunds" },
          ] },
        ],
      },
      {
        type: "flow",
        title: "AI draft pipeline",
        caption: "What happens when an owner imports stock from a shelf photo or voice list.",
        steps: [
          { label: "Owner uploads a shelf photo or voice list", kind: "actor" },
          { label: "Session + role check", kind: "gate", branch: "not an owner → rejected" },
          { label: "Rate limit → per-helper kill switch → daily spend cap", kind: "gate", branch: "cap reached → AI off until tomorrow, manual entry still works" },
          { label: "Input cleaning + size limits", kind: "gate", note: "user text fenced against prompt injection" },
          { label: "Tool loop", kind: "ai", note: "model reads the catalogue through tools; can't write" },
          { label: "Zod validation", kind: "gate", branch: "malformed output → error shown, nothing saved" },
          { label: "Draft shown to the owner", kind: "client", note: "edit, approve or discard" },
          { label: "on approve", parallel: [
            { label: "Approved items saved", kind: "store" },
            { label: "Cost logged for the run", kind: "store" },
          ] },
        ],
      },
      {
        type: "states",
        title: "Order state machine",
        caption: "Transitions are enforced in server actions; illegal jumps are rejected.",
        states: ["PLACED", "ACCEPTED", "PREPARING", "READY", "COMPLETED"],
        exits: [
          { state: "CANCELLED", note: "unpaid orders cancelled after 15 minutes; stock released" },
          { state: "REJECTED", note: "owner rejects; paid orders refunded automatically" },
        ],
      },
    ],
  },
  {
    slug: "scancart",
    name: "ScanCart.ai",
    tagline: "Counterfeit and fake-review checks for Indian e-commerce",
    role: "Solo: extension, backend, agents",
    year: "2026",
    stack: ["JavaScript", "Node.js", "Express", "Claude API", "Chrome MV3", "React"],
    cover: "/projects/scancart-site.png",
    links: [
      { label: "GitHub", href: "https://github.com/chhari07/scancart.ai-" },
      { label: "Live demo", href: "https://scancartdemo.netlify.app" },
    ],
    problem:
      "Shoppers on Indian marketplaces can't easily tell a fake product or a paid review from a real one. ScanCart runs checks on a listing and gives one Trust Score with the reasons behind it.",
    highlights: [
      "Six specialist agents run in parallel (reviews, ratings, seller, price, quality, alternatives); a compliance agent then uses the seller and price results.",
      "Latency equals the slowest check, not the sum.",
      "Failed checks are left out of the score and shown as \"X of 7 checks\", never guessed.",
      "Pitched at Rajasthan AI Builders Pitch-a-Thon 2026.",
    ],
    architecture: {
      summary:
        "A Chrome MV3 extension sends the listing to an Express backend, which fans out six Claude agents in parallel, runs a compliance agent on their results and combines all seven into a weighted score.",
      flow: [
        "Extension extracts the listing from the product page",
        "Express backend fans out 6 specialist agents in parallel, then runs the compliance agent",
        "Each check returns a score plus a source",
        "Failed checks are dropped; the rest are weighted into one Trust Score",
        "Extension shows the score, reasons and \"X of 7 checks\"",
      ],
    },
    decisions: [
      {
        chose: "Parallel fan-out of independent checks",
        rejected: "A sequential agent chain",
        why: "The checks don't depend on each other, so parallel calls cut latency to the slowest one.",
      },
      {
        chose: "Model id from an environment variable (default Haiku 4.5)",
        rejected: "A hard-coded model id",
        why: "A retired model id once broke the backend; config makes swaps a one-line change.",
      },
      {
        chose: "All model calls from the backend",
        rejected: "Calling the API from the browser",
        why: "Keeps the API key off the client.",
      },
    ],
    failures: [
      { what: "One or more checks time out or error", handling: "Excluded from the score; the UI shows how many checks ran." },
      { what: "Demo data could look like a real scan", handling: "Every result carries a source so demo data is labelled." },
    ],
    metrics: [
      { label: "Agents per scan", value: "6 + 1" },
      { label: "End-to-end latency", value: "TODO" },
      { label: "Cost per scan", value: "TODO" },
    ],
    next: ["Labelled eval set of real vs fake listings", "Cache repeat scans of the same listing"],
    system: {
      caption: "The extension never calls a model. The backend fans out, fuses the results and returns one verdict.",
      zones: [
        { label: "browser", cols: [0, 0], rows: [0, 1] },
        { label: "express backend · node.js", cols: [1, 2], rows: [0, 2] },
        { label: "external", cols: [3, 3], rows: [0.5, 0.5] },
        { label: "dashboard", cols: [0, 1], rows: [3.25, 3.25] },
      ],
      nodes: [
        { id: "shopper", label: "Shopper", sub: "on an Amazon / Flipkart listing", kind: "actor", col: 0, row: 0 },
        { id: "ext", label: "Chrome extension", sub: "MV3 content script · verdict card", kind: "client", col: 0, row: 1 },
        { id: "api", label: "Express API", sub: "Zod · rate limit · Helmet · key stays here", kind: "gate", col: 1, row: 1 },
        { id: "agents", label: "6 specialist agents", sub: "reviews · ratings · seller · price · quality · alternatives", kind: "ai", col: 2, row: 0 },
        { id: "comp", label: "Compliance agent", sub: "uses the seller + price results", kind: "ai", col: 2, row: 1 },
        { id: "fusion", label: "Trust Score fusion", sub: "weighted · failed checks left out", kind: "service", col: 2, row: 2 },
        { id: "llm", label: "Claude API", sub: "model id from env (Haiku 4.5 default)", kind: "ai", col: 3, row: 0.5 },
        { id: "dash", label: "React dashboard", sub: "scan history · Clerk sign-in", kind: "client", col: 0, row: 3.25 },
        { id: "store", label: "Firebase", sub: "scan history", kind: "store", col: 1, row: 3.25 },
      ],
      edges: [
        { from: "shopper", to: "ext", label: "opens a listing" },
        { from: "ext", to: "api", label: "listing ·\nverdict", both: true },
        { from: "api", to: "agents", label: "fan-out\n×6", bend: -10 },
        { from: "agents", to: "comp", label: "seller + price" },
        { from: "comp", to: "fusion", label: "all 7 results" },
        { from: "fusion", to: "api", label: "score +\nreasons", bend: 10 },
        { from: "agents", to: "llm", label: "parallel\ncalls" },
        { from: "comp", to: "llm" },
        { from: "dash", to: "store", label: "reads" },
      ],
    },
    diagrams: [
      {
        type: "flow",
        title: "Scan pipeline",
        caption: "One scan, from product page to verdict. Latency is the slowest agent, not the sum.",
        steps: [
          { label: "Shopper opens a product page", kind: "actor" },
          { label: "Chrome MV3 extension", kind: "client", note: "content script extracts the listing" },
          { label: "Express API", kind: "gate", note: "Zod validation · rate limiting · Helmet · API key stays server-side" },
          { note: "parallel fan-out · per-agent timeouts · one failure can't break a scan", parallel: [
            { label: "Reviews", kind: "ai" },
            { label: "Ratings", kind: "ai" },
            { label: "Seller", kind: "ai" },
            { label: "Price", kind: "ai" },
            { label: "Quality", kind: "ai" },
            { label: "Alternatives", kind: "ai" },
          ] },
          { label: "Compliance agent", kind: "ai", note: "uses the seller and price results" },
          { label: "Trust Score fusion", kind: "service", note: "weighted score", branch: "failed checks left out and shown as \"X of 7 checks\", never guessed" },
          { label: "output", parallel: [
            { label: "Verdict card in the extension", kind: "client", note: "score + reasons" },
            { label: "React dashboard", kind: "client", note: "scan history" },
          ] },
        ],
      },
    ],
  },
  {
    slug: "orderly",
    name: "Orderly",
    tagline: "WhatsApp ordering for kirana shops",
    role: "Solo: owner app, WhatsApp bot",
    year: "2026",
    stack: ["React", "Supabase", "Clerk", "Node.js", "BuilderBot"],
    cover: "/projects/orderly-site.png",
    links: [{ label: "Live demo", href: "https://orderly-blue.vercel.app" }],
    problem:
      "Kirana customers already order over WhatsApp, but owners lose track of messages. Orderly adds an always-on bot that answers price and stock questions from the live catalogue, with no app install for the buyer.",
    highlights: [
      "Crash supervisor and 45-second heartbeat, shown live in the owner app.",
      "Owner replies are relayed to WhatsApp through the bot.",
      "State-machine order flow, integer paise, Supabase row-level security.",
    ],
    architecture: {
      summary:
        "A Node.js WhatsApp bot under a crash supervisor, reading the shop catalogue from Supabase and reporting health to the owner app.",
      flow: [
        "Buyer sends a WhatsApp message",
        "Bot parses the intent and looks up the live catalogue",
        "Order moves through a state machine in Supabase",
        "Owner app shows orders and bot heartbeat; owner replies are relayed back",
      ],
    },
    decisions: [
      {
        chose: "Rule-based parsing for now",
        rejected: "Adding an LLM before the channel is reliable",
        why: "Reliability of the WhatsApp channel was the bigger problem; an AI parser is the planned next step.",
      },
    ],
    failures: [
      { what: "Bot process crashes", handling: "Supervisor restarts it; missed heartbeats show in the owner app." },
      { what: "Upstream WhatsApp library bug with @lid ids", handling: "TODO: document the workaround or current status." },
    ],
    metrics: [{ label: "Heartbeat interval", value: "45 s" }],
    next: ["Hinglish message → structured, priced order with an LLM", "Eval set of real order messages"],
    system: {
      caption: "One bot process per shop, kept alive by a supervisor. Dashed = logical link; exact transport not shown.",
      zones: [
        { label: "customer side", cols: [0, 1], rows: [0, 0] },
        { label: "server · node.js", cols: [2, 3], rows: [0, 2] },
        { label: "shop side", cols: [0, 1], rows: [1.2, 2.2] },
      ],
      nodes: [
        { id: "customer", label: "Customer", sub: "WhatsApp · no app install", kind: "actor", col: 0, row: 0 },
        { id: "wa", label: "WhatsApp", sub: "QR-linked device session", kind: "external", col: 1, row: 0 },
        { id: "bot", label: "Bot process", sub: "BuilderBot · whatsapp-web.js", kind: "service", col: 2, row: 0 },
        { id: "sup", label: "Crash supervisor", sub: "auto-restart · stops at 5 crashes / 30 s", kind: "gate", col: 3, row: 0 },
        { id: "db", label: "Supabase", sub: "Postgres · RLS · shops · items · orders", kind: "store", col: 2, row: 2 },
        { id: "owner", label: "Shop owner", sub: "browser", kind: "actor", col: 0, row: 1.2 },
        { id: "app", label: "Owner app", sub: "React 19 + Vite · orders · chats · inventory", kind: "client", col: 1, row: 1.2 },
        { id: "auth", label: "Clerk", sub: "owner sign-in", kind: "external", col: 1, row: 2.2 },
      ],
      edges: [
        { from: "customer", to: "wa", label: "chat", both: true },
        { from: "wa", to: "bot", label: "events", both: true },
        { from: "sup", to: "bot", label: "restarts" },
        { from: "bot", to: "db", label: "shop + item lookup" },
        { from: "owner", to: "app", label: "HTTPS" },
        { from: "app", to: "db", label: "SQL", bend: 12, labelAt: 0.75 },
        { from: "app", to: "auth", label: "sign in" },
        { from: "bot", to: "app", label: "heartbeat ·\nreplies", dashed: true, both: true, bend: -12 },
      ],
    },
    diagrams: [
      {
        type: "flow",
        title: "System architecture",
        caption: "Current build: a QR-linked whatsapp-web.js session, one bot process per shop.",
        steps: [
          { label: "Customer on WhatsApp", kind: "actor", note: "no app install" },
          { label: "whatsapp-web.js session", kind: "external", note: "linked to the shop's number by QR" },
          { label: "Bot process (Node.js, BuilderBot)", kind: "service", note: "runs under a crash supervisor" },
          { label: "reads + writes", parallel: [
            { label: "Supabase Postgres", kind: "store", note: "shops · items · orders · RLS" },
            { label: "Owner app", kind: "client", note: "React + Vite · Clerk · orders, chats, inventory" },
          ] },
        ],
      },
      {
        type: "flow",
        title: "Message handling",
        caption: "What the bot does with one incoming WhatsApp message.",
        steps: [
          { label: "Message arrives", kind: "actor", branch: "group or channel message → ignored" },
          { label: "Normalise the phone number", kind: "service" },
          { label: "Look up the shop in Supabase", kind: "store", branch: "no shop linked → reply \"not linked yet\", stop" },
          { label: "Classify: greeting · hours · address · delivery · item", kind: "service" },
          { label: "Item request: search the live catalogue", kind: "store", note: "partial name match · up to 5 results · live price and stock" },
          { label: "Compose and send the reply", kind: "service", branch: "lookup fails → log it, still send a short apology" },
          { label: "Order status changes go through the state machine", kind: "gate" },
        ],
      },
      {
        type: "flow",
        title: "Bot supervisor",
        caption: "How the owner knows the bot is alive.",
        steps: [
          { label: "Supervisor starts the bot", kind: "service" },
          { label: "Heartbeat every 45 s", kind: "store", note: "owner app shows the bot as live" },
          { label: "Bot crashes", kind: "service", branch: "restarted automatically" },
          { label: "5 crashes within 30 s", kind: "gate", note: "supervisor stops restarting; missed heartbeats show in the owner app" },
        ],
      },
      {
        type: "states",
        title: "Order states",
        caption: "From the Orderly design notes; the owner drives every transition.",
        states: ["draft", "pending_payment", "placed", "confirmed", "ready", "completed"],
        exits: [{ state: "cancelled → refunded", note: "cancelled orders move to refunded once money is returned" }],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
