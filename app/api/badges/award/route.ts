import { createClient } from "@/lib/supabase/server";
import { checkAndAwardBadge } from "@/lib/gamification";

export async function POST(req: Request) {
  const { trigger } = await req.json();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const badge = await checkAndAwardBadge(user.id, trigger, supabase);
  return Response.json({ awarded: Boolean(badge), badge });
}
