import {
    SupabaseClient,
    User,
} from 'https://esm.sh/v135/@supabase/supabase-js@2.39.8/dist/module/index.js';

export async function getCurrentUser(
    supabaseClient: SupabaseClient
): Promise<User> {
    const { data: authData, error: authError } =
        await supabaseClient.auth.getUser();

    if (authError) {
        throw authError;
    }

    if (authData === null) {
        throw Error('Could not get user');
    }

    return authData.user;
}
