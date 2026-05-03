"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/client";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    if (!hasSupabaseEnv) {
      toast.error("Supabase is not configured, so logout cannot complete.");
      return;
    }

    setLoading(true);
    const { error } = await createClient().auth.signOut();
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    window.location.href = "/login";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="card p-4">
        <p className="mb-3 text-sm text-slate-600">Manage your account and notification preferences.</p>
        <Button onClick={logout} disabled={loading}>{loading ? "Signing out..." : "Logout"}</Button>
      </div>
    </div>
  );
}
