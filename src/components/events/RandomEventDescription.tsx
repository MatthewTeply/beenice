import EventDto from '../../lib/dto/EventDto';

type Props = {
    randomEvent: EventDto;
};

export default function RandomEventDescription(props: Props) {
    return (
        <>
            <h1
                className='text-2xl font-bold text-center'
                dangerouslySetInnerHTML={{
                    __html: props.randomEvent.type.title,
                }}
            />
            <p className='text-center'>{props.randomEvent.description}</p>
        </>
    );
}
