import '~/styles/globals.css';
import type { AppProps } from 'next/app';

import { useState } from 'react';

import type { TimetableInput } from '~/types/typedef';
import { TimeTableInputContext } from '~/hooks/TimetableInputContext';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import NextNProgress from 'nextjs-progressbar';
import DarkTheme from '~/components/design/DarkTheme';

// credentials
import OneTap from '~/components/OneTap';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { useUserCredentials } from '~/hooks/hooks';
import { AppStyleProvider, appTheme } from '~/styles/Style';
import { useRouter } from 'next/router';

const footerPages = ['/', '/contribute', '/developer', '/notifications', '/freeclassrooms'];

export default function App({ Component, pageProps }: AppProps) {
   const [timeTableInput, setTimeTableInput] = useState<TimetableInput>({
      fall: null,
      semester: null,
      section: null
   });

   const [user, setUser] = useUserCredentials();
   const router = useRouter();

   return (
      <>
         <TimeTableInputContext.Provider value={{ timeTableInput, setTimeTableInput }}>
            <UserCredentialsContext.Provider value={{ user, setUser }}>
               <NextNProgress color="var(--loader-color)" />
               <AppStyleProvider theme={appTheme}>
                  <DarkTheme />
                  <OneTap />
                  {router.pathname != '/contribute' && <Header />}
                  <Component {...pageProps} />
                  {footerPages.includes(router.pathname) && <Footer fixedBottom={false} />}
                  {router.pathname.includes('/timetable/') && <Footer fixedBottom={false} />}
               </AppStyleProvider>
            </UserCredentialsContext.Provider>
         </TimeTableInputContext.Provider>
      </>
   );
}
