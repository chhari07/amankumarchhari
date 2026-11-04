"use client";

import { useState } from "react";

// Terminal-style install command with a copy button.
export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="cmd">
      <code>
        <span className="mute">$ </span>
        {command}
      </code>
      <button type="button" onClick={copy} className="label" aria-live="polite">
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
