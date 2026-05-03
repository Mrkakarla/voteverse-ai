import { createClient } from "@/lib/supabase/server";
import { awardXP, checkAndAwardBadge } from "@/lib/gamification";

export async function GET() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("pledges")
    .select("*, profiles(full_name, avatar_url)")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ pledges: data });
}

export async function POST(req: Request) {
  const { pledgeText, isPublic } = await req.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("pledges")
    .insert({ user_id: user.id, pledge_text: pledgeText, is_public: isPublic })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  await awardXP(user.id, "pledge_created", supabase);
  await checkAndAwardBadge(user.id, "pledge_created", supabase);

  return Response.json({ success: true, pledge: data });
}
