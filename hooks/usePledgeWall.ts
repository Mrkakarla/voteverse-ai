"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Pledge } from "@/types";

export function usePledgeWall() {
  const supabase = useMemo(() => createClient(), []);
  const [pledges, setPledges] = useState<Pledge[]>([]);

  useEffect(() => {
    supabase
      .from("pledges")
      .select("*, profiles(full_name, avatar_url)")
      .order("created_at", { ascending: false })
      .limit(50)
      .then((result: { data: Pledge[] | null }) => setPledges((result.data || []) as Pledge[]));

    const channel = supabase
      .channel("pledges")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "pledges" }, async () => {
        const { data } = await supabase
          .from("pledges")
          .select("*, profiles(full_name, avatar_url)")
          .order("created_at", { ascending: false })
          .limit(50);
        setPledges((data || []) as Pledge[]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return { pledges, setPledges };
}
