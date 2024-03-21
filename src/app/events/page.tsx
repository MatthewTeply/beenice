import serverDbHandler from '../../lib/db/handlers/SupabaseServerHandler';
import EventRepository from '../../lib/repositories/EventRepository';
import { RepositoryError } from '../../lib/repositories/RepositoryError';
import UserRepository from '../../lib/repositories/UserRepository';

export default async function EventsPage() {
    const userRepository = new UserRepository(serverDbHandler);
    const eventRepository = new EventRepository(serverDbHandler);

    let events = null;

    try {
        events = await eventRepository.getEventsForUser(await userRepository.getCurrentUser());
    } catch (error) {};

    console.log(events);

    return (
        <main>
            <h1>Events</h1>
            {events === null ? <h2>No events found</h2> : false}
            <div>
                <ul>
                    {events !== null ? events.map((event, key) => {
                        return (
                            <li key={key}>
                                {event.description}
                            </li>
                        )
                    }) : false}
                </ul>
            </div>
        </main>
    );
}