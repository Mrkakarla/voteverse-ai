import { anthropic } from "@/lib/anthropic";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { text, url } = await req.json();

  const prompt = `Analyze this election-related claim for accuracy. Return ONLY valid JSON.\n\nClaim to analyze: "${text}"\n${url ? `Source URL: ${url}` : ""}\n\nReturn this exact JSON structure:\n{\n  "credibility_score": <0-100 integer>,\n  "verdict": "<true|false|misleading|unverified>",\n  "explanation": "<2-3 sentence plain English explanation>",\n  "red_flags": ["<flag1>", "<flag2>"],\n  "sources": [{"title": "<source name>", "url": "<url>"}]\n}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  const textContent = response.content[0]?.type === "text" ? response.content[0].text : "{}";

  try {
    const result = JSON.parse(textContent);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("fact_check_results").insert({
        user_id: user.id,
        input_text: text,
        input_url: url,
        credibility_score: result.credibility_score,
        verdict: result.verdict,
        explanation: result.explanation,
        sources: result.sources,
      });
    }

    return Response.json(result);
  } catch {
    return Response.json({ error: "Analysis failed" }, { status: 500 });
  }
}
