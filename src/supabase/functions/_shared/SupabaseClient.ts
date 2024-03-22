import {
    SupabaseClient,
    createClient,
} from 'https://esm.sh/@supabase/supabase-js@2.39.8';

export default function getClient(_req: Request): SupabaseClient {
    const authHeader = _req.headers.get('Authorization')!;

    return createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        { global: { headers: { Authorization: authHeader } } }
    );
}
