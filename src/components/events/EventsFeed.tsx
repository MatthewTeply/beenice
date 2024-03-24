'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import EventDto from '../../lib/dto/EventDto';
import EventRepository from '../../lib/repositories/EventRepository';
import clientDbHandler from '../../lib/db/handlers/SupabaseClientHandler';
import BeeRepository from '../../lib/repositories/BeeRepository';
import RepositoryNoResultsError from '../../lib/repositories/RepositoryNoResultsError';

type Props = {
    initialRandomEvent: EventDto | null;
};

const MSG_NO_MORE_EVENTS = 'No more events!';

export default function EventsFeed(props: Props) {
    const [beeDescription, setBeeDescription] = useState<string>('');
    const [randomEvent, setRandomEvent] = useState<EventDto | null>(
        props.initialRandomEvent
    );
    const [message, setMessage] = useState<string>('');

    if (randomEvent === null) {
        setMessage(MSG_NO_MORE_EVENTS);
    }

    const getRandomEvent = async () => {
        const eventRepository = new EventRepository(clientDbHandler);

        eventRepository
            .getRandomEvent()
            .then((event) => {
                setRandomEvent(event);
            })
            .catch((error) => {
                if (error instanceof RepositoryNoResultsError) {
                    setRandomEvent(null);
                    setMessage(MSG_NO_MORE_EVENTS);
                }
            });
    };

    const handleBeeDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setBeeDescription(e.target.value);
    };

    const createBee = async () => {
        const beeRepository = new BeeRepository(clientDbHandler);

        if (beeDescription !== '' && randomEvent !== null) {
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
            <div>{message !== '' ? <span>{message}</span> : false}</div>
            {randomEvent !== null ? (
                <>
                    <div>
                        <h3>Event</h3>
                        <p>{randomEvent?.description}</p>
                    </div>
                    <div>
                        <h3>Bee</h3>
                        <textarea
                            onChange={handleBeeDescription}
                            placeholder='Bee description'
                            value={beeDescription}
                        ></textarea>
                        <button onClick={createBee}>Send bee!</button>
                    </div>
                </>
            ) : (
                false
            )}
        </section>
    );
}
