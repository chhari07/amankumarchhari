// All portfolio content. Every number is real (repos, JMeter runs, eval files).
// Edit this file, not the components.

export type Num = { v: string; l: string };
export type Link = { label: string; href: string };
export type Project = {
  slug: string; name: string; kind: string; color: string; tagline: string; problem: string;
  built: string[]; story: string; numbers: Num[]; stack: string; role: string; year: string;
  logo: string; poster?: string; banner: string; shot?: string; video?: string; links: Link[]; note?: string;
};

export const site = {
  "name": "Aman Kumar Chhari",
  "year": "2026",
  "title": "Design Engineer · Applied AI",
  "roles": [
    "Design Engineer",
    "Creative Technologist",
    "AI Product Engineer",
    "Forward Deployed Engineer"
  ],
  "line": "I build AI products, then design the brand story that sells them.",
  "intro": "I start from the client's need, ship the full-stack AI tool or app, and then turn it into a brand story people can read in 30 seconds: a case study, a launch poster, a banner and a narrated explainer video. One person, from problem to launch.",
  "email": "amankumarchhari@gmail.com",
  "location": "Guna, MP · open to relocate · B.Tech CSE 2026",
  "links": [
    {
      "label": "GitHub",
      "href": "https://github.com/chhari07"
    },
    {
      "label": "LinkedIn",
      "href": "https://www.linkedin.com/in/aman-kumar-chhari-9613bb235/"
    },
    {
      "label": "AI automation site",
      "href": "https://aman-ai-automation.vercel.app"
    }
  ],
  "steps": [
    {
      "k": "01",
      "t": "Listen",
      "d": "Write the client's problem in one line, and who loses money or time because of it."
    },
    {
      "k": "02",
      "t": "Build",
      "d": "Ship the AI tool, web app or Android app: UI, backend, AI layer, payments, deploy."
    },
    {
      "k": "03",
      "t": "Guard",
      "d": "AI drafts, people decide. One gateway, spend caps, evals and load tests."
    },
    {
      "k": "04",
      "t": "Brand",
      "d": "Name, colours, poster, banner and a QR code that opens the live demo."
    },
    {
      "k": "05",
      "t": "Tell",
      "d": "Case study and narrated explainer video, so a buyer gets it in 30 seconds."
    }
  ],
  "brandVideos": [
    {
      "name": "Ubuntu Widgets",
      "video": "/videos/ubuntu-widgets-brand.mp4",
      "href": "https://github.com/chhari07/ubuntu-widgets",
      "d": "14-second 3D brand film for an open-source release"
    },
    {
      "name": "Ubuntu Mac Kit",
      "video": "/videos/ubuntu-mac-kit-brand.mp4",
      "href": "https://github.com/chhari07/ubuntu-mac-kit",
      "d": "14-second 3D brand film for an open-source release"
    }
  ],
  "achievements": [
    "Finalist among 600+ teams, Hacksagon 2025, ABV-IIITM Gwalior",
    "Top 35 pitch, Rajasthan AI Builders Pitch-a-Thon 2026, Jaipur (ScanCart.ai)"
  ]
};

