import BeeDto from './BeeDto';
import UserDto from './UserDto';

type BeeRatingDto = {
    id: string;
    createdAt: Date;
    isUseful: boolean;
    bee: BeeDto;
    user: UserDto;
};

export default BeeRatingDto;
