import serverDbHandler from '../../lib/db/handlers/SupabaseServerHandler';
import EventRepository from '../../lib/repositories/EventRepository';
import RepositoryNoResultsError from '../../lib/repositories/RepositoryNoResultsError';
import UserRepository from '../../lib/repositories/UserRepository';

export default async function EventsPage() {
    const userRepository = new UserRepository(serverDbHandler);
    const eventRepository = new EventRepository(serverDbHandler);

    let events = null;
    let message = null;

    try {
        events = await eventRepository.getEventsForUser(
            await userRepository.getCurrentUser()
        );
    } catch (error) {
        if (error instanceof RepositoryNoResultsError) {
            message = 'No events found';
        }
    }

    return (
        <main>
            <div>{message !== null ? <span>{message}</span> : false}</div>
            <div>
                <ul>
                    {events !== null
                        ? events.map((event, key) => {
                              return <li key={key}>{event.description}</li>;
                          })
                        : false}
                </ul>
            </div>
        </main>
    );
}
