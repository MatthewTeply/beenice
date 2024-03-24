'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserRepository from '../../../lib/repositories/UserRepository';
import clientDbHandler from '../../../lib/db/handlers/SupabaseClientHandler';
import { AuthError } from '@supabase/supabase-js';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupFormSchema } from '../../../lib/formSchemas/AuthFormSchemas';

export default function LoginForm() {
    const [message, setMessage] = useState<string>('');
    const router = useRouter();

    const signupForm = useForm<z.infer<typeof signupFormSchema>>({
        resolver: zodResolver(signupFormSchema),
    });

    const submit = async (values: z.infer<typeof signupFormSchema>) => {
        /* TODO */
    };

    return (
        <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(submit)}>
                <FormField
                    control={signupForm.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder='bee@nice.com' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={signupForm.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className='mt-8'>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type='password'
                                    placeholder='*****'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={signupForm.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='mt-8'>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder='A Nice Bee' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit' className='mt-10'>
                    Sign Up
                </Button>
            </form>
        </Form>
    );
}
