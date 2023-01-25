import '@/styles/global.css';
import Props from '@/types/home/Layout';
import Head from './head';
import GlassPane from '@/components/GlassPane';

import { Oxygen_Mono } from '@next/font/google';

const oxygen = Oxygen_Mono ({
    subsets: ['latin-ext'],
    weight: ["400"],
    style: 'normal',
    display: 'fallback'
})

export default function RootLayout(props: Props) {
    return (
        <html lang="en">
            <Head />
            <body className={`${oxygen.className} global-font-settings flex max-h-screen min-h-screen h-full lg:h-full xl:h-full md:h-full sm:h-full w-screen rainbow-mesh p-2 xl:p-6 lg:p-6`}>
                <GlassPane className="h-full w-full margin-block-auto">
                    {props.children}
                </GlassPane>
            </body>
        </html>
    );
}
