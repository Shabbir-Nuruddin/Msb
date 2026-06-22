import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// keep-alive — a tiny health endpoint that performs a REAL database read so the
// Supabase free tier doesn't pause the project. Free projects pause after ~7 days
// of *database* inactivity (dashboard visits don't count), so an external cron
// (see .github/workflows/keep-alive.yml) hits this once a day to keep the DB warm.
//
// Deployed with verify_jwt = false (see supabase/config.toml) so the scheduler can
// call it without a user session. It only does a harmless `select id limit 1`.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  let dbOk = false;
  try {
    if (url && serviceKey) {
      // A trivial query against PostgREST -> Postgres. This is what counts as
      // database activity and resets the inactivity timer.
      const res = await fetch(`${url}/rest/v1/profiles?select=id&limit=1`, {
        headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
      });
      dbOk = res.ok;
      // Drain the body so the request fully completes.
      await res.text();
    }
  } catch (_e) {
    dbOk = false;
  }

  return new Response(
    JSON.stringify({ ok: true, db: dbOk, ts: new Date().toISOString(), service: "msb-keep-alive" }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
