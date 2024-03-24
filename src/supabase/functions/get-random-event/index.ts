import { corsHeaders } from '../_shared/cors.ts';
import getClient from '../_shared/SupabaseClient.ts';
import { getCurrentUser } from '../_shared/User.ts';

Deno.serve(async (_req) => {
    try {
        if (_req.method === 'OPTIONS') {
            return new Response('ok', { headers: corsHeaders });
        }

        const supabaseClient = getClient(_req);
        const user = await getCurrentUser(supabaseClient);

        const { data: userAnsweredEventIds } =
            await supabaseClient.functions.invoke('get-user-bee-event-ids');

        const { count } = await supabaseClient
            .from('event')
            .select('*', { count: 'exact' })
            .neq('user_id', user.id)
            .not('id', 'in', `(${userAnsweredEventIds})`);

        if (count !== null) {
            const randomOffset = Math.floor(Math.random() * count);

            const { data, error } = await supabaseClient
                .from('event')
                .select('*')
                .neq('user_id', user.id)
                .not('id', 'in', `(${userAnsweredEventIds})`)
                .range(randomOffset, randomOffset);

            if (error) {
                throw error;
            }

            return new Response(JSON.stringify(data), {
                headers: {
                    ...{
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers':
                            'authorization, x-client-info, apikey, content-type',
                    },
                    'Content-Type': 'application/json',
                },
                status: 200,
            });
        }

        return new Response('Could not count events', {
            headers: corsHeaders,
            status: 500,
        });
    } catch (err) {
        return new Response(String(err!.message), {
            status: 500,
            headers: corsHeaders,
            statusText: String(err!.message),
        });
    }
});
