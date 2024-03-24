import BeeAccordionItem from '../../components/bees/beeAccordionItem';
import { Accordion } from '../../components/ui/accordion';
import View from '../../components/view';
import serverDbHandler from '../../lib/db/handlers/SupabaseServerHandler';
import BeeRepository from '../../lib/repositories/BeeRepository';
import RepositoryNoResultsError from '../../lib/repositories/RepositoryNoResultsError';
import UserRepository from '../../lib/repositories/UserRepository';

export default async function BeesPage() {
    const userRepository = new UserRepository(serverDbHandler);
    const beeRepository = new BeeRepository(serverDbHandler);

    let message = null;
    let bees = null;
    let beeIds: string[] = [];

    try {
        bees = await beeRepository.getUserBees(
            await userRepository.getCurrentUser()
        );

        bees.map((bee) => beeIds.push(bee.id));
    } catch (error) {
        if (error instanceof RepositoryNoResultsError) {
            message = 'No bees found';
        }
    }

    return (
        <main className='flex justify-center mt-20'>
            <View>
                {bees !== null ? (
                    <Accordion
                        defaultValue={beeIds}
                        type='multiple'
                        className='w-full'
                    >
                        {bees.map((bee, key) => {
                            return <BeeAccordionItem key={key} bee={bee} />;
                        })}
                    </Accordion>
                ) : (
                    <h1 className='w-full text-xl text-center my-12'>
                        No bees yet, but do not worry, somebody will buzz soon!
                    </h1>
                )}
            </View>
        </main>
    );
}
