import { SupabaseClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';
import SupabaseHandler from './SupabaseHandler';

class SupabaseDatabaseHandler extends SupabaseHandler {
    getClient(): SupabaseClient {
        return createBrowserClient(this.supabaseUrl, this.supabaseKey);
    }
}

const clientDbHandler = new SupabaseDatabaseHandler();
export default clientDbHandler;
