import '~/styles/globals.css';
import type { AppProps } from 'next/app';

import { useState } from 'react';
import { useRouter } from 'next/router';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NextNProgress from 'nextjs-progressbar';
import DarkTheme from '~/components/design/DarkTheme';
// import BgGlow from '~/components/BgGlow';
import { AppStyleProvider, appTheme } from '~/styles/Style';

import OneTap from '~/components/OneTap';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { useUserCredentials } from '~/hooks/hooks';

import ChatAppStateProvider, {
  AppState as ChatAppState,
  defaultState as defaultChatAppState
} from '~/components/chat_room/hooks/AppStateProvider';
import { ROUTING } from '~/lib/constant';
import { useReferrer } from '~/hooks/useReferrer';
import PalestineSupportBanner from '~/components/announcements/PalestineSupportBanner';
import NewFeature from '~/components/design/NewFeature';
import PastPaperToast from '~/components/pastpaper/PastPapersToast';
import React from 'react';

// import NewFeature from '~/components/design/NewFeature';
// import UpComingEvent from '~/components/design/UpCommingEvent';
// import { Flex, Text } from '@chakra-ui/react';
// import Link from 'next/link';

const footerPages = ['/', '/contribute', '/developer', '/freeclassrooms'];
const excludeHeadPages = ['/contribute'];

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useUserCredentials();
  const router = useRouter();

  /*
   * chat app state for caching
   */
  const [chatAppState, setChatAppState] = useState<ChatAppState>(defaultChatAppState);

  /*
   * helps new users to redirect directly to timetable section for better UX
   */
  // disabled due to google crawler is complaining about redirect pages
  // useReferrer({
  //     redirectTo: 'timetable'
  // })

  return (
    <>
      <UserCredentialsContext.Provider value={{ user, setUser }}>
        {/* <BgGlow /> */}
        <NextNProgress color="var(--loader-color)" />
        <AppStyleProvider theme={appTheme}>
          <DarkTheme />
          <OneTap />

          {/* <Flex justify={'center'} bg={'blue.300'} alignItems={'center'} py={4}>
            <Text fontSize={'xl'}>
              To know current status of this project check
              <Link
                style={{ textDecoration: 'underline', marginLeft: '0.4rem' }}
                href={'https://github.com/Zain-ul-din/LGU-Timetable/issues/40'}
                target="_blank">
                this link
              </Link>
            </Text>
          </Flex> */}

          <PalestineSupportBanner hideMessage={!footerPages.includes(router.pathname)} />
          {/* <PastPaperToast /> */}

          {/* {!excludeHeadPages.includes(router.pathname) && (
            <NewFeature
              name="Timetable Clash Resolver"
              description={`
                            Welcome to our Timetable Clash Resolution Tool, created for students like you who are dealing with course scheduling challenges at university. We know it can be tough to create a schedule without conflicts. Don't worry! Our easy-to-use tool helps you design your perfect timetable without any overlapping classes.
                        `}
              link={ROUTING.clash_resolver}
              timeOut={1000}
            />
          )} */}

          {/*<Center>
                        <UpComingEvent/>
                    </Center>*/}

          {!excludeHeadPages.includes(router.pathname) && (
            <Header clampWidth={router.pathname === '/'} />
          )}
          <ChatAppStateProvider.Provider value={[chatAppState, setChatAppState]}>
            <Component {...pageProps} />
          </ChatAppStateProvider.Provider>
          {footerPages.includes(router.pathname) && <Footer fixedBottom={false} />}
          {(router.pathname.includes('/timetable/') || router.pathname.includes('/blogs')) && (
            <Footer fixedBottom={false} />
          )}
        </AppStyleProvider>
      </UserCredentialsContext.Provider>
    </>
  );
}
