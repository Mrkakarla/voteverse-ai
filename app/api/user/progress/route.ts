import { createClient } from "@/lib/supabase/server";
import { awardXP } from "@/lib/gamification";

export async function POST(req: Request) {
  const { action } = await req.json();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const result = await awardXP(user.id, action, supabase);
  return Response.json(result);
}
