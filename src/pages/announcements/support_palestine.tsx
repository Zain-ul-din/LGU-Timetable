import Head from 'next/head';
import Hero from '~/components/Hero';
import TableOfContent from '~/components/TableOfContent';
import SupportPalestine from '~/components/announcements/SupportPalestine';
import MainAnimator from '~/components/design/MainAnimator';
import { SocialLinks } from '~/components/seo/Seo';
import StructuredData from '~/components/StructuredData';

export default function Page() {
  return (
    <>
      <Head>
        <title>lgu time table</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Made with ❤️"
        />

        <meta
          name="keywords"
          content="LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms"
        />

        <SocialLinks />
      </Head>
      <MainAnimator>
        <SupportPalestine />
      </MainAnimator>
    </>
  );
}
