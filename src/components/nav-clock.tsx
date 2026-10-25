"use client";

import { useSyncExternalStore } from "react";

// Live clock in Aman's time zone, like the right end of the macOS menu bar.
const fmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

const subscribe = (cb: () => void) => {
  const t = setInterval(cb, 1000);
  return () => clearInterval(t);
};
// "Mon 26 Oct 12:41 AM"; minute precision, so the snapshot only changes once a minute.
const getTime = () => fmt.format(new Date()).replace(/,/g, "").replace(/\b(am|pm)\b/i, (m) => m.toUpperCase());

export function NavClock() {
  const time = useSyncExternalStore(subscribe, getTime, () => "");
  return (
    <span className="tabular-nums">
      {time && <>{time} <span className="text-black/50">IST</span></>}
    </span>
  );
}
