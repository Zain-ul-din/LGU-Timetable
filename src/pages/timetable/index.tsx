import Hero from '~/components/Hero';
import TimetableSelection from '~/components/TimetableSelection';
import Head from 'next/head';
import Nav from '~/components/Nav';

import { VisuallyHidden } from '@chakra-ui/react';

import { getDocs } from 'firebase/firestore';
import { metaDataCol } from '~/lib/firebase';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';

import { SocialLinks } from '~/components/seo/Seo';
import MainAnimator from '~/components/design/MainAnimator';

export const getStaticProps = async (context: any) => {
   const metaData_docs = await getDocs(metaDataCol);
   const metaData = metaData_docs.docs
      .map((doc) => doc.data())
      .reduce((acc, curr) => {
         const [key, val] = Object.entries(curr)[0];
         return { ...acc, [key]: val };
      }, {});

   return {
      props: {
         metaData
      }
   };
};

export default function Timetable({ metaData }: any) {
   useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.time_table);

   const keyWords = Object.entries(metaData).map(([fall, semesters]) => {
      return (
         fall +
         ' department ' +
         Object.entries(semesters as any).map(([semester, sections]) => {
            return semester + ' ' + (sections as Array<string>).map((sec) => sec);
         })
      );
   });

   return (
      <>
         <Head>
            <title>LGU Timetable Selection</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <meta
               name="description"
               content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Timetable Selection Page."
            />

            <meta
               name="keywords"
               content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms ${keyWords.toString()}`}
            />

            <SocialLinks />
         </Head>
         <MainAnimator>
            <VisuallyHidden>
               <SEO metaData={metaData} />
            </VisuallyHidden>
            <Nav />
            <Hero renderDescription={false} />
            <TimetableSelection metaData={metaData} />
         </MainAnimator>
      </>
   );
}

const SEO = ({ metaData }: { metaData: any }) => {
   return (
      <>
         {Object.entries(metaData).map(([fall, val]: [any, any], idx) => {
            return (
               <div key={idx}>
                  <h1>{fall}</h1>
                  {Object.entries(val).map(([semester, secs]: [any, any], i) => {
                     return (
                        <span key={i}>
                           <h2>{semester}</h2>
                           <ul>
                              {secs.map((sec: any, uid: number) => {
                                 return <li key={uid}>{sec}</li>;
                              })}
                           </ul>
                        </span>
                     );
                  })}
               </div>
            );
         })}
      </>
   );
};
