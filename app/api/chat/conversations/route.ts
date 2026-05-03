import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("chat_conversations")
    .select("id, title, language, updated_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ conversations: data || [] });
}

export async function POST() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("chat_conversations")
    .insert({ user_id: user.id, title: "New Conversation", language: "en" })
    .select("id, title, language, updated_at")
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });

  return Response.json({ conversation: data });
}
