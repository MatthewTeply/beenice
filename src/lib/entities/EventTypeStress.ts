import IEventType from './IEventType';
import EventTypeEnum from '../enums/EventTypeEnum';

type Props = {
    name: string;
};

export default class EventTypeStress implements IEventType {
    type: EventTypeEnum;
    title: string;
    color: string;
    beeTitles: string[];
    beePlaceholders: string[];

    constructor(props: Props) {
        this.type = EventTypeEnum.STRESS;
        this.title = `${props.name} is <span>stressed</span>`;
        this.color = '#FF7918';
        this.beeTitles = [`Cheer ${props.name} up!`];
        this.beePlaceholders = [
            `It's going to be ok, ${props.name}, I believe...`,
        ];
    }
}