export const projects: Project[] = [
  {
    "slug": "closeby",
    "logo": "/icons/closeby.webp",
    "name": "CloseBy",
    "kind": "AI web app · marketplace",
    "color": "#ff6a3d",
    "tagline": "Your street's shops, online.",
    "problem": "Neighbourhood shop owners have no time to type a catalogue, and buyers can't see what a shop near them has in stock.",
    "built": [
      "Owners import stock from a shelf photo or a voice list. The AI drafts; nothing is saved until the owner approves.",
      "Every AI call passes one gateway: auth, rate limit, kill switch, daily spend cap, tool loop, cost logging.",
      "Razorpay holds stock until the server confirms payment; rejected paid orders refund automatically."
    ],
    "story": "A hand-drawn street of Indian shops (kirana, pharmacy, bakery, café) set the brand. The poster tells the product as a four-panel comic: find, say the stock, pay, track. Then a QR code to the live demo.",
    "numbers": [
      {
        "v": "100%",
        "l": "over-cap AI calls blocked under load"
      },
      {
        "v": "27",
        "l": "eval cases (Hindi, typos, gibberish)"
      },
      {
        "v": "0",
        "l": "oversells: 50 buyers, last 5 units"
      }
    ],
    "stack": "Next.js · TypeScript · Supabase · Claude API · Razorpay · JMeter",
    "poster": "/posters/closeby.webp",
    "banner": "/cards/closeby-wide.webp",
    "shot": "/shots/closeby-site.webp",
    "video": "/videos/closeby-explainer.mp4",
    "links": [
      {
        "label": "Live demo",
        "href": "https://closeby-ashy.vercel.app"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/chhari07/closeby"
      }
    ],
    "role": "Solo: design, frontend, backend, AI layer",
    "year": "2026"
  },
  {
    "slug": "stack",
    "logo": "/icons/stack.webp",
    "name": "Stack",
    "kind": "Web + Android app · AI reading",
    "color": "#facc15",
    "tagline": "Stack makes you remember what you read.",
    "problem": "People read articles and PDFs all day and forget almost all of it a week later. Read-later apps save links but never bring them back.",
    "built": [
      "One Next.js codebase ships the website and a native Android app (Capacitor). Works offline in IndexedDB, no account needed.",
      "Every morning, 3 old highlights come back on a spaced schedule.",
      "Stack AI runs in one Supabase Edge Function and falls back across five model providers."
    ],
    "story": "Told as a cosy reading-room comic in four panels: save it, highlight it, focus, remember it. The bottom strip lands the two proof points, works offline and 5 AI engines, then a QR code to the live app.",
    "numbers": [
      {
        "v": "500/500",
        "l": "requests served with top 2 providers down"
      },
      {
        "v": "1.6 s",
        "l": "p95 latency in that failover test"
      },
      {
        "v": "5",
        "l": "LLM providers in the fallback chain"
      }
    ],
    "stack": "Next.js 16 · TypeScript · Capacitor · IndexedDB · Supabase Edge Functions",
    "poster": "/posters/stack.webp",
    "banner": "/cards/stack-wide.webp",
    "shot": "/shots/stack-site.webp",
    "video": "/videos/stack-explainer.mp4",
    "links": [
      {
        "label": "Live app",
        "href": "https://stack-henna-delta.vercel.app"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/chhari07/stackforge"
      }
    ],
    "role": "Solo: product, design, Android app, sync, AI layer",
    "year": "2026"
  },
  {
    "slug": "scancart",
    "logo": "/icons/scancart.webp",
    "name": "ScanCart.ai",
    "kind": "AI Chrome extension + Android app · trust",
    "color": "#3b6bff",
    "tagline": "One Trust Score for any listing.",
    "problem": "Shoppers on Indian marketplaces can't easily tell a fake product or a paid review from a real one.",
    "built": [
      "A Chrome extension sends the listing to a backend that runs 6 specialist AI agents in parallel, then a compliance agent.",
      "All 7 checks combine into one weighted Trust Score with the reasons behind it.",
      "A check that fails is left out and shown as \"X of 7 checks\", never guessed.",
      "Trust-first scoring: a real MacBook listing that was wrongly flagged (63, caution) now scores 86, safe; a fake ₹24,999 MacBook scores 40, do not buy.",
      "An Android app brings the same panel to phones: share a link to ScanCart, tap a floating bubble, or turn on the automatic check inside shopping apps."
    ],
    "story": "A friendly robot mascot and a worried shopper asking \"Is this listing even real?!\". The comic runs shopping online, scan it, reviews checked, buy with confidence, and the strip says it in one line: 7 checks, one weighted Trust Score.",
    "numbers": [
      {
        "v": "7",
        "l": "checks behind one verdict"
      },
      {
        "v": "1×",
        "l": "latency = slowest check, not the sum"
      },
      {
        "v": "Top 35",
        "l": "finalists, Pitch-a-Thon 2026 Jaipur"
      }
    ],
    "stack": "Node.js · Express · Claude API · Chrome MV3 · React · Android",
    "poster": "/posters/scancart.webp",
    "banner": "/cards/scancart-wide.webp",
    "shot": "/shots/scancart-site.webp",
    "video": "/videos/scancart-ai-explainer.mp4",
    "links": [
      {
        "label": "Website",
        "href": "https://scancart-ai.vercel.app"
      },
      {
        "label": "GitHub",
        "href": "https://github.com/chhari07/scancart-ai"
      }
    ],
    "role": "Solo: extension, Android app, backend, agents",
    "year": "2026"
  },
  {
    "slug": "streetwise",
    "logo": "/icons/streetwise.webp",
    "name": "Streetwise",
    "kind": "Multi-agent AI · local buying",
    "color": "#ef4444",
    "tagline": "One QR on every shop. One AI agent behind it.",
    "problem": "To buy locally, people walk or call shop after shop to ask what is in stock and what it costs. Hidden fees show up only at the counter.",
    "built": [
      "Four AI agents: Shopper, Store Locator, one Merchant per shop, and Trust.",
      "The LLM only reads the shopping list. Prices, totals and fee checks are plain code, so it can't invent a number.",
      "Search widens 500 m → 1 km → 2 km until 3 open shops are found on OpenStreetMap."
    ],
    "story": "Branded around a pixel-type shop sign and a QR sticker on a real shop front. The banner pairs the agent flow with an illustrated 'Sharma Store' so a shop owner and a judge both get it.",
    "numbers": [
      {
        "v": "4",
        "l": "AI agents talking in typed messages"
      },
      {
        "v": "3",
        "l": "options: cheapest, nearest, one shop"
      },
      {
        "v": "0.002",
        "l": "FET agent charge, verified on testnet"
      }
    ],
    "stack": "Python · Fetch.ai uAgents · ASI1 LLM · OpenStreetMap · Leaflet",
    "banner": "/cards/streetwise-wide.webp",
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/chhari07/streetwise-agents"
      }
    ],
    "note": "Built for Fetch-A-Thon 3.0. Tested end to end locally; prices and orders are demo data.",
    "role": "Solo (Team SOLOX): agents, messages, maps, payments",
    "year": "2026"
  },
  {
    "slug": "orderly",
    "logo": "/icons/orderly.webp",
    "name": "Orderly",
    "kind": "WhatsApp bot + owner app",
    "color": "#22c55e",
    "tagline": "Run your kirana shop on WhatsApp. Chat to cash, no app.",
    "problem": "Kirana customers already order over WhatsApp, but owners reply by hand and lose track of orders.",
    "built": [
      "An always-on WhatsApp bot answers price and stock questions from the live catalogue.",
      "Owner replies typed in the app are relayed back to WhatsApp.",
      "A crash supervisor and a 45-second heartbeat show the bot's health in the owner app."
    ],
    "story": "Told in the shop owner's own Hinglish: \"2kg atta bhej do\". The comic runs buyers already use WhatsApp, the bot answers, the owner replies, the shop goes live, and ends on NO APP: buyers install nothing.",
    "numbers": [
      {
        "v": "45 s",
        "l": "bot heartbeat, live in the owner app"
      },
      {
        "v": "0",
        "l": "apps the buyer has to install"
      },
      {
        "v": "₹ paise",
        "l": "money stored as integers, never floats"
      }
    ],
    "stack": "React · Supabase · Clerk · Node.js · BuilderBot",
    "poster": "/posters/orderly.webp",
    "banner": "/cards/orderly-wide.webp",
    "shot": "/shots/orderly-site.webp",
    "video": "/videos/orderly-explainer.mp4",
    "links": [
      {
        "label": "Live demo",
        "href": "https://orderly-blue.vercel.app"
      }
    ],
    "note": "In build: bot and owner app work; the payment-link flow is planned.",
    "role": "Solo: owner app, WhatsApp bot",
    "year": "2026"
  }
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const roleText: Record<string, string> = {
  "Design Engineer": "I design the screens and build them, from Figma to a deployed Next.js app.",
  "Creative Technologist": "I use AI and code to make campaigns, posters, interactive pages and explainer films.",
  "AI Product Engineer": "I take a client's need and ship the whole AI product, with guardrails, evals and a clear story.",
  "Forward Deployed Engineer": "I sit with the client, build the custom AI solution, and hand it over as a case study.",
};

