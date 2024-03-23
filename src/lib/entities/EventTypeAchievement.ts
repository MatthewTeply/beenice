import IEventType from './IEventType';
import EventTypeEnum from '../enums/EventTypeEnum';

type Props = {
    name: string;
};

export default class EventTypeAchievement implements IEventType {
    type: EventTypeEnum;
    title: string;
    color: string;
    beeTitles: string[];
    beePlaceholders: string[];

    constructor(props: Props) {
        this.type = EventTypeEnum.ACHIEVEMENT;
        this.title = `${props.name} has an <span>achievement</span>!`;
        this.color = '#BB0AE7';
        this.beeTitles = [`Congratulate ${props.name}!`];
        this.beePlaceholders = [
            `Congratulations, ${props.name}, that is a great achievement...`,
        ];
    }
}
