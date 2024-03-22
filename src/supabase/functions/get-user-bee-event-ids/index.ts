import { corsHeaders } from '../_shared/cors.ts';
import getClient from '../_shared/SupabaseClient.ts';
import { getCurrentUser } from '../_shared/User.ts';

Deno.serve(async (_req) => {
    try {
        const supabaseClient = getClient(_req);

        const user = await getCurrentUser(supabaseClient);

        const { data, error } = await supabaseClient
            .from('bee')
            .select('event_id')
            .eq('user_id', user.id);

        if (error) {
            throw error;
        }

        const eventIdsArray: string[] = [];

        data.map(({ event_id: eventId }) => {
            eventIdsArray.push(eventId);
        });

        return new Response(JSON.stringify(eventIdsArray), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (err) {
        return new Response(String(err?.message ?? err), {
            status: 500,
            headers: corsHeaders,
        });
    }
});
