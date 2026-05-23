export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

const DEFAULT_SUPABASE_CONFIG: SupabaseConfig = {
  url: "https://qdygvfdzcenjzqdlejnz.supabase.co",
  anonKey: "sb_publishable_raB68l2bzRXmsUWvVf9umQ_FXaNnJ3J",
};

type SupabaseWindow = Window & {
  __VOTEVERSE_SUPABASE__?: SupabaseConfig;
};

function getServerSupabaseConfig(): SupabaseConfig {
  return {
    url:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      process.env.SUPABASE_URL ||
      DEFAULT_SUPABASE_CONFIG.url,
    anonKey:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      DEFAULT_SUPABASE_CONFIG.anonKey,
  };
}

export function getSupabaseConfig(): SupabaseConfig {
  if (typeof window !== "undefined") {
    const browserWindow = window as SupabaseWindow;
    if (browserWindow.__VOTEVERSE_SUPABASE__) {
      return browserWindow.__VOTEVERSE_SUPABASE__;
    }
  }

  return getServerSupabaseConfig();
}

export function hasSupabaseConfig() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
}