'use client';

import { useRouter } from 'next/navigation';
import UserRepository from '../../lib/repositories/UserRepository';
import dbHandler from '../../lib/db/handlers/SupabaseClientHandler';

export default function LogoutBtn() {
    const router = useRouter();

    const logout = async () => {
        const userRepository = new UserRepository(dbHandler);

        await userRepository.logoutUser();

        router.refresh();
    }

    return (
        <button onClick={logout}>Logout</button>
    );
}