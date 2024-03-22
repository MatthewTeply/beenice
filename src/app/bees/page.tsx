import serverDbHandler from '../../lib/db/handlers/SupabaseServerHandler';
import BeeRepository from '../../lib/repositories/BeeRepository';
import RepositoryNoResultsError from '../../lib/repositories/RepositoryNoResultsError';
import UserRepository from '../../lib/repositories/UserRepository';

export default async function BeesPage() {
    const userRepository = new UserRepository(serverDbHandler);
    const beeRepository = new BeeRepository(serverDbHandler);

    let message = null;
    let bees = null;

    try {
        bees = await beeRepository.getUserBees(
            await userRepository.getCurrentUser()
        );
    } catch (error) {
        if (error instanceof RepositoryNoResultsError) {
            message = 'No bees found';
        }
    }

    return (
        <main>
            <h1>Bees</h1>
            <div>{message !== null ? <span>{message}</span> : false}</div>
            <div>
                <ul>
                    {bees !== null
                        ? bees.map((bee, key) => {
                              return <li key={key}>{bee.description}</li>;
                          })
                        : false}
                </ul>
            </div>
        </main>
    );
}
