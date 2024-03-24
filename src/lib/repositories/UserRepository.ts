import UserDto from '../dto/UserDto';
import { Tables } from '../db/types/supabase.type';
import { SupabaseClient, User } from '@supabase/supabase-js';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import IRepository from './IRepository';
import RepositoryNoResultsError from './RepositoryNoResultsError';

const TABLE_PROFILE = 'profile';

export default class UserRepository implements IRepository {
    client: SupabaseClient;

    constructor(dbHandler: SupabaseHandler) {
        this.client = dbHandler.getClient();
    }

    async signupUser(
        email: string,
        username: string,
        password: string
    ): Promise<void> {
        const { data, error } = await this.client.auth.signUp({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        if (data.user !== null) {
            await this.setUser(data.user, username);
        }
    }

    private async setUser(user: User, username: string): Promise<void> {
        const { error } = await this.client.from(TABLE_PROFILE).insert({
            id: user.id,
            username,
        });

        if (error) {
            throw error;
        }
    }

    async loginUser(email: string, password: string): Promise<UserDto> {
        const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw error;
        }

        return await this.getUser(data.user.id);
    }

    async logoutUser(): Promise<boolean> {
        const { error } = await this.client.auth.signOut();

        if (error) {
            throw error;
        }

        return true;
    }

    async isUserLoggedIn(): Promise<boolean> {
        return (await this.client.auth.getUser()).data.user !== null;
    }

    async getCurrentUserId(): Promise<string> {
        const userId = (await this.client.auth.getSession()).data.session?.user
            .id;

        if (!userId) {
            throw new RepositoryNoResultsError(
                'User ID could not be retreived, session is not set'
            );
        }

        return userId;
    }

    async getUser(id: string): Promise<UserDto> {
        const { data, error } = await this.client
            .from(TABLE_PROFILE)
            .select('*')
            .eq('id', id)
            .returns<Tables<typeof TABLE_PROFILE>[]>();

        if (error) {
            throw error;
        }

        if (data.length === 0) {
            throw new RepositoryNoResultsError(
                'No user profile found with ID ' + id
            );
        }

        return userToDto(data[0]);
    }

    async getCurrentUser(): Promise<UserDto> {
        return await this.getUser(await this.getCurrentUserId());
    }
}

export function userToDto(profile: Tables<typeof TABLE_PROFILE>): UserDto {
    const createdAt = new Date(Date.parse(profile.created_at));

    return {
        id: profile.id,
        username: profile.username,
        createdAt,
    };
}
