import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import MainAnimator from '~/components/design/MainAnimator';
import PastPapers from '~/components/pastpaper/pastpapers';
import { SocialLinks } from '~/components/seo/Seo';
import AllSubjectsProvider from '~/hooks/AllSubjectsProvider';
import { decrypt } from '~/lib/cipher';
import { APIS_ENDPOINTS } from '~/lib/constant';
import { TimetableDataType, TimetableDocType } from '~/types/typedef';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { data } = await axios.get(APIS_ENDPOINTS.ALL_TIMETABLES);
  const timetables = decrypt(data) as Array<TimetableDocType>;
  const subjects = timetables
    .map(({ timetable }) =>
      Object.values(timetable)
        .map((oneDayTimetable: TimetableDataType[]) =>
          oneDayTimetable.map(({ subject }) => subject)
        )
        .flat(1)
    )
    .flat(1);
  const distSubjects = Array.from(new Set(subjects));

  return {
    props: {
      subjects: distSubjects
    }
  };
}

interface GetStaticPropsReturnType {
  subjects: string[];
}

export default function PastPaperPage({ subjects }: GetStaticPropsReturnType) {
  return (
    <>
      <Head>
        <title>Past Papers</title>

        <meta
          name="description"
          content="A non-official blazingly 🔥 fast website to access the LGU past papers"
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu past papers, past papers`}
        />

        <SocialLinks />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainAnimator>
        <AllSubjectsProvider value={subjects}>
          <PastPapers />
        </AllSubjectsProvider>
      </MainAnimator>
    </>
  );
}
