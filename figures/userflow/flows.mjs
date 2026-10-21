// User journeys for the isometric user-flow figures, one per case study.
// Lanes run front (first) to back; every step text comes from src/content/projects.ts.
export const FLOWS = {
  stack: {
    title: "Stack user flow",
    lanes: ["You", "Stack"],
    steps: [
      { lane: 0, name: "Save", note: "Save an article, PDF or link, or Share to Stack from any app" },
      { lane: 1, name: "Clean", note: "Reader mode cleans the page (Readability + DOMPurify)" },
      { lane: 0, name: "Highlight", note: "Select any line to make a highlight or a note" },
      { lane: 1, name: "Store", note: "Every write lands in IndexedDB first, so it works offline" },
      { lane: 1, name: "Sync", note: "Signed in, changes upload to Supabase; other devices pull by seq" },
      { lane: 0, name: "Ask AI", note: "Stack AI answers with links back to your pages and notes" },
      { lane: 0, name: "Review", note: "Each morning, 3 due highlights come back on a spaced schedule" },
    ],
    caption:
      "A reader's path through Stack. Front lane: what you do; back lane: what the app does for you. Saving, reading and highlighting all work offline; sign-in only adds sync, and the daily review brings old highlights back.",
  },
  closeby: {
    title: "CloseBy user flow",
    lanes: ["Buyer", "Shop owner"],
    steps: [
      { lane: 1, name: "Import", note: "Owner uploads a shelf photo or a voice list of stock" },
      { lane: 1, name: "Approve", note: "AI returns a draft catalogue; nothing is saved until the owner approves" },
      { lane: 0, name: "Browse", note: "Buyer sees what shops nearby have in stock" },
      { lane: 0, name: "Pay", note: "Razorpay checkout; stock is held until payment is confirmed" },
      { lane: 1, name: "Accept", note: "Owner accepts, or rejects and the payment is refunded automatically" },
      { lane: 1, name: "Prepare", note: "Order moves Preparing → Ready, enforced by server actions" },
      { lane: 0, name: "Done", note: "Order completed" },
    ],
    caption:
      "Two people, one order. The shop owner fills the catalogue with AI drafts they approve; the buyer browses nearby stock and pays; the owner drives the order to done. Unpaid orders cancel after 15 minutes and release their stock.",
  },
  scancart: {
    title: "ScanCart user flow",
    lanes: ["Shopper", "ScanCart"],
    steps: [
      { lane: 0, name: "Open", note: "Shopper opens a product listing on an Indian marketplace" },
      { lane: 0, name: "Scan", note: "One click on the ScanCart Chrome extension" },
      { lane: 1, name: "Extract", note: "The extension reads the listing from the product page" },
      { lane: 1, name: "7 checks", note: "Six agents run in parallel, then compliance uses seller + price" },
      { lane: 1, name: "Score", note: "Failed checks are dropped; the rest are weighted into one Trust Score" },
      { lane: 0, name: "Decide", note: "Shopper sees the score, the reasons and \"X of 7 checks\"" },
    ],
    caption:
      "From a product page to a buy-or-skip decision. The shopper clicks once; ScanCart extracts the listing, runs seven checks and returns one Trust Score with the reasons behind it.",
  },
  orderly: {
    title: "Orderly user flow",
    lanes: ["Buyer", "Bot", "Owner"],
    steps: [
      { lane: 0, name: "Message", note: "Buyer messages the shop on WhatsApp; no app to install" },
      { lane: 1, name: "Answer", note: "Bot answers price and stock questions from the live catalogue" },
      { lane: 0, name: "Order", note: "Buyer places the order (draft → pending payment → placed)" },
      { lane: 2, name: "Confirm", note: "Owner sees the order in the owner app and confirms it" },
      { lane: 1, name: "Relay", note: "Owner replies are relayed to the buyer on WhatsApp through the bot" },
      { lane: 2, name: "Ready", note: "Owner marks the order ready" },
      { lane: 0, name: "Done", note: "Order completed" },
    ],
    caption:
      "A WhatsApp order from first message to done. The buyer only ever uses WhatsApp; the bot answers from the live catalogue and relays the owner's replies; the owner drives every order state from the owner app.",
  },
};
