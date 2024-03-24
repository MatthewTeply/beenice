'use client';

import BeeDto from '../../lib/dto/BeeDto';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '../ui/accordion';

type Props = {
    bee: BeeDto;
};

export default function BeeAccordionItem(props: Props) {
    return (
        <AccordionItem value={props.bee.id}>
            <AccordionTrigger>{props.bee.user.username} says:</AccordionTrigger>
            <AccordionContent>{props.bee.description}</AccordionContent>
        </AccordionItem>
    );
}
