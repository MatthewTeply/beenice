import EventDto from '../../lib/dto/EventDto';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

type Props = {
    randomEvent: EventDto;
    onChange: any;
    onSubmit: any;
};

export default function RandomEventForm(props: Props) {
    return (
        <div className='grid w-full gap-4'>
            <h1 className='text-2xl font-bold text-center'>
                {props.randomEvent.type.beeTitles[0]}
            </h1>
            <Textarea
                onChange={props.onChange}
                placeholder={props.randomEvent.type.beePlaceholders[0]}
            ></Textarea>
            <Button onClick={props.onSubmit}>Send bee!</Button>
        </div>
    );
}
