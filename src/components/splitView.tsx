import { ReactNode } from 'react';
import View from './view';

type Props = {
    leftView: ReactNode;
    rightView: ReactNode;
};

export default function SplitView(props: Props) {
    return (
        <View>
            <section className='basis-1/2 border-r border-offwhite-100 px-20 py-20'>
                {props.leftView}
            </section>
            <section className='basis-1/2 border-l border-offwhite-100 px-20 py-20'>
                {props.rightView}
            </section>
        </View>
    );
}
