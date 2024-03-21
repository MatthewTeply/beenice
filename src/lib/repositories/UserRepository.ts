import UserDto from '../dto/UserDto';
import { Tables } from '../db/types/supabase.type';
import { SupabaseClient } from '@supabase/supabase-js';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import IRepository from './IRepository';
import { RepositoryError, RepositoryErrorName } from './RepositoryError';

export default class UserRepository implements IRepository
{
    client: SupabaseClient;

    constructor(dbHandler: SupabaseHandler) {
        this.client = dbHandler.getClient();
    }

    async loginUser(
        email: string,
        password: string
    ): Promise<UserDto>
    {
        const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
        });
    
        if (error) {
            throw error;
        }
    
        return await this.getUser(data.user.id);
    }
    
    async logoutUser(): Promise<boolean>
    {
        const {error} = await this.client.auth.signOut();
    
        if (error) {
            throw error;
        }
    
        return true;
    }
    
    async isUserLoggedIn(): Promise<boolean>
    {
        return await this.client.auth.getSession() !== null;
    }
    
    async getCurrentUserId(): Promise<string>
    {
        const userId = (await this.client.auth.getSession()).data.session?.user.id;
    
        if (!userId) {
            throw new RepositoryError({
                name: RepositoryErrorName.NO_RESULTS,
                message: 'User ID could not be retreived, session is not set'
            });
        }
    
        return userId;
    }
    
    async getUser(id: string): Promise<UserDto>
    {
        const { data, error } = await this.client
            .from('profile')
            .select('*')
            .eq('id', id)
            .returns<Tables<'profile'>[]>();
    
        if (error) {
            throw error;
        }
    
        if (data.length === 0) {
            throw new RepositoryError({
                name: RepositoryErrorName.NO_RESULTS,
                message: 'No user profile found with ID ' + id
            });
        }
    
        const createdAt = new Date(Date.parse(data[0].created_at));
    
        return {
            id: data[0].id,
            createdAt,
            username: data[0].username
        }
    }

    async getCurrentUser(): Promise<UserDto>
    {
        return await this.getUser(await this.getCurrentUserId());
    }
}
