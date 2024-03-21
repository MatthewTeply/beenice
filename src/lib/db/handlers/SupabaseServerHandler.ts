import { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import SupabaseSchema from '../schemas/supabase.schema';
import { cookies } from 'next/headers';
import SupabaseHandler from './SupabaseHandler';

class SupabaseDatabaseHandler extends SupabaseHandler {
    getClient(options?: SupabaseClientOptions<SupabaseSchema.PUBLIC>): SupabaseClient
    {
        const cookieStore = cookies();

        return createServerClient(
            this.supabaseUrl, 
            this.supabaseKey, 
            {
                ...options,
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                }
            }
        );
    }
}

const dbHandler = new SupabaseDatabaseHandler();
export default dbHandler;