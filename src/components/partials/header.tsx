import Link from 'next/link';
import UserRepository from '../../lib/repositories/UserRepository';
import serverDbHandler from '../../lib/db/handlers/SupabaseServerHandler';
import UserDto from '../../lib/dto/UserDto';
import LogoutBtn from '../user/logoutBtn';

export default async function Header() {
    let user: UserDto | null = null;

    const userRepository = new UserRepository(serverDbHandler);

    try {
        user = await userRepository.getCurrentUser();
    } catch (error) {}

    const loggedInNav = (user: UserDto) => {
        return (
            <>
                <li>
                    <Link href='/events'>My events</Link>
                </li>
                <li>
                    <Link href='/bees'>My Bees</Link>
                </li>
                <li>
                    <LogoutBtn user={user} />
                </li>
            </>
        );
    };

    const loggedOutNav = () => {
        return (
            <li>
                <Link href='/login'>Login</Link>
            </li>
        );
    };

    return (
        <header>
            <Link href='/'>
                <h1>Beenice</h1>
            </Link>
            <nav>
                <ul>{user !== null ? loggedInNav(user) : loggedOutNav()}</ul>
            </nav>
        </header>
    );
}
