"use client";

import { usePledgeWall } from "@/hooks/usePledgeWall";

export function PledgeWall() {
  const { pledges } = usePledgeWall();

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-slate-600">Total pledges: {pledges.length}</div>
      <div className="grid gap-3 md:grid-cols-2">
        {pledges.map((p) => (
          <article key={p.id} className="card p-4">
            <p className="text-sm font-semibold">{p.profiles?.full_name || "Citizen"}</p>
            <p className="mt-1 text-sm text-slate-600">{p.pledge_text}</p>
            <p className="mt-2 text-xs text-slate-500">{new Date(p.created_at).toLocaleString()}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
