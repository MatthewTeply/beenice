import { SupabaseClient } from '@supabase/supabase-js';
import { Tables } from '../db/types/supabase.type';
import EventDto from '../dto/EventDto';
import UserDto from '../dto/UserDto';
import IRepository from './IRepository';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import UserRepository from './UserRepository';
import RepositoryNoResultsError from './RepositoryNoResultsError';
import EventTypeEnum from '../enums/EventTypeEnum';
import { getEventType } from '../services/EventTypeService';

const TABLE_EVENT = 'event';
const COLUMN_ID = 'id';
const COLUMN_USER_ID = 'user_id';
const FUNCTION_GET_RANDOM_EVENT = 'get-random-event';

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
            .returns<Tables<typeof TABLE_EVENT>[]>();

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
            .returns<Tables<typeof TABLE_EVENT>[]>();

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            throw new RepositoryNoResultsError(
                'No events found for user ID ' + user.id
            );
        }

        const events: EventDto[] = data.map((event) => {
            return eventToDto(event, user);
        });

        return events;
    }

    async getEventsForCurrentUser(): Promise<EventDto[]> {
        const userRepository = new UserRepository(this.dbHandler);

        const currentUser = await userRepository.getCurrentUser();

        return await this.getEventsForUser(currentUser);
    }

    async setEvent(description: string, type: EventTypeEnum): Promise<void> {
        const userRepository = new UserRepository(this.dbHandler);

        const user = await userRepository.getCurrentUser();

        const { error } = await this.client.from(TABLE_EVENT).insert({
            description,
            type,
            user_id: user.id,
        });

        if (error) {
            throw error;
        }
    }

    async getRandomEvent(): Promise<EventDto> {
        const { data, error } = await this.client.functions.invoke<
            Tables<typeof TABLE_EVENT>[]
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

export function eventToDto(
    event: Tables<typeof TABLE_EVENT>,
    user: UserDto
): EventDto {
    const createdAt = new Date(Date.parse(event.created_at));
    const eventTypeEnum =
        EventTypeEnum[event.type as keyof typeof EventTypeEnum];

    return {
        id: event.id,
        createdAt,
        description: event.description,
        isRelevant: event.is_relevant,
        type: getEventType(eventTypeEnum, user),
        user,
    };
}
