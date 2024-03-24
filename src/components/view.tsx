import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default function View(props: Props) {
    return (
        <div className='flex bg-white shadow rounded px-10 w-full mx-20'>
            {props.children}
        </div>
    );
}
