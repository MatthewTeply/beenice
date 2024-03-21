import EventDto from './EventDto';
import UserDto from './UserDto'

type BeeDto = {
    id: string,
    createdAt: Date,
    description: string,
    event: EventDto,
    user: UserDto
}

export default BeeDto;