import axios from 'axios';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { SocialLinks } from '~/components/seo/Seo';

import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';

import { RoomActivitiesStateType, TimetableDocType } from '~/types/typedef';

import { calculateTimeActivities, getDepartments } from '~/lib/util';
import Loader from '~/components/design/Loader';
import { Center } from '@chakra-ui/react';
import Button from '~/components/design/Button';
import { useEffect, useMemo, useState } from 'react';
import MainAnimator from '~/components/design/MainAnimator';
import { APIS_ENDPOINTS } from '~/lib/constant';
import { decrypt } from '~/lib/cipher';
import RoomActivities from '~/components/RoomActivities';
import StructuredData from '~/components/StructuredData';

/**
 * @param context
 * @returns all timetables
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const { data } = await axios.get(APIS_ENDPOINTS.ALL_TIMETABLES);
  const timetables = decrypt(data);

  return {
    props: {
      timetables
    }
  };
}

export default function RoomActivitiesPage({
  timetables
}: {
  timetables: Array<TimetableDocType>;
}) {
  useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.room_activities);

  const [state, setState] = useState<RoomActivitiesStateType>({
    loading: true,
    time: new Date(),
    customDate: null,
    rooms: []
  });

  const departments = useMemo(() => getDepartments(timetables), [timetables]);

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
          rooms: calculateTimeActivities(
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
        <title>LGU Room Activities</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. View Room Activities."
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, room activities`}
        />

        <SocialLinks />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

        <StructuredData path="/room-activities" />
      </Head>
      <MainAnimator>
        {!state.loading && (
          <RoomActivities parentState={[state, setState]} departments={departments} />
        )}
        {state.loading && (
          <>
            <Loader>Fetching Current time...</Loader>
            <Center>
              <Button style={{ padding: '0.5rem 1.5rem 0.5rem 1.5rem' }}>Go Back</Button>
            </Center>
          </>
        )}
        <Center py={6}>
          Timetable Updated At: {new Date(timetables[0].updatedAt).toDateString()}
        </Center>
      </MainAnimator>
    </>
  );
}
