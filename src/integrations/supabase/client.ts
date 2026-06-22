// Supabase browser client.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// IMPORTANT: createClient() THROWS if the URL/key are missing, which would crash
// the whole app at startup (a blank white screen) — even pages that don't use the
// database. That happens when the host (e.g. Vercel) was deployed without the
// VITE_SUPABASE_* env vars. To avoid the white screen we fall back to harmless
// placeholders so the app still mounts; only auth/data calls will fail until the
// env vars are configured. Set them in Vercel → Settings → Environment Variables.
if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
  // eslint-disable-next-line no-console
  console.error(
    "[supabase] Missing VITE_SUPABASE_URL and/or VITE_SUPABASE_PUBLISHABLE_KEY. " +
      "Set them in your hosting environment variables (e.g. Vercel → Settings → " +
      "Environment Variables) and redeploy. Sign-in and data features won't work until then.",
  );
}

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_PUBLISHABLE_KEY || "placeholder-publishable-key",
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  },
);
