import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.39.8"
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (_req) => {
  try {
    const supabase: SupabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: _req.headers.get('Authorization')! } } }
    )

    const event_id = (new URL(_req.url)).searchParams.get('event_id');

    const { data, error } = await supabase
      .from('event')
      .select('*')
      .eq('id', event_id);

    if (error) {
      throw error
    }

    return new Response(JSON.stringify({ data }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 })
  }
})