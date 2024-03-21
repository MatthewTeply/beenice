import { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';
import { CookieOptions, createServerClient } from '@supabase/ssr';
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
                    get(name: string): string|undefined
                    {
                        return cookieStore.get(name)?.value
                    },
                    set(name: string, value: string): void
                    {
                        cookieStore.set(name, value);
                    },
                    remove(name: string)
                    {
                        cookieStore.delete(name);
                    }
                }
            }
        );
    }
}

const serverDbHandler = new SupabaseDatabaseHandler();
export default serverDbHandler;