// The big-number strip on the home page. Each one is measured, not estimated.
export const proof = [
  { v: "500/500", l: "Stack: requests served with the top two AI providers down" },
  { v: "100%", l: "CloseBy: over-cap AI calls blocked before any model call" },
  { v: "27", l: "CloseBy: eval cases, Hindi aliases to gibberish" },
  { v: "7", l: "ScanCart.ai: parallel checks behind one Trust Score" },
  { v: "600+", l: "teams at Hacksagon 2025, where I was a finalist" },
];

// Hero word: black on a white screen (pure black & white).
export const hero = { word: "SOLOX" };

// Site-wide accent colours, taken from the posters. Each project also has its own `color`.
export const palette = ["#ff6a3d", "#22c55e", "#3b6bff", "#facc15", "#ef4444"];
export const pick = (i: number) => palette[i % palette.length];

// ── Brought in from the full-stack site (amankumarchhari.vercel.app) ──
export const guards = [
  { t: "Guardrails first", d: "Every model call passes one gateway with auth, rate limits, a kill switch and a daily spend cap." },
  { t: "AI drafts, people decide", d: "The model proposes stock imports, replies and restock ideas. Nothing is saved until the owner approves it." },
  { t: "Checked output", d: "Responses are validated against a Zod schema. Malformed output fails closed: the user sees an error and nothing is saved." },
  { t: "Measured, not guessed", d: "Eval cases cover misspellings, Hindi aliases and gibberish; JMeter shows 50 buyers racing for the last 5 units still make exactly 5 orders." },
];
export const principles = ["AI drafts, humans confirm.", "State machines over vibes.", "Money as integer paise, never floats.", "A failed check is left out, never guessed."];

