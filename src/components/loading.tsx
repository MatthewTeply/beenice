'use client';

import Image from 'next/image';

import Logo from '../../public/images/logo-large.png';

export default function Loading() {
    return (
        <div className='text-center'>
            <Image src={Logo} alt='Beenice logo' />
            <p className='text-muted-foreground mt-4'>Loading...</p>
        </div>
    );
}
