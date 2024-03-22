import { SupabaseClient } from '@supabase/supabase-js';
import { Tables } from '../db/types/supabase.type';
import EventDto from '../dto/EventDto';
import UserDto from '../dto/UserDto';
import EventTypeEnum from '../enums/EventTypeEnum';
import IRepository from './IRepository';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import UserRepository from './UserRepository';
import RepositoryNoResultsError from './RepositoryNoResultsError';

const TABLE_EVENT = 'event';
const COLUMN_ID = 'id';
const COLUMN_USER_ID = 'user_id';
const FUNCTION_GET_RANDOM_EVENT = 'get-random-event';

type EventJoined = Tables<'event'> & { user: Tables<'profile'> };

export default class EventRepository implements IRepository {
    client: SupabaseClient;
    dbHandler: SupabaseHandler;

    constructor(dbHandler: SupabaseHandler) {
        this.dbHandler = dbHandler;
        this.client = dbHandler.getClient();
    }

    async getEvent(id: string): Promise<EventDto> {
        const { data, error } = await this.dbHandler
            .getClient()
            .from(TABLE_EVENT)
            .select('*')
            .eq(COLUMN_ID, id)
            .returns<Tables<'event'>[]>();

        if (error) {
            throw error;
        }

        if (data === null) {
            throw new RepositoryNoResultsError('No events with ID ' + id);
        }

        const userRepository = new UserRepository(this.dbHandler);
        const user = await userRepository.getUser(data[0].user_id);

        return eventToDto(data[0], user);
    }

    async getEventsForUser(user: UserDto): Promise<EventDto[]> {
        const { data, error } = await this.dbHandler
            .getClient()
            .from(TABLE_EVENT)
            .select('*')
            .eq(COLUMN_USER_ID, user.id)
            .returns<Tables<'event'>[]>();

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            throw new RepositoryNoResultsError(
                'No events found for user ID ' + user.id
            );
        }

        const events: EventDto[] = [];

        data.map((event) => {
            events.push(eventToDto(event, user));
        });

        return events;
    }

    async getRandomEvent(): Promise<EventDto> {
        const { data, error } = await this.client.functions.invoke<
            Tables<'event'>[]
        >(FUNCTION_GET_RANDOM_EVENT);

        if (error) {
            throw error;
        }

        if (data === null || data.length === 0) {
            throw new RepositoryNoResultsError('No random event was found');
        }

        const userRepository = new UserRepository(this.dbHandler);
        const user = await userRepository.getUser(data[0].user_id);

        return eventToDto(data[0], user);
    }
}

export function eventToDto(event: Tables<'event'>, user: UserDto): EventDto {
    const createdAt = new Date(Date.parse(event.created_at));

    return {
        id: event.id,
        createdAt,
        description: event.description,
        isRelevant: event.is_relevant,
        type: EventTypeEnum[event.type as keyof typeof EventTypeEnum],
        user,
    };
}
