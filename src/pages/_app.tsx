import '~/styles/globals.css';
import type { AppProps } from 'next/app';

import { useState } from 'react';
import { useRouter } from 'next/router';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NextNProgress from 'nextjs-progressbar';
import DarkTheme from '~/components/design/DarkTheme';
import BgGlow from '~/components/BgGlow';
import { AppStyleProvider, appTheme } from '~/styles/Style';

// credentials
import OneTap from '~/components/OneTap';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { useUserCredentials } from '~/hooks/hooks';

import ChatAppStateProvider, {
    AppState as ChatAppState,
    defaultState as defaultChatAppState
} from '~/components/chat_room/hooks/AppStateProvider';

// import UpComingEvent from '~/components/design/UpCommingEvent';
// import { Center } from '@chakra-ui/react';


const footerPages = ['/', '/contribute', '/developer', '/freeclassrooms'];
const excludeHeadPages = ['/contribute'];

export default function App({ Component, pageProps }: AppProps) {
    const [user, setUser] = useUserCredentials();
    const router = useRouter();
    
    // chat app state for caching
    const [chatAppState, setChatAppState] = useState<ChatAppState>(defaultChatAppState);

    return (
        <>
            <UserCredentialsContext.Provider value={{ user, setUser }}>
                <BgGlow />
                <NextNProgress color="var(--loader-color)" />
                <AppStyleProvider theme={appTheme}>
                    <DarkTheme />
                    <OneTap />
                    {/*<Center>
                        <UpComingEvent/>
                    </Center>*/}
                    {!excludeHeadPages.includes(router.pathname) && <Header />}
                    <ChatAppStateProvider.Provider value={[chatAppState, setChatAppState]}>
                        <Component {...pageProps} />
                    </ChatAppStateProvider.Provider>
                    {footerPages.includes(router.pathname) && <Footer fixedBottom={false} />}
                    {router.pathname.includes('/timetable/') && <Footer fixedBottom={false} />}
                </AppStyleProvider>
            </UserCredentialsContext.Provider>
        </>
    );
}
