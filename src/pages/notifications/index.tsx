import Head from 'next/head';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';
import MainAnimator from '~/components/design/MainAnimator';

// not implemented yet
export default function Index() {
    useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.notifications);

    return (
        <>
            <Head>
                <title>Lgu timetable Discussions</title>

                <meta
                    name="description"
                    content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS."
                />

                <meta
                    name="keywords"
                    content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms`}
                />

                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MainAnimator style={{ height: 'auto', padding: '0.2rem' }}>
                {/* <PreviewWrapper> */}
                <AdminLayout>
                    <Content />
                </AdminLayout>
                {/* </PreviewWrapper> */}
            </MainAnimator>
        </>
    );
}

import ChatRoom from '~/components/chat_room/ChatRoom';
import PreviewWrapper from '~/components/design/PreviewWrapper';
import AdminLayout from '~/components/admin/layout';

const Content = () => <ChatRoom />;
