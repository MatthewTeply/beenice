import EventsFeed from '../components/events/EventsFeed';
import serverDbHandler from '../lib/db/handlers/SupabaseServerHandler';
import EventRepository from '../lib/repositories/EventRepository';
import RepositoryNoResultsError from '../lib/repositories/RepositoryNoResultsError';

export default async function HomePage() {
    const eventRepository = new EventRepository(serverDbHandler);

    let message = '';
    let initialRandomEvent = null;

    try {
        initialRandomEvent = await eventRepository.getRandomEvent();
    } catch (error) {}

    return (
        <main>
            <EventsFeed initialRandomEvent={initialRandomEvent} />
        </main>
    );
}
