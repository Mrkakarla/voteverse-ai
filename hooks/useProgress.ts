"use client";

import { useMemo } from "react";
import { useUser } from "@/hooks/useUser";

export function useProgress() {
  const { profile } = useUser();
  return useMemo(() => {
    const xp = profile?.xp_points || 0;
    const level = profile?.level || 1;
    const min = level === 1 ? 0 : (level - 1) * 200;
    const max = level * 200;
    const percent = Math.max(0, Math.min(100, ((xp - min) / (max - min)) * 100));
    return { xp, level, percent };
  }, [profile]);
}
