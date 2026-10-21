"use client";

import { useEffect, useRef, useState } from "react";

// An interactive Anatomy figure (a standalone page in /public/figures) in a
// frame that grows to the height the page reports.
export function AnatomyFrame({ src, title }: { src: string; title: string }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(560);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== frame.current?.contentWindow) return;
      const h = Number(event.data?.anatomyHeight);
      if (h > 0) setHeight(h);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={frame}
      src={src}
      title={title}
      loading="lazy"
      style={{ height }}
      className="block w-full border-0 bg-transparent"
    />
  );
}
