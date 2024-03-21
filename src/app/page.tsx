import UserRepository from '../lib/repositories/UserRepository';
import serverDbHandler from "../lib/db/handlers/SupabaseServerHandler";

export default async function HomePage() {
  const userRepository = new UserRepository(serverDbHandler);

  const user = await userRepository.getUser(await userRepository.getCurrentUserId());

  return (
    <main>
      <h1>
        Welcome, {user.username}
      </h1>
    </main>
  );
}
