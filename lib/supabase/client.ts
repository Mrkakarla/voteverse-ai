import { createBrowserClient } from "@supabase/ssr";

export const hasSupabaseEnv = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

const missingSupabaseError = {
  message:
    "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable sign-in with Google or email/password.",
};

function createNoopQuery() {
  const query: any = {
    select() {
      return query;
    },
    eq() {
      return query;
    },
    order() {
      return query;
    },
    limit() {
      return query;
    },
    range() {
      return query;
    },
    single() {
      return Promise.resolve({ data: null, error: missingSupabaseError });
    },
    maybeSingle() {
      return Promise.resolve({ data: null, error: missingSupabaseError });
    },
    insert() {
      return Promise.resolve({ data: null, error: missingSupabaseError });
    },
    update() {
      return Promise.resolve({ data: null, error: missingSupabaseError });
    },
    upsert() {
      return Promise.resolve({ data: null, error: missingSupabaseError });
    },
    delete() {
      return Promise.resolve({ data: null, error: missingSupabaseError });
    },
    then(onFulfilled: any, onRejected: any) {
      return Promise.resolve({ data: [], error: null, count: 0 }).then(onFulfilled, onRejected);
    },
  };

  return query;
}

function createNoopClient() {
  const query = createNoopQuery();

  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      onAuthStateChange: (callback: any) => {
        callback("INITIAL_SESSION", { user: null });
        return { data: { subscription: { unsubscribe() {} } } };
      },
      signInWithPassword: async () => ({ data: null, error: missingSupabaseError }),
      signInWithOAuth: async () => ({ data: null, error: missingSupabaseError }),
      signUp: async () => ({ data: null, error: missingSupabaseError }),
      resetPasswordForEmail: async () => ({ data: null, error: missingSupabaseError }),
      signOut: async () => ({ error: null }),
    },
    from() {
      return query;
    },
    storage: {
      from() {
        return {
          upload: async () => ({ data: null, error: missingSupabaseError }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
          remove: async () => ({ data: null, error: missingSupabaseError }),
        };
      },
    },
  } as any;
}

export function createClient() {
  if (!hasSupabaseEnv) {
    return createNoopClient();
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
