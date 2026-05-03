export function BadgeCard({ name, earned }: { name: string; earned: boolean }) {
  return <div className={`rounded-xl border p-3 text-sm ${earned ? "bg-indigo-50" : "bg-slate-50 grayscale"}`}>{name}</div>;
}
