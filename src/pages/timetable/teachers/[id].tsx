import Timetable from '~/components/Timetable';

import { useRouter } from 'next/router';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useState } from 'react';

import { doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { timeTableCol } from '~/lib/firebase';

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
    const timetable_docs = await getDocs(timeTableCol);
    
    const res: Array<TimetableDocType> = timetable_docs.docs.map(doc => doc.data()) as Array<TimetableDocType>;
 
    const filterQuery =res
     .map(timetableData => Object.entries(timetableData.timetable)
         .map(([_, val]: [string, Array<TimetableData>])=> val
         .map (data => data.teacher)
         ).reduce((acc, curr)=> acc.concat(curr),[])
     ).reduce((acc, curr)=> acc.concat(curr),[])
     
    /**@ts-ignore */
    const teachers = [... new Set(filterQuery)]
 
   const paths = teachers.map((name) => ({ params: { id: name } }));

   return {
      paths,
      fallback: 'blocking' // can also be true or 'blocking'
   };
}

interface TimetableDoc extends TimetableDocType
{
    id: string
}

export async function getStaticProps(context: GetStaticPropsContext) {
   const id = context.params!.id;

   const docsRef = await getDocs(timeTableCol) ;
   
   const timetable: TimetableDocType = {
        updatedAt: '',
        timetable: {
            Monday: [],
            Friday: [],
            Thursday: [],
            Saturday: [],
            Sunday: [],
            Tuesday: [],
            Wednesday: []
        }
   }
   
   const data = docsRef.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Array<TimetableDoc>
   
   data.forEach(d => {
        Object.entries(d.timetable).forEach(([day, lectures]: [string, Array<TimetableData>])=> {
            lectures.forEach(lecture => {
                if (lecture.teacher == id)
                    timetable.timetable[day as keyof TimetableResponseType]?.push({class: d.id,...lecture});
            })
        })
   })
   
   timetable.updatedAt = data[0].updatedAt;

   return {
      props: {
         timetable: { id: id, ...timetable }
      },
      revalidate: 5000
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
        if (Object.entries(timetable.timetable)
        .filter(([key, val])=> val.length > 0).length == 0)
            router.push(ROUTING.teachers);
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
               transition={{ duration: 0.1, type: 'keyframes' }}
            >
               <Timetable metaData={timetable.id} timetableData={timetableData} />
            </motion.div>
         )}
      </>
   );
}
