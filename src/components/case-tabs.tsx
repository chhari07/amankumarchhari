"use client";

import { useSyncExternalStore } from "react";
import { LuFileText, LuNetwork } from "react-icons/lu";

const tabs = [
  { id: "text", label: "Write-up", icon: LuFileText },
  { id: "diagrams", label: "Diagrams", icon: LuNetwork },
] as const;

// The active view lives in the URL hash, so /work/closeby#diagrams is shareable.
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const getHash = () => window.location.hash;

/** Switch between the written case study and its diagrams. */
export function CaseTabs({ text, diagrams, count }: { text: React.ReactNode; diagrams: React.ReactNode; count: number }) {
  const hash = useSyncExternalStore(subscribe, getHash, () => "");
  const view = hash === "#diagrams" ? "diagrams" : "text";

  const select = (id: (typeof tabs)[number]["id"]) => {
    history.replaceState(null, "", id === "diagrams" ? "#diagrams" : window.location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <div>
      <div role="tablist" aria-label="Case study view" className="sticky top-14 z-10 flex flex-wrap items-center gap-2 border-b border-line bg-bg/90 py-3 backdrop-blur">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={view === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => select(t.id)}
            className={`term-btn cursor-pointer ${view === t.id ? "term-btn-solid" : ""}`}
          >
            <t.icon aria-hidden /> {t.label}
            {t.id === "diagrams" && <span className={view === t.id ? "text-dim" : "text-muted"}>({count})</span>}
          </button>
        ))}
      </div>
      <div id="panel-text" role="tabpanel" hidden={view !== "text"}>{text}</div>
      <div id="panel-diagrams" role="tabpanel" hidden={view !== "diagrams"}>{diagrams}</div>
    </div>
  );
}
