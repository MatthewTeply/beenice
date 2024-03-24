import EventDto from '../../lib/dto/EventDto';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';

type Props = {
    events: EventDto[];
};

export default function EventsTable(props: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {props.events.map((event, key) => (
                    <TableRow key={key}>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>{event.type.type}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
