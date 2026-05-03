import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const conversationId = url.searchParams.get("conversationId");
  if (!conversationId) return Response.json({ error: "Missing conversationId" }, { status: 400 });

  const supabase = createClient();
  const { data, error } = await supabase
    .from("chat_messages")
    .select("id, role, content, sources, created_at")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
    .limit(200);

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ messages: data || [] });
}
