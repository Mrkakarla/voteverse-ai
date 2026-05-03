import { anthropic } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { messages, conversationId, language } = await req.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const systemPrompt = `You are Vira, a friendly AI civic education assistant for VoteVerse AI.
You help Indian citizens understand elections, voter registration, rights, and participation.
Respond in ${language === "hi" ? "Hindi" : "English"}.
Use simple non-partisan language and cite official sources when possible.`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: systemPrompt,
    messages: (messages || []).map((m: any) => ({ role: m.role, content: m.content })),
  });

  const assistantMessage = response.content[0]?.type === "text" ? response.content[0].text : "";

  if (conversationId) {
    await supabase.from("chat_messages").insert([
      { conversation_id: conversationId, role: "user", content: messages[messages.length - 1]?.content || "" },
      { conversation_id: conversationId, role: "assistant", content: assistantMessage },
    ]);
  }

  return Response.json({ message: assistantMessage });
}
