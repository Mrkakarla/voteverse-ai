"use client";

import { useEffect, useMemo, useState } from "react";

export function ElectionCountdown() {
  const target = useMemo(() => new Date("2026-11-20T07:00:00Z"), []);
  const [left, setLeft] = useState("...");
  useEffect(() => {
    const i = setInterval(() => {
      const ms = Math.max(0, target.getTime() - Date.now());
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      setLeft(`${d}d ${h}h`);
    }, 1000);
    return () => clearInterval(i);
  }, [target]);
  return <div className="rounded-xl bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">Next election in {left}</div>;
}
