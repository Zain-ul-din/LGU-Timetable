import axios from 'axios';
import { getDocs } from 'firebase/firestore';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import FreeClassRooms from '~/components/FreeClassRooms';
import { SocialLinks } from '~/components/seo/Seo';

import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';

import { timeTableCol } from '~/lib/firebase';
import { FreeClassRoomStateType, TimetableDocType } from '~/types/typedef';

import { calculateFreeClassrooms } from '~/lib/util';
import Loader from '~/components/design/Loader';
import { Center } from '@chakra-ui/react';
import Button from '~/components/design/Button';
import { useEffect, useState } from 'react';
import MainAnimator from '~/components/design/MainAnimator';

export async function getStaticProps(context: GetStaticPropsContext) {
  const timetableDocSpanShot = await getDocs(timeTableCol);

  const timetables: Array<TimetableDocType> = timetableDocSpanShot.docs.map((timetable) =>
    timetable.data()
  ) as Array<TimetableDocType>;

  return {
    props: {
      timetables,
      revalidate: 60
    }
  };
}

export default function FreeClassRoomsPage({
  timetables
}: {
  timetables: Array<TimetableDocType>;
}) {
  useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.free_classrooms);

  const [state, setState] = useState<FreeClassRoomStateType>({
    loading: true,
    time: new Date(),
    customDate: null,
    freeClassRooms: []
  });

  useEffect(() => {
    const fetchTime = async () => {
      const currTime = new Date(
        (await axios.get('http://worldtimeapi.org/api/timezone/Asia/Karachi')).data.datetime
      );
      setState({ ...state, time: currTime, loading: false });
    };

    fetchTime();

    const timeUpdater = setInterval(() => {
      const updatedTime = state.time;
      updatedTime.setSeconds(state.time.getSeconds() + 1);
      setState((prev) => {
        return {
          ...prev,
          freeClassRooms: calculateFreeClassrooms(
            timetables,
            prev.customDate ? prev.customDate : updatedTime
          ),
          time: updatedTime,
          loading: false
        };
      });
    }, 1000);

    return () => clearInterval(timeUpdater);
  }, []);

  return (
    <>
      <Head>
        <title>Lgu free classrooms</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Get you api key to make your own timetable application."
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms, developer, c++, python, javascript, node js, lgu apis, lgu developer apis, lgu timetable apis, lgu apis for timetable, lgu apis, lgu apis examples, lgu apis github, lgu free classrooms`}
        />

        <SocialLinks />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainAnimator>
        {!state.loading && (
          <>
            <FreeClassRooms parentState={[state, setState]} />
          </>
        )}
        {state.loading && (
          <>
            <Loader>Calculating Free Classrooms...</Loader>
            <Center>
              <Button style={{ padding: '0.5rem 1.5rem 0.5rem 1.5rem' }}>Go Back</Button>
            </Center>
          </>
        )}
        <Center>Timetable Updated At: {new Date(timetables[0].updatedAt).toDateString()}</Center>
      </MainAnimator>
    </>
  );
}
