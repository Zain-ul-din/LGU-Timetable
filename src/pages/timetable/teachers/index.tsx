import Hero from '~/components/Hero';
import TimetableSelection from '~/components/TimetableSelection';
import Head from 'next/head';
import Nav from '~/components/Nav';

import { VisuallyHidden } from '@chakra-ui/react';

import { getDocs } from 'firebase/firestore';
import { teachersTimetableCol, timeTableCol } from '~/lib/firebase';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';

import { SocialLinks } from '~/components/seo/Seo';
import MainAnimator from '~/components/design/MainAnimator';
import { TimetableData, TimetableDocType } from '~/types/typedef';

import TeacherTimetableSelection from '~/components/TeachersTimetableSelection';
import axios from 'axios';
import { APIS_ENDPOINTS } from '~/lib/constant';
import { decrypt } from '~/lib/cipher';

export const getStaticProps = async (context: any) => {
  const { data } = await axios.get(APIS_ENDPOINTS.TEACHERS);
  const teachers = decrypt(data);

  return {
    props: {
      teachers
    }
  };
};

export default function Timetable({ teachers }: { teachers: Array<string> }) {
  useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.teacher_timetable);

  return (
    <>
      <Head>
        <title>LGU Teachers Timetable</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Teacher Timetable Page."
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms`}
        />

        <SocialLinks />
      </Head>
      <MainAnimator>
        <TeacherTimetableSelection teachers={teachers} />
        <VisuallyHidden>
          <SEO metaData={teachers} />
        </VisuallyHidden>
      </MainAnimator>
    </>
  );
}

const SEO = ({ metaData }: { metaData: Array<string> }) => {
  return (
    <>
      <ul>
        {metaData.map((val, key) => {
          return <li key={key}>{val}</li>;
        })}
      </ul>
    </>
  );
};
