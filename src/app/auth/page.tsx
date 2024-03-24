import Image from 'next/image';
import AuthFormsTabs from '../../components/auth/authFormsTabs';

import LogoLarge from '../../../public/images/logo-large.png';

export default function LoginPage() {
    return (
        <main className='flex h-screen'>
            <section className='container flex flex-col items-center basis-2/5 bg-white py-14'>
                <Image
                    src={LogoLarge}
                    alt='Beenice logo'
                    className='justify-self-center mb-10'
                    width={200}
                />
                <AuthFormsTabs />
            </section>
            <section className='basis-3/5'></section>
        </main>
    );
}
