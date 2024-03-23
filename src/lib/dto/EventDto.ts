import EventTypeEnum from '../enums/EventTypeEnum';
import UserDto from './UserDto';

type EventDto = {
    id: string;
    createdAt: Date;
    description: string;
    isRelevant: boolean;
    type: EventTypeEnum;
    user: UserDto;
};

export default EventDto;
