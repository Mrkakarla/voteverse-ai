"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabaseReady = hasSupabaseEnv();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!supabaseReady) {
      toast.error("Connect Supabase to enable email/password login.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (error: any) {
      if (typeof error?.message === "string" && error.message.toLowerCase().includes("email not confirmed")) {
        toast.error("Email not confirmed. Check your inbox and confirm your account first.");
        return;
      }

      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    if (!supabaseReady) {
      toast.error("Connect Supabase and enable Google OAuth to continue with Google.");
      return;
    }

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/callback` },
    });
  };

  const onReset = async () => {
    if (!supabaseReady) {
      toast.error("Connect Supabase to use password reset.");
      return;
    }

    if (!email) return toast.error("Enter email first");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) return toast.error(error.message);
    toast.success("Reset email sent");
  };

  return (
    <form className="space-y-4" onSubmit={onLogin}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Any email" />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Any password" />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </Button>
      <Button type="button" className="w-full" variant="outline" onClick={onGoogle} disabled={!supabaseReady}>
        Continue with Google
      </Button>
      {process.env.NODE_ENV !== "production" && (
        <Link
          href="/api/dev/guest-access"
          className="block w-full rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-center text-sm font-medium text-amber-800"
        >
          Skip login (local guest mode)
        </Link>
      )}
      <button type="button" className="text-sm text-indigo-600" onClick={onReset} disabled={!supabaseReady}>
        Forgot password?
      </button>
      {!supabaseReady && <p className="text-xs text-center text-amber-600">Connect Supabase to enable login and Google OAuth.</p>}
      <p className="text-sm text-slate-600">No account? <Link className="text-indigo-600" href="/signup">Sign up</Link></p>
    </form>
  );
}
