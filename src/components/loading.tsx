'use client';

import Image from 'next/image';

import Logo from '../../public/images/logo-large.png';

type Props = {
    message?: string;
};

const MSG_DEFAULT = 'Loading';

export default function Loading(props: Props) {
    return (
        <div className='text-center'>
            <Image src={Logo} alt='Beenice logo' />
            <p className='text-muted-foreground mt-4'>
                {props.message ?? MSG_DEFAULT}
            </p>
        </div>
    );
}
