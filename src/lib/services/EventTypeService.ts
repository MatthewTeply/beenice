import EventTypeDto from '../dto/EventTypeDto';
import UserDto from '../dto/UserDto';
import EventTypeEnum from '../enums/EventTypeEnum';

export function getEventType(
    eventType: EventTypeEnum,
    user: UserDto
): EventTypeDto {
    switch (eventType) {
        case EventTypeEnum.STRESS:
            return {
                type: EventTypeEnum.STRESS,
                title: `${user.username} is <span>stressed</span>`,
                color: '#FF7918',
                beeTitles: [`Cheer ${user.username} up!`],
                beePlaceholders: [
                    `It's going to be ok, ${user.username}, I believe...`,
                ],
            };
        case EventTypeEnum.SADNESS:
            return {
                type: EventTypeEnum.SADNESS,
                title: `${user.username} is feeling <span>sad</span>`,
                color: '#5A8DC9',
                beeTitles: [`Make ${user.username}'s day!`],
                beePlaceholders: [
                    `I know how you are feeling, ${user.username}, I understand...`,
                ],
            };
        case EventTypeEnum.HAPPINESS:
            return {
                type: EventTypeEnum.HAPPINESS,
                title: `${user.username} is <span>happy</span>!`,
                color: '#0FF626',
                beeTitles: [`Be happy for ${user.username}!`],
                beePlaceholders: [
                    `That is fantastic to hear, ${user.username}, I am so happy for you...`,
                ],
            };
        case EventTypeEnum.ACHIEVEMENT:
            return {
                type: EventTypeEnum.ACHIEVEMENT,
                title: `${user.username} has an <span>achievement</span>!`,
                color: '#BB0AE7',
                beeTitles: [`Congratulate ${user.username}!`],
                beePlaceholders: [
                    `Congratulations, ${user.username}, that is a great achievement...`,
                ],
            };
    }
}
