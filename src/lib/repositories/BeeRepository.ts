import { SupabaseClient } from '@supabase/supabase-js';
import dbHandler from '../db/handlers/SupabaseServerHandler';
import { Tables } from '../db/types/supabase.type';
import BeeDto from '../dto/BeeDto';
import IRepository from './IRepository';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import EventRepository from './EventRepository';
import UserRepository from './UserRepository';

export default class BeeRepository implements IRepository
{
    client: SupabaseClient;
    dbHandler: SupabaseHandler;

    constructor(dbHandler: SupabaseHandler)
    {
        this.client = dbHandler.getClient();
        this.dbHandler = dbHandler;
    }

    async getBee(id: string): Promise<BeeDto>
    {
        let { data, error } = await dbHandler.getClient()
            .from('bee')
            .select('id')
            .eq('id', id)
            .returns<Tables<'bee'>[]>();
    
        if (error) {
            throw error;
        }
    
        if (data === null || data.length === 0) {
            throw new Error('Could not retreive bee with id ' + id);
        }
    
        const createdAt = new Date(Date.parse(data[0].created_at));

        const eventRepository = new EventRepository(this.dbHandler);
        const userRepository = new UserRepository(this.dbHandler);

        const event = await eventRepository.getEvent(data[0].event_id);
        const user = await userRepository.getUser(data[0].uid);
    
        return {
            id: data[0].id,
            createdAt,
            description: data[0].description,
            event,
            user
        }
    }
}
