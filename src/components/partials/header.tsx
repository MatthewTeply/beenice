'use client';

import NextLink from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import UserRepository from '../../lib/repositories/UserRepository';
import clientDbHandler from '../../lib/db/handlers/SupabaseClientHandler';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import Logo from '../../../public/images/logo.png';
import { ReactNode } from 'react';

export default function Header() {
    const router = useRouter();
    const pathName = usePathname();

    const logout = async () => {
        const userRepository = new UserRepository(clientDbHandler);

        await userRepository.logoutUser();

        router.refresh();
    };

    const HeaderLink = ({
        href,
        children,
    }: {
        href: string;
        children: ReactNode;
    }) => {
        const isActive = href === pathName;

        return (
            <NextLink href={href} legacyBehavior passHref>
                <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={isActive}
                >
                    {children}
                </NavigationMenuLink>
            </NextLink>
        );
    };

    return (
        <header className='w-full py-4 bg-white shadow-sm'>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <HeaderLink href='/'>
                            <Image src={Logo} alt='Beenice logo' height={40} />
                        </HeaderLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <HeaderLink href='/'>Homepage</HeaderLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <HeaderLink href='/events'>My Events</HeaderLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <HeaderLink href='/bees'>My Bees</HeaderLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink
                            className={
                                navigationMenuTriggerStyle() + ' cursor-pointer'
                            }
                            onClick={logout}
                        >
                            Log Out
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
