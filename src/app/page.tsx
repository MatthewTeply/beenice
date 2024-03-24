import RandomEvent from '../components/events/randomEvent';
import serverDbHandler from '../lib/db/handlers/SupabaseServerHandler';
import EventRepository from '../lib/repositories/EventRepository';

export default async function HomePage() {
    const eventRepository = new EventRepository(serverDbHandler);
    let randomEvent = null;

    try {
        randomEvent = await eventRepository.getRandomEvent();
    } catch (error) {}

    return (
        <main className='flex justify-center mt-20'>
            <RandomEvent initialRandomEvent={randomEvent} />
        </main>
    );
}
