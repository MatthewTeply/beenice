'use client';

import { useRouter } from 'next/navigation';
import UserRepository from '../../lib/repositories/UserRepository';
import clientDbHandler from '../../lib/db/handlers/SupabaseClientHandler';
import UserDto from '../../lib/dto/UserDto';

type Props= {
    user: UserDto
}

export default function LogoutBtn(props: Props) {
    const router = useRouter();

    const logout = async () => {
        const userRepository = new UserRepository(clientDbHandler);

        await userRepository.logoutUser();

        router.refresh();
    }

    return (
        <button onClick={logout}>Logout {props.user.username}</button>
    );
}