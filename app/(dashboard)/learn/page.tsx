import Link from "next/link";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/server";

export default async function LearnPage() {
  const modules = hasSupabaseEnv
    ? (await createClient().from("learning_modules").select("*").order("order_index")).data
    : [];
  const moduleItems = modules as Array<{ id: string; title: string; description: string | null }>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Learning Modules</h2>
      <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <p className="font-semibold">Need help understanding a topic?</p>
          <p className="text-sm text-slate-600">Open Vira AI and ask questions while you study.</p>
        </div>
        <Link href={{ pathname: "/chatbot", query: { topic: "Teach me the basics of voting in simple steps." } }} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
          Ask AI Help Bot
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {moduleItems.map((m) => (
          <Link key={m.id} href={`/learn/${m.id}`} className="card p-4">
            <p className="text-lg font-semibold">{m.title}</p>
            <p className="mt-1 text-sm text-slate-600">{m.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
