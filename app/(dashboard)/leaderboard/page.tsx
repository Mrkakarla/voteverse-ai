import { createClient } from "@/lib/supabase/server";

export default async function LeaderboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = user ? await supabase.from("profiles").select("state, district").eq("id", user.id).single() : { data: null };
  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, xp_points, level, streak_days, state, district")
    .order("xp_points", { ascending: false })
    .limit(50);

  const national = (data || []) as Array<{
    id: string;
    full_name: string | null;
    xp_points: number | null;
    level: number | null;
    streak_days: number | null;
    state: string | null;
    district: string | null;
  }>;
  const stateView = profile?.state ? national.filter((p) => p.state === profile.state) : national;
  const districtView = profile?.district ? national.filter((p) => p.district === profile.district) : national;
  const views: Record<string, typeof national> = { National: national, "Your State": stateView, "Your District": districtView };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <div className="grid gap-4">
        {Object.entries(views).map(([label, rows]) => (
          <section key={label} className="card overflow-hidden">
            <div className="border-b border-slate-200 px-4 py-3">
              <h3 className="font-semibold">{label}</h3>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3">Rank</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">XP</th>
                  <th className="p-3">Streak</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p, i) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{p.full_name || "Citizen"}</td>
                    <td className="p-3">{p.level}</td>
                    <td className="p-3">{p.xp_points}</td>
                    <td className="p-3">{p.streak_days}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </div>
  );
}
