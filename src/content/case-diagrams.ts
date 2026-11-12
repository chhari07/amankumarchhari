// Architecture + user-flow data for the case-study diagrams on /work/[slug].
// Architecture grids for CloseBy, Stack, ScanCart and Orderly live in fullstack.ts (`system`);
// Streetwise's grid is here, written from the streetwise-agents README and code.
// User-flow steps are the ones from the old full-stack site's isometric figures (tag fullstack-v1).

import { getDeep, type SystemDesign } from "./fullstack";

export type FlowStep = { actor: string; title: string; text: string };
export type UserFlow = { caption: string; steps: FlowStep[] };

const streetwiseSystem: SystemDesign = {
  caption:
    "Four Fetch.ai agent roles talking in typed messages. The LLM only reads the item list; prices, totals and fee checks are plain code.",
  zones: [
    { label: "buyer side", cols: [0, 0], rows: [0, 1] },
    { label: "streetwise · fetch.ai uagents", cols: [1, 2], rows: [0, 2] },
    { label: "shop side", cols: [0, 0], rows: [2, 2] },
    { label: "outside", cols: [3, 3], rows: [1, 2] },
  ],
  nodes: [
    { id: "buyer", label: "Buyer", sub: "scans a shop QR or chats from anywhere", kind: "actor", col: 0, row: 0 },
    { id: "asi", label: "ASI:One", sub: "Agent Chat Protocol · Agentverse mailbox", kind: "external", col: 0, row: 1 },
    { id: "llm", label: "ASI1 LLM", sub: "free text / Hinglish → item list only", kind: "ai", col: 1, row: 0 },
    { id: "grahak", label: "Shopper Agent", sub: "item list · up to 3 checked options · receipt", kind: "service", col: 1, row: 1 },
    { id: "trust", label: "Trust Agent", sub: "blocks hidden fees · closed shops · wrong totals", kind: "gate", col: 2, row: 0 },
    { id: "locator", label: "Store Locator", sub: "500 m → 1 km → 2 km until 3 open shops", kind: "service", col: 2, row: 1 },
    { id: "merchant", label: "Merchant Agent ×N", sub: "one per shop · own price list · pays agent charge", kind: "service", col: 2, row: 2 },
    { id: "screen", label: "Owner screen", sub: "localhost:8090 · YES / NO per order", kind: "client", col: 1, row: 2 },
    { id: "owner", label: "Shop owner", sub: "one tap to confirm", kind: "actor", col: 0, row: 2 },
    { id: "osm", label: "OpenStreetMap", sub: "real shops around the buyer", kind: "external", col: 3, row: 1 },
    { id: "chain", label: "Fetch.ai testnet", sub: "0.002 FET · dorado-1 · checked on-chain", kind: "store", col: 3, row: 2 },
  ],
  edges: [
    { from: "buyer", to: "asi", label: "chat · QR" },
    { from: "asi", to: "grahak", label: "chat\nprotocol", both: true },
    { from: "grahak", to: "llm", label: "item list" },
    { from: "grahak", to: "trust", label: "CheckQuotes\n→ Verdict", both: true, bend: -16 },
    { from: "grahak", to: "locator", label: "ShopSearch\n→ ShopList", both: true },
    { from: "locator", to: "osm", label: "nearby\nshops" },
    { from: "grahak", to: "merchant", label: "quotes ·\norders", both: true, bend: 16 },
    { from: "merchant", to: "screen", label: "order", both: true },
    { from: "owner", to: "screen", label: "YES / NO" },
    { from: "merchant", to: "chain", label: "agent\ncharge" },
  ],
};

export const getSystem = (slug: string): SystemDesign | undefined =>
  slug === "streetwise" ? streetwiseSystem : getDeep(slug)?.system;

