'use client';

import { ChangeEvent, useState } from 'react';
import EventDto from '../../lib/dto/EventDto';
import SplitView from '../splitView';
import EventsTable from './eventsTable';
import EventsForm from './eventsForm';
import EventTypeEnum from '../../lib/enums/EventTypeEnum';
import EventRepository from '../../lib/repositories/EventRepository';
import clientDbHandler from '../../lib/db/handlers/SupabaseClientHandler';

type Props = {
    events: EventDto[] | null;
};

export default function MyEvents(props: Props) {
    const [events, setEvents] = useState<EventDto[] | null>(props.events);

    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<EventTypeEnum | null>(null);

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleOnSelect = (value: string) => {
        setType(value as EventTypeEnum);
    };

    const handleSubmit = async () => {
        const eventRepository = new EventRepository(clientDbHandler);

        if (description !== '' && type !== null) {
            try {
                await eventRepository.setEvent(description, type);

                setEvents(await eventRepository.getEventsForCurrentUser());
                setDescription('');
                setType(null);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <SplitView
            leftView={
                <EventsForm
                    onChange={handleOnChange}
                    onSelect={handleOnSelect}
                    onSubmit={handleSubmit}
                    description={description}
                    type={type}
                />
            }
            rightView={
                events !== null ? <EventsTable events={events} /> : 'No events'
            }
        />
    );
}
