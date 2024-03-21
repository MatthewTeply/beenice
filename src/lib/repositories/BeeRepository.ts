import { SupabaseClient } from '@supabase/supabase-js';
import serverDbHandler from '../db/handlers/SupabaseServerHandler';
import { Tables } from '../db/types/supabase.type';
import BeeDto from '../dto/BeeDto';
import IRepository from './IRepository';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import EventRepository from './EventRepository';
import UserRepository from './UserRepository';
import { RepositoryError, RepositoryErrorName } from './RepositoryError';

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
        let { data, error } = await serverDbHandler.getClient()
            .from('bee')
            .select('id')
            .eq('id', id)
            .returns<Tables<'bee'>[]>();
    
        if (error) {
            throw error;
        }
    
        if (data === null) {
            throw new RepositoryError({
                name: RepositoryErrorName.NO_RESULTS,
                message: 'No bee found with ID ' + id
            });
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
