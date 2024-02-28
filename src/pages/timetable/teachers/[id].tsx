import Timetable from '~/components/Timetable';

import { useRouter } from 'next/router';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';

import { doc, getDoc, getDocs } from 'firebase/firestore';
import { teachersTimetableCol } from '~/lib/firebase';

import { motion } from 'framer-motion';
import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import { SocialLinks } from '~/components/seo/Seo';
import { GetStaticPropsContext } from 'next';
import { TimetableData, TimetableDocType, TimetableResponseType } from '~/types/typedef';

import { useTimeout, useToast } from '@chakra-ui/react';
import PromotionToast from '~/components/design/PromotionToast';
import MainAnimator from '~/components/design/MainAnimator';
import { ROUTING } from '~/lib/constant';

export async function getStaticPaths() {
  const timetable_docs = await getDocs(teachersTimetableCol);
  const paths = timetable_docs.docs.map((doc) => ({ params: { id: doc.id } }));

  return {
    paths,
    fallback: 'blocking' // can also be true or 'blocking'
  };
}

interface TimetableDoc extends TimetableDocType {
  id: string;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params!.id;

  const docRef = doc(teachersTimetableCol, id as string);
  const docData = await getDoc(docRef);

  return {
    props: {
      timetable: { id: docRef.id, ...docData.data() }
    },
    revalidate: 30
  };
}

interface GetStaticPropsReturnType extends TimetableDocType {
  id: string;
}

export default function TimetablePage({ timetable }: { timetable: GetStaticPropsReturnType }) {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => () => toast.closeAll(), []);

  useTimeout(() => {
    toast({
      position: 'bottom',
      colorScheme: 'gray',
      duration: 1000 * 60,
      render: () => (
        <PromotionToast
          closeHandler={() => {
            toast.closeAll();
          }}
        />
      )
    });
  }, 2000);

  useEffect(() => {
    if (!timetable.timetable) router.push(ROUTING.teachers);
  }, []);

  return (
    <>
      <Head>
        <title>LGU Timetable</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content={`A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Teacher Timetable Page`}
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms`}
        />

        <SocialLinks />
      </Head>
      <MainAnimator>
        {timetable.timetable && <TimetableRenderer timetable={timetable} />}
      </MainAnimator>
    </>
  );
}

function TimetableRenderer({ timetable }: { timetable: any }) {
  const [timetableData, setTimetableData] = useState<any>();

  useEffect(() => {
    setTimetableData(timetable);
  }, []);

  return (
    <>
      {!timetableData && (
        <Center color={'green.600'}>
          <ClipLoader cssOverride={{ width: '6rem', height: '6rem' }} color="white" />
        </Center>
      )}

      {timetableData && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, type: 'keyframes' }}>
          <Timetable metaData={timetable.id} timetableData={timetableData} />
        </motion.div>
      )}
    </>
  );
}