export const userFlows: Record<string, UserFlow> = {
  closeby: {
    caption: "Two people, one order: the owner fills the shop with AI help, the buyer orders, the owner fulfils.",
    steps: [
      { actor: "Shop owner", title: "Import", text: "Owner uploads a shelf photo or a voice list of stock." },
      { actor: "Shop owner", title: "Approve", text: "AI returns a draft catalogue; nothing is saved until the owner approves." },
      { actor: "Buyer", title: "Browse", text: "Buyer sees what shops nearby have in stock." },
      { actor: "Buyer", title: "Pay", text: "Razorpay checkout; stock is held until payment is confirmed." },
      { actor: "Shop owner", title: "Accept", text: "Owner accepts, or rejects and the payment is refunded automatically." },
      { actor: "Shop owner", title: "Prepare", text: "Order moves Preparing → Ready, enforced by server actions." },
      { actor: "Buyer", title: "Done", text: "Order completed." },
    ],
  },
  stack: {
    caption: "What the reader does, and what Stack does in the background after each step.",
    steps: [
      { actor: "You", title: "Save", text: "Save an article, PDF or link, or Share to Stack from any app." },
      { actor: "Stack", title: "Clean", text: "Reader mode cleans the page (Readability + DOMPurify)." },
      { actor: "You", title: "Highlight", text: "Select any line to make a highlight or a note." },
      { actor: "Stack", title: "Store", text: "Every write lands in IndexedDB first, so it works offline." },
      { actor: "Stack", title: "Sync", text: "Signed in, changes upload to Supabase; other devices pull by seq." },
      { actor: "You", title: "Ask AI", text: "Stack AI answers with links back to your pages and notes." },
      { actor: "You", title: "Review", text: "Each morning, 3 due highlights come back on a spaced schedule." },
    ],
  },
  scancart: {
    caption: "One click on a listing, seven checks in parallel, one score the shopper can act on.",
    steps: [
      { actor: "Shopper", title: "Open", text: "Shopper opens a product listing on an Indian marketplace." },
      { actor: "Shopper", title: "Scan", text: "One click on the Chrome extension, or share the link to the Android app." },
      { actor: "ScanCart", title: "Extract", text: "The extension reads the listing from the product page." },
      { actor: "ScanCart", title: "7 checks", text: "Six agents run in parallel, then compliance uses seller + price." },
      { actor: "ScanCart", title: "Score", text: "Failed checks are dropped; the rest are weighted into one Trust Score." },
      { actor: "Shopper", title: "Decide", text: "Shopper sees the score, the reasons and \"X of 7 checks\"." },
    ],
  },
  streetwise: {
    caption: "From one message to a confirmed order. Every number the buyer sees comes from code, not the LLM.",
    steps: [
      { actor: "Buyer", title: "Ask", text: "Scans a shop's QR or chats in ASI:One: \"milk, bread and eggs\"." },
      { actor: "Agents", title: "List", text: "Shopper Agent turns the message, even Hinglish, into an item list." },
      { actor: "Agents", title: "Find", text: "Shop closed? Store Locator widens 500 m → 1 km → 2 km until 3 open shops." },
      { actor: "Agents", title: "Quote", text: "Each shop's own Merchant Agent quotes from its price list." },
      { actor: "Agents", title: "Check", text: "Trust Agent blocks hidden fees and wrong totals; builds cheapest, nearest, one-shop." },
      { actor: "Buyer", title: "Pick", text: "Buyer picks one of up to 3 checked options." },
      { actor: "Shop owner", title: "Confirm", text: "Owner taps YES; buyer gets a Verified Receipt, shop's agent pays 0.002 FET." },
    ],
  },
  orderly: {
    caption: "The buyer never leaves WhatsApp; the owner works from one app.",
    steps: [
      { actor: "Buyer", title: "Message", text: "Buyer messages the shop on WhatsApp; no app to install." },
      { actor: "Bot", title: "Answer", text: "Bot answers price and stock questions from the live catalogue." },
      { actor: "Buyer", title: "Order", text: "Buyer places the order (draft → pending payment → placed)." },
      { actor: "Owner", title: "Confirm", text: "Owner sees the order in the owner app and confirms it." },
      { actor: "Bot", title: "Relay", text: "Owner replies are relayed to the buyer on WhatsApp through the bot." },
      { actor: "Owner", title: "Ready", text: "Owner marks the order ready." },
      { actor: "Buyer", title: "Done", text: "Order completed." },
    ],
  },
};
