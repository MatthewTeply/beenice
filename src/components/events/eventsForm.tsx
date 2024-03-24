'use client';

import { Button } from '../ui/button';
import {
    SelectContent,
    SelectTrigger,
    SelectValue,
    Select,
    SelectItem,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import EventTypeEnum from '../../lib/enums/EventTypeEnum';

type Props = {
    onChange: any;
    onSelect: any;
    onSubmit: any;
};

export default function EventsForm(props: Props) {
    const eventTypes = Object.keys(EventTypeEnum).filter((item) => {
        return isNaN(Number(item));
    });

    return (
        <div className='grid w-full gap-4'>
            <h1 className='text-2xl font-bold text-center'>
                What is on your mind?
            </h1>

            <Textarea
                onChange={props.onChange}
                placeholder='Lately I have been struggling with...'
            ></Textarea>

            <Select onValueChange={props.onSelect}>
                <SelectTrigger>
                    <SelectValue placeholder='What does it feel like?' />
                </SelectTrigger>
                <SelectContent>
                    {eventTypes.map((eventType, key) => (
                        <SelectItem key={key} value={eventType}>
                            {eventType}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button onClick={props.onSubmit}>Buzz Up!</Button>
        </div>
    );
}
