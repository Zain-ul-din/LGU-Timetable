import Head from 'next/head';
import FreeClassRooms from '~/components/FreeClassRooms';
import { SocialLinks } from '~/components/seo/Seo';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';

export default function FreeClassRoomsPage() {

   useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.free_classrooms);
   
   return (
      <>
         <Head>
            <title>Lgu Free Classrooms</title>
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
         <FreeClassRooms />
      </>
   );
}
