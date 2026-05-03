import { Flame } from "lucide-react";

export function StreakCounter({ days }: { days: number }) {
  return <div className="flex items-center gap-2 rounded-xl bg-orange-50 px-3 py-2 text-orange-700"><Flame className="h-4 w-4" /> {days} day streak</div>;
}
