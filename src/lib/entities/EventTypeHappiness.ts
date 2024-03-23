import IEventType from './IEventType';
import EventTypeEnum from '../enums/EventTypeEnum';

type Props = {
    name: string;
};

export default class EventTypeHappiness implements IEventType {
    type: EventTypeEnum;
    title: string;
    color: string;
    beeTitles: string[];
    beePlaceholders: string[];

    constructor(props: Props) {
        this.type = EventTypeEnum.HAPPINESS;
        this.title = `${props.name} is <span>happy</span>!`;
        this.color = '#0FF626';
        this.beeTitles = [`Be happy for ${props.name}!`];
        this.beePlaceholders = [
            `That is fantastic to hear, ${props.name}, I am so happy for you...`,
        ];
    }
}
