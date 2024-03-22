import EventsFeed from '../components/events/EventsFeed';
import serverDbHandler from '../lib/db/handlers/SupabaseServerHandler';
import EventRepository from '../lib/repositories/EventRepository';

export default async function HomePage() {
    const eventRepository = new EventRepository(serverDbHandler);

    const initialRandomEvent = await eventRepository.getRandomEvent();

    return (
        <main>
            <h1>Homepage</h1>
            <EventsFeed initialRandomEvent={initialRandomEvent} />
        </main>
    );
}
