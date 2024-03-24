import EventTypeEnum from '../enums/EventTypeEnum';

type EventTypeDto = {
    type: EventTypeEnum;
    title: string;
    color: string;
    beeTitles: string[];
    beePlaceholders: string[];
};

export default EventTypeDto;
