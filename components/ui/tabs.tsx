"use client";

import { useState } from "react";

export function Tabs({
  defaultValue,
  values,
  children,
}: {
  defaultValue: string;
  values: string[];
  children: (active: string, setActive: (v: string) => void) => React.ReactNode;
}) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div>
      <div className="mb-4 flex gap-2">
        {values.map((v) => (
          <button
            key={v}
            className={`rounded-lg px-3 py-1.5 text-sm ${active === v ? "bg-indigo-600 text-white" : "bg-white border"}`}
            onClick={() => setActive(v)}
          >
            {v}
          </button>
        ))}
      </div>
      {children(active, setActive)}
    </div>
  );
}
