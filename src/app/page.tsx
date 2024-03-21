import LogoutBtn from "../components/user/logoutBtn";
import UserRepository from '../lib/repositories/UserRepository';
import dbHandler from "../lib/db/handlers/SupabaseServerHandler";

export default async function HomePage() {
  const userRepository = new UserRepository(dbHandler);

  const user = await userRepository.getUser(await userRepository.getUserId());

  return (
    <main>
      Welcome, {user.username}

      {await userRepository.isUserLoggedIn() ? <LogoutBtn /> : false}
    </main>
  );
}
