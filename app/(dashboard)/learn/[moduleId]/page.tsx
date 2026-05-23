import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { hasSupabaseEnv } from "@/lib/supabase/server";
import { FALLBACK_LEARNING_MODULES, FALLBACK_LESSONS } from "@/lib/learning";

export const dynamic = "force-dynamic";

export default async function ModulePage({ params }: { params: { moduleId: string } }) {
  let module: { id: string; title: string; description: string | null } | null = null;
  let lessons: Array<{ id: string; title: string }> = [];

  if (hasSupabaseEnv()) {
    try {
      module = (await createClient().from("learning_modules").select("*").eq("id", params.moduleId).single()).data;
    } catch {
      module = null;
    }

    try {
      const { data } = await createClient().from("lessons").select("*").eq("module_id", params.moduleId).order("order_index");
      lessons = data ?? [];
    } catch {
      lessons = [];
    }
  }

  const fallbackModule = FALLBACK_LEARNING_MODULES.find((item) => item.id === params.moduleId) ?? null;
  const fallbackLessons = FALLBACK_LESSONS[params.moduleId] ?? [];
  const visibleModule = module ?? fallbackModule;
  const visibleLessons = lessons.length > 0 ? lessons : fallbackLessons;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{visibleModule?.title || "Module"}</h2>
      <p className="text-slate-600">{visibleModule?.description}</p>
      <div className="space-y-3">
        {visibleLessons.map((l) => (
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
