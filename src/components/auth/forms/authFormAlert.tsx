'use client';

import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert';

export type AuthFormMessage = {
    variant?: 'default' | 'destructive';
    title: string;
    description: string;
};

type Props = {
    message: AuthFormMessage;
};

export default function AuthFormAlert(props: Props) {
    return (
        <Alert variant={props.message.variant} className='mb-6'>
            <AlertCircle className='h-4 w-4' />
            <AlertTitle>{props.message.title}</AlertTitle>
            <AlertDescription>{props.message.description}</AlertDescription>
        </Alert>
    );
}
