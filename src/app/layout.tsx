import type { Metadata } from 'next';
import Header from '../components/partials/header';

import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';

import { cn } from '@/../utils';
import UserRepository from '../lib/repositories/UserRepository';
import serverDbHandler from '../lib/db/handlers/SupabaseServerHandler';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'Beenice',
    description: 'Be(e) nice to others.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const userRepository = new UserRepository(serverDbHandler);

    let isUserLoggedIn = await userRepository.isUserLoggedIn();

    return (
        <html lang='en'>
            <body
                className={cn(
                    'min-h-screen bg-offwhite font-sans antialiased',
                    fontSans.variable
                )}
            >
                {isUserLoggedIn ? <Header /> : false}
                {children}
            </body>
        </html>
    );
}
