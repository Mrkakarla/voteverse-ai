"use client";

import { useState } from "react";

const candidates = ["Aditi Rao", "Rahul Sen", "Nisha Iyer", "Vikram Das"];

export function EVMInteraction() {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {candidates.map((c, i) => (
        <button key={c} className="flex w-full items-center justify-between rounded-xl border p-3" onClick={() => setPicked(c)}>
          <span>{c}</span>
          <span className="h-4 w-4 rounded-full" style={{ background: ["#ef4444", "#22c55e", "#3b82f6", "#f59e0b"][i] }} />
        </button>
      ))}
      {picked && <p className="rounded-lg bg-green-100 p-2 text-sm text-green-700">Your vote for {picked} has been recorded.</p>}
    </div>
  );
}
