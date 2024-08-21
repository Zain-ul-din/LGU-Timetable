import Developer from '~/components/Developer';
import Head from 'next/head';
import APIDocs from '~/components/APIDocs';
import { FIREBASE_ANALYTICS_EVENTS, useFirebaseAnalyticsReport } from '~/lib/FirebaseAnalysis';
import { SocialLinks } from '~/components/seo/Seo';
import { docsCol } from '~/lib/firebase';
import { getDocs } from 'firebase/firestore';
import { IApiDoc } from '~/types/typedef';
import MainAnimator from '~/components/design/MainAnimator';
import ArticleAd from '~/components/Ads/ArticleAd';

export const getStaticProps = async (context: any) => {
  const docs = await getDocs(docsCol);
  const res = docs.docs.map((doc) => ({ id: doc.id, docData: doc.data().doc }));

  return {
    props: {
      docs: res
    },
    revalidate: 5
  };
};

export default function DeveloperDashboard({ docs }: { docs: Array<IApiDoc> }) {
  useFirebaseAnalyticsReport(FIREBASE_ANALYTICS_EVENTS.developer);

  const keyWords = docs.map((doc) => {
    return doc.id;
  });

  return (
    <>
      <Head>
        <title>LGU Timetable - Developer APIS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Get you api key to make your own timetable application."
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms, developer, c++, python, javascript, node js, lgu apis, lgu developer apis, lgu timetable apis, lgu apis for timetable, lgu apis, lgu apis examples, lgu apis github, ${keyWords}`}
        />

        <SocialLinks />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Blob/> */}
      <MainAnimator>
        <Developer>
          <APIDocs staticDocs={docs} />
        </Developer>

        {/* @article-ads */}
        <ArticleAd />
      </MainAnimator>
    </>
  );
}
