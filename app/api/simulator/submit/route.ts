import { createClient } from "@/lib/supabase/server";
import { awardXP, checkAndAwardBadge } from "@/lib/gamification";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("simulation_sessions")
    .insert({
      user_id: user.id,
      completion_percentage: body.completion_percentage || 100,
      steps_completed: body.steps_completed || [],
      completed_at: new Date().toISOString(),
      mock_vote_data: body.mock_vote_data || {},
      xp_earned: 200,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  await awardXP(user.id, "simulator_complete", supabase);
  await checkAndAwardBadge(user.id, "simulator_complete", supabase);

  return Response.json({ success: true, session: data });
}