export const experience = [
  {
    role: "Freelance Full-Stack & AI Developer", org: "Independent · Guna, MP (Remote)", when: "Feb 2023 – Present",
    points: [
      { name: "Rent It, vehicle rental platform", when: "Aug 2025", href: "https://github.com/chhari07/RENT-IT", text: "React and Tailwind app: browse vehicles, book and pay through Razorpay, Firebase sign-in, protected routes, map section and booking history." },
      { name: "Gurudev Public School, Guna", when: "Oct 2025", href: "https://github.com/chhari07/gurudev-public-school-guna", text: "The school's 15-page website in React, Vite and Tailwind: academics, facilities, gallery, news, holiday homework and the public disclosure page." },
    ],
  },
  { role: "Web Development Intern", org: "Zidio Development · Remote", when: "Aug – Sep 2024", points: [] },
];
export const education = { school: "Jaypee University of Engineering & Technology, Guna", degree: "B.Tech, Computer Science & Engineering", years: "2022 – 2026" };

// Only achievements with a certificate on file.
export const awards = [
  { t: "Finalist · 600+ teams", d: "Hacksagon 2025 · ABV-IIITM Gwalior", href: "/certificates/hacksagon-2025-round3.pdf" },
  { t: "Selected pitch · Top 35", d: "Rajasthan AI Builders Pitch-a-Thon 2026 · Jaipur · ScanCart.ai", href: "/certificates/rajasthan-ai-builders-2026-scancart.jpg" },
];

export const skills: Record<string, string[]> = {
  Design: ["Figma", "Brand & posters", "Explainer video", "CSS motion", "Design systems"],
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Express", "FastAPI", "Python", "Supabase Postgres", "Clerk", "Razorpay"],
  "Applied AI": ["Claude API", "OpenAI API", "Agentic workflows", "Fetch.ai uAgents", "Tool use", "Structured outputs (Zod)", "Guardrails", "Human-in-the-loop", "LLM evals"],
  "Infra & testing": ["Vercel", "GitHub Actions", "Linux", "Apache JMeter", "Vitest"],
};

// Mac-style dock tiles (colours from the full-stack site).
export const dock = [
  { s: "Nx", n: "Next.js", bg: "#111111", fg: "#ffffff" },
  { s: "Re", n: "React", bg: "#20232a", fg: "#61dafb" },
  { s: "Ts", n: "TypeScript", bg: "#3178c6", fg: "#ffffff" },
  { s: "Nd", n: "Node.js", bg: "#3c9a4f", fg: "#ffffff" },
  { s: "Pg", n: "Postgres", bg: "#d6e6f5", fg: "#336791" },
  { s: "Ai", n: "Claude API", bg: "#d97757", fg: "#ffffff" },
  { s: "Fg", n: "Figma", bg: "#1e1e1e", fg: "#a259ff" },
];

export const lookingFor = [
  { k: "Roles", v: "Design Engineer · Creative Technologist · AI Product Engineer · Forward Deployed Engineer" },
  { k: "Type", v: "Full-time" },
  { k: "Level", v: "Entry · B.Tech CSE 2026" },
  { k: "Location", v: "Open to relocate" },
  { k: "Start", v: "Immediately" },
];

export const about =
  "Applied AI engineer and designer. I work alone and build end to end: system design, typed backend, UI, payments and deployment, then the brand, posters and films that explain it. Every number on this site is measured, from JMeter runs and eval files. Freelance since 2023.";
