'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserRepository from '../../lib/repositories/UserRepository';
import dbHandler from '../../lib/db/handlers/SupabaseClientHandler';
import { AuthError } from '@supabase/supabase-js';

export default function LoginForm()
{
    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState<string>('');

    const router = useRouter();

    const handleChange = (e: any) => {
        const {name, value} = e.target;

        setData((prev: any) => ({
            ...prev,
            [name]: value
        }));
    }

    const login = async () => {
        const userRepository = new UserRepository(dbHandler);

        try {
            const user = await userRepository.loginUser(data.email, data.password);

            setMessage('Welcome, ' + user.email);

            setTimeout(() => {
                router.refresh();
            }, 1000);
        } catch (error) {
            const authError = error as AuthError;

            setMessage(authError.message);
        }
    }

    return (
        <div>
            <div>
                <b>{message}</b>
            </div>

            <div>
                <input 
                    type="email" 
                    name="email" 
                    placeholder='Email'
                    onChange={handleChange} 
                />

                <input 
                    type="password" 
                    name="password" 
                    placeholder='Password'
                    onChange={handleChange} 
                />

                <button onClick={login}>Login</button>
            </div>
        </div>
    )
}