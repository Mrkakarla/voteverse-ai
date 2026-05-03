"use client";

import { Bell, Flame } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { Avatar } from "@/components/ui/avatar";

export function TopNav() {
  const { profile } = useUser();
  return (
    <header className="flex items-center justify-between border-b bg-white p-4">
      <div>
        <h1 className="text-lg font-bold">Welcome back</h1>
        <p className="text-sm text-slate-500">{profile?.full_name || "Citizen"}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">XP {profile?.xp_points || 0}</div>
        <div className="flex items-center gap-1 rounded-lg bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700"><Flame className="h-4 w-4" /> {profile?.streak_days || 0}</div>
        <button className="relative rounded-lg p-2 hover:bg-slate-100"><Bell className="h-5 w-5" /><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" /></button>
        <Avatar src={profile?.avatar_url} alt={profile?.full_name || "User"} />
      </div>
    </header>
  );
}
