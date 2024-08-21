import Profile from '~/components/Profile';
import Head from 'next/head';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';
import { VisuallyHidden } from '@chakra-ui/react';
import { SocialLinks } from '~/components/seo/Seo';
import MainAnimator from '~/components/design/MainAnimator';

export default function ProfilePage() {
  useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.profile);

  return (
    <>
      <Head>
        <title>LGU Timetable Login</title>
        <meta
          name="description"
          content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. login to join."
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms, lgu timetable login, lgu timetable sign up`}
        />

        <SocialLinks />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainAnimator>
        <VisuallyHidden>
          <SEO />
        </VisuallyHidden>
        <Profile />
      </MainAnimator>
    </>
  );
}

const SEO = () => {
  return (
    <>
      <form name="login-form">
        <h1>Lgu timetable login</h1>
        <button>Sign Up</button>
        <button>Sign In</button>
      </form>
    </>
  );
};
