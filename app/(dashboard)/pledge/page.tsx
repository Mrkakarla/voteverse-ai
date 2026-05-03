import { PledgeForm } from "@/components/pledge/PledgeForm";
import { PledgeWall } from "@/components/pledge/PledgeWall";
import { hasSupabaseEnv } from "@/lib/supabase/client";

export default function PledgePage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div>
        <h2 className="mb-3 text-2xl font-bold">Make Your Pledge</h2>
        <PledgeForm />
      </div>
      <div>
        <h2 className="mb-3 text-2xl font-bold">Live Pledge Wall</h2>
        {hasSupabaseEnv ? <PledgeWall /> : <div className="card p-4 text-sm text-slate-600">Connect Supabase to view live pledges.</div>}
      </div>
    </div>
  );
}
