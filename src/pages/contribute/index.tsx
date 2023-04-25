import Contribute from '~/components/Contribute';
import Head from 'next/head';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';
import { VisuallyHidden } from '@chakra-ui/react';
import { ContributeSocialLinks, SocialLinks } from '~/components/seo/Seo';
import Header from '~/components/Header';
import MainAnimator from '~/components/design/MainAnimator';

export default function ContributePage() {
   useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.contribute);

   return (
      <>
         <Head>
            <title>Lgu timetable Contribution</title>

            <meta
               name="description"
               content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS."
            />

            <meta
               name="keywords"
               content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms`}
            />

            <ContributeSocialLinks />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         {/* <Blob/> */}
         <MainAnimator>
            <Header />
            <VisuallyHidden>
               <SEO />
            </VisuallyHidden>
            <Contribute />
         </MainAnimator>
      </>
   );
}

const SEO = () => {
   return (
      <>
         <article>
            <title>Contribute on Github</title>
            <p>Contribute to this project on github</p>
         </article>
      </>
   );
};
