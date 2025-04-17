import Timetable from '~/components/Timetable';

import { useRouter } from 'next/router';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import { SocialLinks } from '~/components/seo/Seo';
import { GetStaticPropsContext } from 'next';
import { TimetableData, TimetableDocType } from '~/types/typedef';

import { useTimeout, useToast } from '@chakra-ui/react';
import PromotionToast from '~/components/design/PromotionToast';
import MainAnimator from '~/components/design/MainAnimator';
import { APIS_ENDPOINTS, ROUTING } from '~/lib/constant';
import axios from 'axios';
import { decrypt } from '~/lib/cipher';
import getAd from '~/lib/ads';
import StructuredData from '~/components/StructuredData';

export async function getStaticPaths() {
  const { data } = await axios.get(APIS_ENDPOINTS.ROOM_PATHS);
  const paths = decrypt<string[]>(data).map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: true
  };
}

interface TimetableDoc extends TimetableDocType {
  id: string;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params!.id;
  const { data } = await axios.get(`${APIS_ENDPOINTS.TIMETABLE}${id}.json`);
  const timetable = decrypt(data);

  return {
    props: {
      timetable: { id: timetable.uid, paramId: id, room: timetable.uid, ...timetable }
    }
  };
}

interface GetStaticPropsReturnType extends TimetableDocType {
  id: string;
  paramId: string;
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
    if (!timetable || !timetable.timetable) router.push('/timetable');
  }, []);

  if (!timetable || !timetable.timetable) return <>Not Found</>;

  return (
    <>
      <Head>
        <title>{timetable.id} Timetable</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta
          name="description"
          content={`A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Teacher Timetable Page`}
        />

        <meta
          name="keywords"
          content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms`}
        />

        <StructuredData
          path="/timetable"
          additionalBreadCrumbCBs={[
            (baseUrl) => ({
              name: `${timetable.id}`,
              url: `${baseUrl}/timetable/${timetable.paramId}`
            })
          ]}
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
  const [ad] = useState<ReturnType<typeof getAd>>(() => getAd());

  return (
    <>
      {!timetable && (
        <Center color={'green.600'}>
          <ClipLoader cssOverride={{ width: '6rem', height: '6rem' }} color="white" />
        </Center>
      )}

      {timetable && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, type: 'keyframes' }}>
          <Timetable metaData={timetable.id} timetableData={timetable} ad={ad} />
        </motion.div>
      )}
    </>
  );
}
