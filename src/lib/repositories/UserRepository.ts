import UserDto from '../dto/UserDto';
import { Tables } from '../db/types/supabase.type';
import { SupabaseClient, User } from '@supabase/supabase-js';
import SupabaseHandler from '../db/handlers/SupabaseHandler';
import IRepository from './IRepository';

export default class UserRepository implements IRepository
{
    client: SupabaseClient;

    constructor(dbHandler: SupabaseHandler) {
        this.client = dbHandler.getClient();
    }

    async loginUser(
        email: string,
        password: string
    ): Promise<User>
    {
        const { data, error } = await this.client.auth.signInWithPassword({
            email,
            password
        });
    
        if (error) {
            throw error;
        }
    
        return data.user;
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
    
    async getUserId(): Promise<string>
    {
        const userId = (await this.client.auth.getSession()).data.session?.user.id;
    
        if (!userId) {
            throw new Error('User ID could not be retreived, session is not set');
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
            throw new Error('User not found');
        }
    
        const createdAt = new Date(Date.parse(data[0].created_at));
    
        return {
            id: data[0].id,
            createdAt,
            username: data[0].username
        }
    }
}
