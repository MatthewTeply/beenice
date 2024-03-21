import { SupabaseClient } from '@supabase/supabase-js';
import dbHandler from '../db/handlers/SupabaseServerHandler';
import { Tables } from '../db/types/supabase.type';
import EventDto from '../dto/EventDto';
import UserDto from '../dto/UserDto';
import EventTypeEnum from '../enums/EventTypeEnum';
import IRepository from './IRepository';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import UserRepository from './UserRepository';

const TABLE_EVENT = 'event';
const COLUMN_ID = 'id';
const COLUMN_UID = 'uid';

export default class EventRepository implements IRepository
{
    client: SupabaseClient;
    dbHandler: SupabaseHandler;

    constructor(dbHandler: SupabaseHandler)
    {
        this.dbHandler = dbHandler;
        this.client = dbHandler.getClient();
    }

    async getEvent(id: string): Promise<EventDto>
    {
        const { data, error } = await dbHandler.getClient()
            .from(TABLE_EVENT)
            .select('*')
            .eq(COLUMN_ID, id)
            .returns<Tables<'event'>[]>();
    
        if (error) {
            throw error;
        }
    
        if (data === null || data.length === 0) {
            throw new Error('Could not retreive event with id ' + id);
        }
    
        const userRepository = new UserRepository(this.dbHandler);
        const user = await userRepository.getUser(data[0].uid);
    
        return this.eventToDto(data[0], user);
    }
    
    async getEventsForUser(user: UserDto): Promise<EventDto[]>
    {
        const { data, error } = await dbHandler.getClient()
            .from(TABLE_EVENT)
            .select('*')
            .eq(COLUMN_UID, user.id)
            .returns<Tables<'event'>[]>();
    
        if (error) {
            throw error;
        }
    
        if (data === null || data.length === 0) {
            throw new Error('Could not retreive events for user ' + user.username);
        }
    
        const events: EventDto[] = [];
    
        data.map(event => {
            events.push(this.eventToDto(event, user));
        });
    
        return events;
    }
    
    private eventToDto(event: Tables<'event'>, user: UserDto): EventDto
    {
        const createdAt = new Date(Date.parse(event.created_at));
    
        return {
            id: event.id,
            createdAt,
            description: event.description,
            isRelevant: event.is_relevant,
            type: EventTypeEnum[event.type as keyof typeof EventTypeEnum],
            user
        }
    }
}
