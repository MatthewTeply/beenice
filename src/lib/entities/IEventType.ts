import EventTypeEnum from '../enums/EventTypeEnum';

export default interface IEventType {
    type: EventTypeEnum;
    title: string;
    color: string;
    beeTitles: string[];
    beePlaceholders: string[];
}
