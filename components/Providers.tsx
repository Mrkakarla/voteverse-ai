"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient, hasSupabaseEnv } from "@/lib/supabase/client";
import type { Profile } from "@/types";

type AppContextType = {
  user: User | null;
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
  loading: boolean;
  supabase: ReturnType<typeof createClient>;
};

const AppContext = createContext<AppContextType | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasSupabaseEnv) {
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          try {
            const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
            setProfile(data as Profile);
          } catch {
            setProfile(null);
          }
        }
      } catch {
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    try {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event: string, session: { user: User | null } | null) => {
        const nextUser = session?.user || null;
        setUser(nextUser);
        if (nextUser) {
          try {
            const { data } = await supabase.from("profiles").select("*").eq("id", nextUser.id).single();
            setProfile(data as Profile);
          } catch (err) {
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    } catch {
    }
  }, [supabase]);

  return (
    <AppContext.Provider value={{ user, profile, setProfile, loading, supabase }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside Providers");
  return ctx;
}
