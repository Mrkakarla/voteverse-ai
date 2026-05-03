export const LEVELS = [
  { level: 1, name: "Civic Newcomer", minXP: 0, maxXP: 200 },
  { level: 2, name: "Voter Aware", minXP: 200, maxXP: 500 },
  { level: 3, name: "Democracy Defender", minXP: 500, maxXP: 1000 },
  { level: 4, name: "Civic Scholar", minXP: 1000, maxXP: 2000 },
  { level: 5, name: "Election Expert", minXP: 2000, maxXP: 4000 },
  { level: 6, name: "Democracy Champion", minXP: 4000, maxXP: Number.POSITIVE_INFINITY },
] as const;

export const XP_REWARDS = {
  first_login: 50,
  complete_lesson: 20,
  complete_module: 100,
  quiz_pass: 30,
  quiz_perfect: 50,
  simulator_step: 25,
  simulator_complete: 200,
  fake_news_check: 10,
  pledge_created: 75,
  pledge_shared: 50,
  daily_login: 15,
  streak_7: 200,
  streak_30: 500,
} as const;

export async function awardXP(userId: string, action: keyof typeof XP_REWARDS, supabase: any) {
  const xp = XP_REWARDS[action];
  const { data: profile } = await supabase
    .from("profiles")
    .select("xp_points, level")
    .eq("id", userId)
    .single();

  const newXP = (profile?.xp_points || 0) + xp;
  const newLevel = LEVELS.find((l) => newXP >= l.minXP && newXP < l.maxXP)?.level || 6;

  await supabase
    .from("profiles")
    .update({
      xp_points: newXP,
      level: newLevel,
      last_active_date: new Date().toISOString().split("T")[0],
    })
    .eq("id", userId);

  return { xp, newXP, leveledUp: newLevel > (profile?.level || 1) };
}

export async function checkAndAwardBadge(userId: string, trigger: string, supabase: any) {
  const { data: badge } = await supabase
    .from("badges")
    .select("id")
    .eq("trigger_condition", trigger)
    .single();

  if (!badge) return null;

  const { data: existing } = await supabase
    .from("user_badges")
    .select("id")
    .eq("user_id", userId)
    .eq("badge_id", badge.id)
    .single();

  if (existing) return null;

  await supabase.from("user_badges").insert({ user_id: userId, badge_id: badge.id });
  return badge;
}
