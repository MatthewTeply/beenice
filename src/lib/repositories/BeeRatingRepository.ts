import { SupabaseClient } from '@supabase/supabase-js';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import BeeDto from '../dto/BeeDto';
import IRepository from './IRepository';
import UserRepository, { userToDto } from './UserRepository';
import BeeRatingDto from '../dto/BeeRatingDto';
import { Tables } from '../db/types/supabase.type';
import RepositoryNoResultsError from './RepositoryNoResultsError';
import UserDto from '../dto/UserDto';

type BeeRatingJoined = Tables<'beeRating'> & {
    bee?: Tables<'bee'>;
    user?: Tables<'profile'>;
};

export default class BeeRatingRepository implements IRepository {
    client: SupabaseClient;
    dbHandler: SupabaseHandler;

    constructor(dbHandler: SupabaseHandler) {
        this.client = dbHandler.getClient();
        this.dbHandler = dbHandler;
    }

    async setBeeRating(isUseful: boolean, bee: BeeDto): Promise<void> {
        const userRepository = new UserRepository(this.dbHandler);

        const userId = userRepository.getCurrentUserId();

        const { error } = await this.client.from('beeRating').insert({
            is_useful: isUseful,
            bee_id: bee.id,
            user_id: userId,
        });

        if (error) {
            throw error;
        }
    }

    async getBeeRatingByBee(bee: BeeDto): Promise<BeeRatingDto[]> {
        const { data, error } = await this.client
            .from('beeRating')
            .select(
                `
                id,
                profile:user_id (*)
            `
            )
            .eq('bee_id', bee.id)
            .returns<BeeRatingJoined[]>();

        if (error) {
            throw error;
        }

        if (data.length === 0 || data === null) {
            throw new RepositoryNoResultsError('No bee ratings found');
        }

        const beeRatings: BeeRatingDto[] = [];

        let user: UserDto;

        data.map((beeRating) => {
            user = userToDto(beeRating.user!);

            beeRatings.push(beeRatingToDto(beeRating, bee, user));
        });

        return beeRatings;
    }
}

export function beeRatingToDto(
    beeRating: Tables<'beeRating'>,
    bee: BeeDto,
    user: UserDto
): BeeRatingDto {
    const createdAt = new Date(Date.parse(beeRating.created_at));

    return {
        id: beeRating.id,
        createdAt,
        isUseful: beeRating.is_useful,
        bee,
        user,
    };
}
