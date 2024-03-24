import { ReactNode } from 'react';

type Props = {
    leftView: ReactNode;
    rightView: ReactNode;
};

export default function SplitView(props: Props) {
    return (
        <div className='flex bg-white shadow rounded px-10 w-full mx-20'>
            <section className='basis-1/2 border-r border-offwhite-100 px-20 py-20'>
                {props.leftView}
            </section>
            <section className='basis-1/2 border-l border-offwhite-100 px-20 py-20'>
                {props.rightView}
            </section>
        </div>
    );
}
