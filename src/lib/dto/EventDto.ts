import EventTypeDto from './EventTypeDto';
import UserDto from './UserDto';

type EventDto = {
    id: string;
    createdAt: Date;
    description: string;
    isRelevant: boolean;
    type: EventTypeDto;
    user: UserDto;
};

export default EventDto;
