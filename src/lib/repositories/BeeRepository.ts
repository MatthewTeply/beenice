import { SupabaseClient } from '@supabase/supabase-js';
import { Tables } from '../db/types/supabase.type';
import BeeDto from '../dto/BeeDto';
import IRepository from './IRepository';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import { eventToDto } from './EventRepository';
import { userToDto } from './UserRepository';
import RepositoryNoResultsError from './RepositoryNoResultsError';
import UserDto from '../dto/UserDto';
import EventDto from '../dto/EventDto';

const TABLE_BEE = 'bee';

type BeeJoined = Tables<typeof TABLE_BEE> & {
    event: Tables<'event'>;
    user?: Tables<'profile'>;
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
                event:event_id (*),
                profile:user_id (*)
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

        const user = userToDto(data.user!);
        const event = eventToDto(data.event, user);

        return beeToDto(data, event, user);
    }

    async getUserBees(user: UserDto): Promise<BeeDto[]> {
        let { data, error } = await this.dbHandler
            .getClient()
            .from(TABLE_BEE)
            .select(
                `
                *,
                event:event_id (*)
            `
            )
            .eq('user_id', user.id)
            .returns<BeeJoined[]>();

        if (error) {
            throw error;
        }

        if (data === null || data.length === 0) {
            throw new RepositoryNoResultsError(
                'No bees found with user ID ' + user.id
            );
        }

        const userBees: BeeDto[] = [];

        let event: EventDto;

        data.map((bee) => {
            event = eventToDto(bee.event, user);

            userBees.push(beeToDto(bee, event, user));
        });

        return userBees;
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
