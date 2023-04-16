import Head from 'next/head';
import { Flex, Heading, Text } from '@chakra-ui/react';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';

// not implemented yet
export default function Index() {

   useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.notifications);
   
   return (
      <>
         <Head>
            <title>Lgu timetable Notifications</title>

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
         <Content />
      </>
   );
}

const Content = () => {
   return (
      <>
         <Flex alignItems={'center'} flexDirection={'column'} height={'72%'}>
            <Heading fontWeight={'hairline'}>{`Notifications`.toLocaleUpperCase()}</Heading>
            <Flex
               marginTop={'2rem'}
               paddingY={'2rem'}
               background={'var(--card-color)'}
               width={'90%'}
               borderRadius={'md'}
               alignItems={'center'}
               justifyContent={'center'}
               height={'80%'}
               border={'1px solid var(--border-color)'}
            >
               <Text color={'cyan.400'} fontWeight={'thin'} fontSize={'xl'}>
                  No notification so far
               </Text>
            </Flex>
         </Flex>
      </>
   );
};
