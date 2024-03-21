import { SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';
import IDatabaseHandler from './IDatabaseHandler';
import SupabaseSchema from '../schemas/supabase.schema';

export default abstract class SupabaseHandler implements IDatabaseHandler
{
    protected supabaseUrl: string;
    protected supabaseKey: string;

    constructor()
    {
        if (
            process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined && 
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined
        ) {
            this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            this.supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        } else {
            throw new Error('Supabase environment variables are undefined, define them in local .env file');
        }
    }

    abstract getClient(options?: SupabaseClientOptions<SupabaseSchema>): SupabaseClient;
}