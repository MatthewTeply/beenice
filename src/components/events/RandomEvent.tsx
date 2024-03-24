'use client';

import { ChangeEvent, useState } from 'react';
import EventDto from '../../lib/dto/EventDto';
import EventRepository from '../../lib/repositories/EventRepository';
import clientDbHandler from '../../lib/db/handlers/SupabaseClientHandler';
import BeeRepository from '../../lib/repositories/BeeRepository';
import RepositoryNoResultsError from '../../lib/repositories/RepositoryNoResultsError';
import SplitView from '../splitView';
import RandomEventForm from './randomEventForm';
import RandomEventDescription from './randomEventDescription';
import Loading from '../loading';

const MSG_NO_MORE_EVENTS = 'No more events!';
const MSG_LOADING = 'Loading more events...';

type Props = {
    initialRandomEvent: EventDto | null;
};

export default function RandomEvent(props: Props) {
    const [beeDescription, setBeeDescription] = useState<string>('');
    const [randomEvent, setRandomEvent] = useState<EventDto | null>(
        props.initialRandomEvent
    );
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getRandomEvent = async () => {
        setIsLoading(true);
        const eventRepository = new EventRepository(clientDbHandler);

        eventRepository
            .getRandomEvent()
            .then((event) => {
                setRandomEvent(event);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error instanceof RepositoryNoResultsError) {
                    setRandomEvent(null);
                    setMessage(MSG_NO_MORE_EVENTS);
                    setIsLoading(false);
                }
            });
    };

    const handleBeeDescriptionChange = (
        e: ChangeEvent<HTMLTextAreaElement>
    ) => {
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
        } else {
            console.error('Empty bee message');
            setMessage('Empty Bee Message');
        }
    };

    if (randomEvent !== null && !isLoading) {
        return (
            <SplitView
                leftView={<RandomEventDescription randomEvent={randomEvent} />}
                rightView={
                    <RandomEventForm
                        randomEvent={randomEvent}
                        onChange={handleBeeDescriptionChange}
                        onSubmit={createBee}
                    />
                }
            />
        );
    }

    if (isLoading) {
        return <Loading message={MSG_LOADING} />;
    }

    return MSG_NO_MORE_EVENTS;
}
