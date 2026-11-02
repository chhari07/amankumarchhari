// "How it works" walkthroughs, one per project, shown at /work/<slug>/how-it-works.
// Every step names the real files that do the work, so a reader can open the
// repo and follow along. Facts were checked against each project's local code
// (2 Nov 2026); keep them in sync if the code changes.

export type WalkStep = {
  title: string;
  who: "user" | "app" | "server" | "ai" | "data";
  what: string;
  files: string[];
  detail?: string; // one line lifted from the code: a constant, a rule, a limit
};

export type Walkthrough = {
  slug: string;
  oneLine: string;
  video: { src: string; poster: string; length: string };
  posterArt: string;
  qr: string;
  tryUrl: string;
  steps: WalkStep[];
  guards: { title: string; text: string; file: string }[];
  limits: string[];
  run: { label: string; cmds: string[] }[];
};

export const walkthroughs: Walkthrough[] = [
  {
    slug: "stack",
    oneLine: "One loop: save anything, highlight the lines that matter, and Stack brings them back until they stick.",
    video: { src: "/videos/stack-explainer.mp4", poster: "/videos/stack-explainer.jpg", length: "4:46" },
    posterArt: "/projects/posters/stack.webp",
    qr: "/projects/qr/stack.svg",
    tryUrl: "https://stack-henna-delta.vercel.app",
    steps: [
      {
        title: "Save from anywhere",
        who: "user",
        what: "Built-in news (12 topics + any RSS feed), a PDF/EPUB reader, or Share to Stack from Chrome, WhatsApp, YouTube or Files. A native Android activity catches the share and hands it to the web app.",
        files: ["android/…/ShareActivity.java", "android/…/ShareInPlugin.java", "src/lib/share-in.ts", "src/lib/feeds.ts"],
        detail: "importShared(item) turns a shared link, text or file into a saved item",
      },
      {
        title: "Clean reader mode",
        who: "app",
        what: "The article is fetched, cleaned with Readability and sanitised with DOMPurify, so only the text and images you need are left.",
        files: ["src/lib/article.ts", "src/lib/article-native.ts", "src/lib/pdf.ts"],
        detail: "ALLOWED_TAGS: anything outside the allow-list is stripped",
      },
      {
        title: "Select a line → highlight or note",
        who: "user",
        what: "The selection becomes a note that remembers its source, and is painted back on the page with the CSS Custom Highlight API.",
        files: ["src/lib/highlights.ts", "src/lib/db.ts"],
      },
      {
        title: "Write locally first",
        who: "data",
        what: "Every write goes to IndexedDB on the phone and is marked as changed. The app never waits on the network and needs no account.",
        files: ["src/lib/db.ts", "src/lib/sync-state.ts"],
      },
      {
        title: "Sync when signed in",
        who: "server",
        what: "Changed items upload to the Supabase items table; the server stamps each write with the next seq. Other devices pull rows with seq greater than the last one they saw. Unsynced local edits win.",
        files: ["src/lib/sync.ts", "supabase/schema.sql"],
        detail: "select(...).gt(\"seq\", since).order(\"seq\"): a cursor, not timestamps",
      },
      {
        title: "Optional Stack AI",
        who: "ai",
        what: "Summarise, ask a PDF, or ask your whole Stack. One Edge Function checks sign-in, takes one unit of the daily limit in Postgres, then tries engines in order until one answers, and streams the reply.",
        files: ["src/lib/ai.ts", "supabase/functions/ai/index.ts", "supabase/schema.sql (ai_take)"],
        detail: "DEFAULT_ORDER = sarvam → gemini → groq → openai → anthropic · 50 requests/day",
      },
      {
        title: "Daily review",
        who: "app",
        what: "Each day 3 old highlights come back. 'Got it' pushes the next one out 3 days, then ×2.5 each time, up to 365 days; 'Show again soon' brings it back tomorrow.",
        files: ["src/lib/review.ts"],
        detail: "interval = reps === 0 ? 3 : min(365, round(interval × 2.5))",
      },
    ],
    guards: [
      { title: "No keys in the app", text: "Every AI call goes through the Edge Function; the APK only holds the public Supabase URL.", file: "supabase/functions/ai/index.ts" },
      { title: "Race-proof daily limit", text: "ai_take() counts in one SQL statement, so 80 parallel requests stopped at exactly 50.", file: "supabase/schema.sql" },
      { title: "Engine down? Next one answers", text: "The app gets a reset event and drops the half-written text before the next engine streams.", file: "supabase/functions/ai/index.ts" },
    ],
    limits: [
      "Local-edit-wins can overwrite another device's change to the same item.",
      "Load tests used mock AI engines, so real provider limits weren't tested.",
      "Not on the Play Store yet; iOS build not shipped.",
    ],
    run: [
      { label: "Web app", cmds: ["npm install", "npm run dev   # http://127.0.0.1:3000"] },
      { label: "Android APK", cmds: ["./build-apk.sh   # → ~/Desktop/Stack.apk"] },
    ],
  },
  {
    slug: "closeby",
    oneLine: "Buyers order from shops on their street; owners build their catalogue by speaking or snapping a shelf.",
    video: { src: "/videos/closeby-explainer.mp4", poster: "/videos/closeby-explainer.jpg", length: "3:41" },
    posterArt: "/projects/posters/closeby.webp",
    qr: "/projects/qr/closeby.svg",
    tryUrl: "https://closeby-ashy.vercel.app",
    steps: [
      {
        title: "Find a shop nearby",
        who: "user",
        what: "One Postgres query fetches live shops inside a lat/lng box around the buyer; the exact distance and delivery radius are then checked in memory, nearest first.",
        files: ["src/lib/geo/nearby-shops.ts", "src/lib/geo/radius.ts"],
      },
      {
        title: "Owner adds stock with AI",
        who: "user",
        what: "The owner says a list or snaps a shelf photo. The request goes to one AI route.",
        files: ["src/app/api/ai/[helper]/route.ts", "src/actions/ai.ts"],
      },
      {
        title: "AI gateway",
        who: "server",
        what: "Before any model call: Clerk sign-in, a per-user rate limit, an on/off switch per helper, and a daily spend cap.",
        files: ["src/app/api/ai/[helper]/route.ts", "src/lib/rate-limit.ts", "src/lib/ai/settings.ts", "src/lib/ai/usage.ts"],
        detail: "1. sign-in  2. rate limit  3. helper on/off  4. daily spend limit",
      },
      {
        title: "Claude tool loop → draft",
        who: "ai",
        what: "Claude reads the catalogue through lookup tools. Its only write is a pending draft in the approvals table; it can't touch products. Zod checks every tool input and the output; anything malformed is dropped.",
        files: ["src/lib/ai/client.ts", "src/lib/ai/tools/lookup.ts", "src/lib/ai/tools/draft.ts", "src/lib/ai/logging.ts"],
      },
      {
        title: "Owner approves",
        who: "user",
        what: "The owner edits, approves or discards each item. Only approved items are saved, and every AI call's cost is logged.",
        files: ["src/actions/products.ts", "src/lib/ai/stock-items.ts"],
      },
      {
        title: "Checkout without overselling",
        who: "data",
        what: "Placing an order locks the shop and product rows (SELECT … FOR UPDATE) inside one transaction, checks stock, then decrements it.",
        files: ["src/actions/orders.ts"],
        detail: "50 buyers racing for the last 5 units → exactly 5 orders, zero oversells",
      },
      {
        title: "Pay and hold stock",
        who: "server",
        what: "With Razorpay, stock is held until payment is confirmed by a signed webhook. Unpaid orders are cancelled after 15 minutes; a rejected paid order is refunded.",
        files: ["src/lib/payments/orders.ts", "src/lib/payments/razorpay.ts", "src/app/api/webhooks/razorpay/route.ts"],
        detail: "PAYMENT_WINDOW_MS = 15 * 60 * 1000",
      },
      {
        title: "Order state machine + live updates",
        who: "app",
        what: "7 states (PLACED → ACCEPTED → PREPARING → READY → COMPLETED, plus REJECTED and CANCELLED). The server rejects any jump not on the map. Supabase Realtime keeps status and chat live.",
        files: ["src/lib/orders/transitions.ts", "supabase/migrations/0001_init.sql", "src/actions/messages.ts"],
      },
    ],
    guards: [
      { title: "AI only drafts", text: "Claude's tools read the catalogue or save a pending draft; changing products is a separate owner action.", file: "src/lib/ai/tools/draft.ts" },
      { title: "Forged webhooks rejected", text: "Every Razorpay webhook is checked against its HMAC signature; 100 forged ones all got 401.", file: "src/app/api/webhooks/razorpay/route.ts" },
      { title: "Spend cap", text: "A user over the daily cap is blocked before any model call.", file: "src/lib/ai/usage.ts" },
    ],
    limits: [
      "Load tests ran on one Node process with local Postgres and a mock Claude; the race test was 4 runs.",
      "27 AI eval cases so far (Hindi aliases, misspellings, gibberish); target is ~100 hard cases.",
      "No real shops on it yet.",
    ],
    run: [
      { label: "App", cmds: ["npm install", "npm run db:migrate", "npm run seed:test-shop   # optional demo shop", "npm run dev"] },
      { label: "Checks", cmds: ["npm test", "npm run test:ai"] },
    ],
  },
  {
    slug: "scancart",
    oneLine: "Open any Amazon or Flipkart listing and get one Trust Score out of 100, with the checks behind it.",
    video: { src: "/videos/scancart-explainer.mp4", poster: "/videos/scancart-explainer.jpg", length: "3:11" },
    posterArt: "/projects/posters/scancart.webp",
    qr: "/projects/qr/scancart.svg",
    tryUrl: "https://scancartdemo.netlify.app",
    steps: [
      {
        title: "Read the listing",
        who: "app",
        what: "The Chrome MV3 extension detects the marketplace, adds a Scan button, and reads title, price, seller, rating and reviews from the page. It never calls a model itself.",
        files: ["extension/src/content/scanner.js", "extension/src/content/injectButton.js", "backend/utils/platformDetector.js"],
      },
      {
        title: "Send to the backend",
        who: "app",
        what: "The background worker posts the listing to the Express API; the API key stays on the server.",
        files: ["extension/src/background/messageHandler.js", "backend/routes/scan.js"],
      },
      {
        title: "Validate and rate-limit",
        who: "server",
        what: "Bad payloads get a 400; each client gets 100 scans per 15 minutes.",
        files: ["backend/routes/scan.js", "backend/middleware/rateLimiter.js"],
        detail: "windowMs: 900_000 · max: 100",
      },
      {
        title: "Six agents in parallel",
        who: "ai",
        what: "Reviews, ratings, seller, price, quality and alternatives run at the same time. A scan takes as long as the slowest check, not the sum.",
        files: ["backend/services/orchestrator.js", "backend/agents/*.js", "backend/services/claude.js"],
        detail: "Promise.allSettled([...6 agents]): 13.7 s of model time → 4.8 s",
      },
      {
        title: "Compliance check",
        who: "ai",
        what: "Runs after the others, using the seller and price results, against India's e-commerce consumer rules.",
        files: ["backend/agents/complianceEngineAgent.js"],
      },
      {
        title: "Fuse into one score",
        who: "server",
        what: "A weighted average of six checks (alternatives don't count). A failed check is left out and the other weights are re-normalised, never guessed.",
        files: ["backend/utils/trustScore.js"],
        detail: "seller 25% · review 20% · compliance 20% · price 15% · rating 10% · quality 10%",
      },
      {
        title: "Verdict card",
        who: "user",
        what: "The popup shows the score, the reasons and how many of the 7 checks finished.",
        files: ["extension/src/popup/Popup.jsx", "extension/src/popup/views/"],
      },
    ],
    guards: [
      { title: "Hung agent ≠ failed scan", text: "A 10 s timeout per Claude call plus allSettled: with one agent hung, 20/20 scans still scored.", file: "backend/services/claude.js" },
      { title: "No key in the browser", text: "The extension only talks to the backend.", file: "backend/services/claude.js" },
      { title: "Fewer signals are shown", text: "The card says “X of 7 checks” so a partial verdict is visible.", file: "backend/utils/trustScore.js" },
    ],
    limits: [
      "Accuracy isn't measured yet: there's no labelled set of real vs fake listings.",
      "A scored result means it scored, not that it's right.",
      "Load tests used a mock Claude server.",
    ],
    run: [
      { label: "Backend", cmds: ["cd backend", "npm install", "npm run dev"] },
      { label: "Extension", cmds: ["cd extension", "npm install", "npm run build   # load dist/ in chrome://extensions"] },
    ],
  },
  {
    slug: "orderly",
    oneLine: "A WhatsApp bot answers stock, price and delivery questions from the shop's live catalogue; the owner runs it from one app.",
    video: { src: "/videos/orderly-explainer.mp4", poster: "/videos/orderly-explainer.jpg", length: "3:23" },
    posterArt: "/projects/posters/orderly.webp",
    qr: "/projects/qr/orderly.svg",
    tryUrl: "https://orderly-blue.vercel.app",
    steps: [
      {
        title: "Buyer messages the shop",
        who: "user",
        what: "No app to install. A QR at the counter opens WhatsApp with the first message already typed.",
        files: ["src/routes/golive/", "src/routes/shop/Bot.jsx"],
      },
      {
        title: "Filter and find the shop",
        who: "server",
        what: "The bot ignores group and channel traffic, normalises the phone number and finds the linked shop. No shop linked → it says so.",
        files: ["bot/src/index.js", "bot/src/supabase.js"],
        detail: "IGNORED_CHAT_SUFFIXES = [\"@newsletter\", \"@g.us\"]",
      },
      {
        title: "Classify the message",
        who: "server",
        what: "Rules, not an LLM: greeting, hours, address, delivery, or an item request.",
        files: ["bot/src/intent.js", "bot/src/intent.test.js"],
        detail: "detectIntent(text, shop) → greeting | hours | address | delivery | item",
      },
      {
        title: "Look up the live catalogue",
        who: "data",
        what: "Items are matched by partial name in Supabase and the reply carries the current price and stock.",
        files: ["bot/src/supabase.js", "supabase/migrations/0002_items.sql"],
        detail: ".ilike(\"name\", `%${itemQuery}%`)",
      },
      {
        title: "Reply, or apologise",
        who: "server",
        what: "If the lookup fails, the error is logged and the buyer gets a short apology instead of silence.",
        files: ["bot/src/index.js", "bot/src/conversations.js"],
      },
      {
        title: "Owner app",
        who: "user",
        what: "Orders, chats (owner replies are relayed through the bot), inventory, bot health and staff invites by WhatsApp link.",
        files: ["src/routes/shop/Orders.jsx", "src/routes/shop/Chats.jsx", "src/routes/shop/Inventory.jsx", "src/routes/shop/Workers.jsx"],
      },
      {
        title: "Order states as data",
        who: "app",
        what: "Allowed moves live in one table and the buttons are generated from it, so an illegal move can't be clicked. Money is integer paise.",
        files: ["src/lib/order-states.js", "src/lib/money.js"],
      },
    ],
    guards: [
      { title: "Crash supervisor", text: "Restarts the bot, and stops after 5 crashes in 30 s so it can't loop forever.", file: "bot/src/supervisor.js" },
      { title: "Heartbeat", text: "The bot reports every 45 s; the owner app shows it live.", file: "bot/src/index.js" },
      { title: "Bot can't lie about prices", text: "The owner can change the bot's wording, never a price. Row-level security keeps each shop's data apart.", file: "supabase/migrations/0001_shops.sql" },
    ],
    limits: [
      "Understands set intents only, not free-form Hinglish.",
      "Answers questions but doesn't create orders from chat yet.",
      "Runs on an unofficial WhatsApp library; some newer senders can't get replies (open upstream bug).",
      "No real shops on it yet.",
    ],
    run: [
      { label: "Owner app", cmds: ["npm install", "npm run dev   # http://localhost:5173"] },
      { label: "WhatsApp bot", cmds: ["npm run bot:install", "npm --prefix bot run start:resilient   # scan the QR with the shop phone"] },
    ],
  },
];

export const getWalkthrough = (slug: string) => walkthroughs.find((w) => w.slug === slug);
