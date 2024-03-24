'use client';

import { useEffect, useState } from 'react';
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
import { loginFormSchema } from '../../../lib/formSchemas/AuthFormSchemas';
import AuthFormAlert, { AuthFormMessage } from './authFormAlert';

const MSG_LOGIN_BUTTON = 'Log In';

export default function LoginForm() {
    const [message, setMessage] = useState<AuthFormMessage | null>(null);
    const [buttonText, setButtonText] = useState<string>(MSG_LOGIN_BUTTON);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (isLoading === true) {
            setButtonText('Logging In...');
        } else {
            setButtonText(MSG_LOGIN_BUTTON);
        }
    }, [isLoading]);

    const loginForm = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
    });

    const submit = async (values: z.infer<typeof loginFormSchema>) => {
        setIsLoading(true);

        const userRepository = new UserRepository(clientDbHandler);

        try {
            await userRepository.loginUser(values.email, values.password);

            router.refresh();
        } catch (error) {
            if (error instanceof AuthError) {
                setMessage({
                    variant: 'destructive',
                    title: 'Failed to log in',
                    description: 'You entered an incorrect email or password',
                });
            } else {
                console.log(error);

                setMessage({
                    variant: 'destructive',
                    title: 'Unknown Error',
                    description: 'An unknown error occured',
                });
            }

            setIsLoading(false);
        }
    };

    return (
        <Form {...loginForm}>
            {message !== null && <AuthFormAlert message={message} />}

            <form onSubmit={loginForm.handleSubmit(submit)}>
                <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
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

                <Button type='submit' disabled={isLoading} className='mt-10'>
                    {buttonText}
                </Button>
            </form>
        </Form>
    );
}
