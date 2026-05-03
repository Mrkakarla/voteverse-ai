import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/server";

export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  const module = hasSupabaseEnv
    ? (await createClient().from("learning_modules").select("*").eq("id", params.moduleId).single()).data
    : null;
  const lessons = hasSupabaseEnv
    ? (await createClient().from("lessons").select("*").eq("module_id", params.moduleId).order("order_index")).data
    : [];
  const lessonItems = lessons as Array<{ id: string; title: string }>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{module?.title || "Module"}</h2>
      <p className="text-slate-600">{module?.description}</p>
      <div className="space-y-3">
        {lessonItems.map((l) => (
          <article key={l.id} className="card p-4">
            <h3 className="font-semibold">{l.title}</h3>
            <p className="mt-2 text-sm text-slate-600">Lesson content is loaded from JSON blocks.</p>
            <Link
              href={{ pathname: "/chatbot", query: { topic: `Help me understand this lesson: ${l.title}` } }}
              className="mt-3 inline-block rounded-lg border border-indigo-300 px-3 py-1.5 text-xs font-medium text-indigo-700"
            >
              Ask AI about this lesson
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
