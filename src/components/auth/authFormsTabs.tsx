'use client';

import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { TabsContent } from '@radix-ui/react-tabs';
import LoginForm from './forms/loginForm';
import SignupForm from './forms/signupForm';

const TAB_LOGIN = 'login';
const TAB_SIGNUP = 'signup';

export default function AuthFormsTabs() {
    return (
        <Tabs
            defaultValue={TAB_LOGIN}
            className='w-full flex flex-col items-center'
        >
            <TabsList className='mb-10'>
                <TabsTrigger value={TAB_LOGIN}>Log In</TabsTrigger>
                <TabsTrigger value={TAB_SIGNUP}>Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value={TAB_LOGIN} className='w-full'>
                <LoginForm />
            </TabsContent>
            <TabsContent value={TAB_SIGNUP} className='w-full'>
                <SignupForm />
            </TabsContent>
        </Tabs>
    );
}
