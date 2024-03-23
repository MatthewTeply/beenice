'use client';

import { useEffect, useState } from 'react';
import EventDto from '../../lib/dto/EventDto';
import EventRepository from '../../lib/repositories/EventRepository';
import clientDbHandler from '../../lib/db/handlers/SupabaseClientHandler';
import BeeRepository from '../../lib/repositories/BeeRepository';
import RepositoryNoResultsError from '../../lib/repositories/RepositoryNoResultsError';

type Props = {
    initialRandomEvent: EventDto;
};

export default function EventsFeed(props: Props) {
    const [beeDescription, setBeeDescription] = useState<string>('');
    const [randomEvent, setRandomEvent] = useState<EventDto>();
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        setRandomEvent(props.initialRandomEvent);
    }, []);

    const getRandomEvent = async () => {
        const eventRepository = new EventRepository(clientDbHandler);

        eventRepository
            .getRandomEvent()
            .then((event) => {
                setRandomEvent(event);
            })
            .catch((error) => {
                if (error instanceof RepositoryNoResultsError) {
                    setMessage('No more events!');
                }
            });
    };

    const createBee = async () => {
        const beeRepository = new BeeRepository(clientDbHandler);

        if (beeDescription !== '' && randomEvent !== undefined) {
            try {
                await beeRepository.setBee(beeDescription, randomEvent);

                setBeeDescription('');
                setMessage('Bee sent!');

                await getRandomEvent();
            } catch (error) {
                console.error(error);
                setMessage('Error');
            }
        }
    };

    return (
        <section>
            <div>
                {message !== '' ? (
                    <span>
                        <b>Mesage</b>: {message}
                    </span>
                ) : (
                    false
                )}
            </div>
            <div>
                <h3>Event</h3>
                <p>{randomEvent?.description}</p>
            </div>
            <div>
                <h3>Bee</h3>
                <textarea
                    onChange={(e) => setBeeDescription(e.target.value)}
                    placeholder='Bee description'
                >
                    {beeDescription}
                </textarea>
                <button onClick={createBee}>Send bee!</button>
            </div>
        </section>
    );
}
