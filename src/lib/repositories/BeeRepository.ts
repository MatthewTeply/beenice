import { SupabaseClient } from '@supabase/supabase-js';
import { Tables } from '../db/types/supabase.type';
import BeeDto from '../dto/BeeDto';
import IRepository from './IRepository';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import EventRepository, { eventToDto } from './EventRepository';
import UserRepository, { userToDto } from './UserRepository';
import RepositoryNoResultsError from './RepositoryNoResultsError';
import UserDto from '../dto/UserDto';
import EventDto from '../dto/EventDto';

const TABLE_BEE = 'bee';

type BeeJoined = Tables<typeof TABLE_BEE> & {
    event: Tables<'event'>;
    profile?: Tables<'profile'>;
};

export default class BeeRepository implements IRepository {
    client: SupabaseClient;
    dbHandler: SupabaseHandler;

    constructor(dbHandler: SupabaseHandler) {
        this.client = dbHandler.getClient();
        this.dbHandler = dbHandler;
    }

    async getBee(id: string): Promise<BeeDto> {
        let { data, error } = await this.dbHandler
            .getClient()
            .from(TABLE_BEE)
            .select(
                `
                *,
                profile:user_id (*),
                event:event_id (*)
            `
            )
            .eq('id', id)
            .returns<BeeJoined>();

        if (error) {
            throw error;
        }

        if (data === null) {
            throw new RepositoryNoResultsError('No bee found with ID ' + id);
        }

        const user = userToDto(data.profile!);
        const event = eventToDto(data.event, user);

        return beeToDto(data, event, user);
    }

    async getUserBees(user: UserDto): Promise<BeeDto[]> {
        const eventRepository = new EventRepository(this.dbHandler);
        const userRepository = new UserRepository(this.dbHandler);

        const userEvents = await eventRepository.getEventsForUser(user);
        const userEventIds: string[] = [];

        userEvents.map((userEvent) => userEventIds.push(userEvent.id));

        let { data, error } = await this.dbHandler
            .getClient()
            .from(TABLE_BEE)
            .select(
                `
                *,
                event:event_id (*)
            `
            )
            .in('event_id', userEventIds)
            .returns<BeeJoined[]>();

        if (error) {
            throw error;
        }

        if (data === null || data.length === 0) {
            throw new RepositoryNoResultsError(
                'No bees found with user ID ' + user.id
            );
        }

        let event: EventDto;
        let beeUser: UserDto;

        const userBees = await data.map(async (bee) => {
            event = eventToDto(bee.event, user);
            beeUser = await userRepository.getUser(bee.user_id);

            return beeToDto(bee, event, beeUser);
        });

        return Promise.all(userBees);
    }

    async setBee(description: string, event: EventDto): Promise<void> {
        let { error } = await this.client.from(TABLE_BEE).insert({
            description,
            event_id: event.id,
        });

        if (error) {
            throw error;
        }
    }
}

export function beeToDto(
    bee: Tables<typeof TABLE_BEE>,
    event: EventDto,
    user: UserDto
): BeeDto {
    const createdAt = new Date(Date.parse(bee.created_at));

    return {
        id: bee.id,
        createdAt,
        description: bee.description,
        event: event,
        user,
    };
}
