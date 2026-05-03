"use client";

import { useApp } from "@/components/Providers";

export function useUser() {
  const { user, profile, loading, supabase } = useApp();
  return { user, profile, loading, supabase, isAuthenticated: Boolean(user) };
}
