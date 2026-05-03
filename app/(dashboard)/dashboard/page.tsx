import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ElectionCountdown } from "@/components/dashboard/ElectionCountdown";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { DeadlineAlert } from "@/components/dashboard/DeadlineAlert";
import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { StreakCounter } from "@/components/gamification/StreakCounter";
import { VoterStatusCard } from "@/components/dashboard/VoterStatusCard";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = hasSupabaseEnv ? createClient() : null;
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const profile = user ? (await supabase!.from("profiles").select("*").eq("id", user.id).single()).data : null;
  const count = supabase ? (await supabase.from("pledges").select("*", { count: "exact", head: true })).count : 0;
  const { data: modules } = supabase ? await supabase.from("learning_modules").select("id, title, description").order("order_index") : { data: [] };
  const recommended = modules?.[0] || null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-2xl font-bold">Welcome, {profile?.full_name || "Citizen"}</h2>
        <VoterStatusCard status={profile?.voter_status || "unknown"} />
        <ElectionCountdown />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card><CardContent><CardTitle>Progress</CardTitle><div className="mt-4"><ProgressRing value={Math.min(100, ((profile?.xp_points || 0) % 200) / 2)} /></div><p className="mt-3 text-sm">Level {profile?.level || 1} • XP {profile?.xp_points || 0}</p></CardContent></Card>
        <Card><CardContent><CardTitle>Deadlines</CardTitle><div className="mt-4"><DeadlineAlert /></div></CardContent></Card>
        <Card><CardContent><CardTitle>Community</CardTitle><p className="mt-3 text-sm">Total public pledges: {count || 0}</p><div className="mt-3"><StreakCounter days={profile?.streak_days || 0} /></div></CardContent></Card>
      </div>

      <Card><CardContent><CardTitle>Quick Actions</CardTitle><div className="mt-3"><QuickActions /></div></CardContent></Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardContent><CardTitle>Recommended Next Module</CardTitle><p className="mt-3 text-sm font-semibold">{recommended?.title || "Start with your first module"}</p><p className="mt-1 text-sm text-slate-600">{recommended?.description || "Open Learn to continue building your civic literacy."}</p></CardContent></Card>
        <Card><CardContent><CardTitle>Recent Activity</CardTitle><ul className="mt-3 space-y-2 text-sm text-slate-600"><li>Joined VoteVerse AI</li><li>Viewed dashboard</li><li>Explored civic learning modules</li></ul></CardContent></Card>
      </div>
    </div>
  );
}
