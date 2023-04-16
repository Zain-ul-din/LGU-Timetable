import Timetable from '~/components/Timetable';

import Router, { useRouter } from 'next/router';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';

import { onSnapshot, doc } from 'firebase/firestore';
import { timeTableCol } from '~/lib/firebase';

import { motion } from 'framer-motion';
import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import { SocialLinks } from '~/components/seo/Seo';

export default function TimetablePage() {
   const router = useRouter();
   const params = router.query;

   useEffect(() => {
      if (!params.slug) return;
      if (params.slug.length !== 3) Router.push('/');
   }, [params]);

   return (
      <>
         <Head>
         <title>LGU Timetable</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            
            <meta
               name="description"
               content="A non-official blazingly 🔥 fast website to access the LGU timetable and lgu timetable developer APIS. Timetable Selection Page."
            />
            
            <meta
               name="keywords"
               content={`LGU timetable, lgu time table, lgu, lgu class time table, non official lgu time table, fast lgu timetable, new lgu timetable, lgu new timetable, lgu better timetable, lgu timetable live, lgu free classes, lahore garrison university timetable, lahore garrison university new timetable, lahore garrison university fast timetable, lgu api, lgu developer apis, free classrooms`}
            />

            <SocialLinks />
         </Head>
         <TimetableRenderer params={params} />
      </>
   );
}

function TimetableRenderer({ params }: { params: any }) {
   const [timetableData, setTimetableData] = useState<any>();

   useEffect(() => {
      if (!params.slug) return;
      const timetableDoc = doc(
         timeTableCol,
         decodeURI(`${params.slug[0]} ${params.slug[1]} ${params.slug[2]}`)
      );

      const unsubscribe = onSnapshot(timetableDoc, (data) => {
         setTimetableData(data.data());
      });

      return () => {
         unsubscribe();
      };
   }, [params]);

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
               transition={{ duration: 0.1, type: 'keyframes' }}
            >
               <Timetable
                  fall={params.slug[0]}
                  semester={params.slug[1]}
                  section={params.slug[2]}
                  timetableData={timetableData}
               />
            </motion.div>
         )}
      </>
   );
}
