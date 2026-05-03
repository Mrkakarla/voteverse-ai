import { createClient } from "@/lib/supabase/server";
import { awardXP, checkAndAwardBadge } from "@/lib/gamification";

export async function POST(req: Request) {
  const { quizId, selectedOptionId, isCorrect } = await req.json();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: user.id,
    quiz_id: quizId,
    selected_option_id: selectedOptionId,
    is_correct: isCorrect,
  });

  if (error) return Response.json({ error: error.message }, { status: 500 });

  await awardXP(user.id, isCorrect ? "quiz_pass" : "complete_lesson", supabase);
  if (isCorrect) await checkAndAwardBadge(user.id, "quiz_perfect", supabase);

  return Response.json({ success: true });
}
