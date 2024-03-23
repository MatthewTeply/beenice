import IEventType from './IEventType';
import EventTypeEnum from '../enums/EventTypeEnum';

type Props = {
    name: string;
};

export default class EventTypeSadness implements IEventType {
    type: EventTypeEnum;
    title: string;
    color: string;
    beeTitles: string[];
    beePlaceholders: string[];

    constructor(props: Props) {
        this.type = EventTypeEnum.SADNESS;
        this.title = `${props.name} is feeling <span>sad</span>`;
        this.color = '#5A8DC9';
        this.beeTitles = [`Make ${props.name}'s day!`];
        this.beePlaceholders = [
            `I know how you are feeling, ${props.name}, I understand...`,
        ];
    }
}
