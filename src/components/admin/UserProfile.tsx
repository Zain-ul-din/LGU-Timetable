import styles from '~/styles/profile.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { userColsRef } from '~/lib/firebase';
import Button from '../design/Button';
import { Switch, Text } from '@chakra-ui/react';

export default function UserProfile({ docId }: { docId: string }) {
   const [user, setUser] = useState<UserDataDocType>();

   useEffect(() => {
      const getUser = async () => {
         const userDocRef = doc(userColsRef, docId);
         const userDoc = getDoc(userDocRef);

         setUser((await userDoc).data() as UserDataDocType | undefined);
      };

      getUser();
   }, []);

   if (!user) {
      return <Loader>Loading User Data</Loader>;
   }

   return (
      <>
         <div className={styles.profile + ' roboto'}>
            <h1>PROFILE</h1>
            <div className={styles.credentials}>
               <Image src={user.photoURL as string} alt="user_photo" width={150} height={150} />
               <div>
                  <h1>{user.displayName}</h1>
                  <p>Email: {user.email}</p>
                  <p>
                     Public Profile{' '}
                     <Switch colorScheme={'green'} size={'md'} isChecked={user.isPublic} readOnly />
                  </p>
                  <Button>SignOut</Button>
               </div>
            </div>
            <History email={user.email as string} />
         </div>
      </>
   );
}

import { Flex, Heading, useMediaQuery, Box, Center } from '@chakra-ui/react';
import { removeDuplicateTimetableHistory } from '~/lib/util';

import { doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { timetableHistoryCol } from '~/lib/firebase';
import Link from 'next/link';

import { ITimetableHistory, UserDataDocType } from '~/types/typedef';
import Loader from '../design/Loader';

const History = ({ email }: { email: string }) => {
   const [isUnder600] = useMediaQuery('(max-width: 600px)');
   const [history, setHistory] = useState<Array<ITimetableHistory>>([]);

   const [queryCounts, SetQueriesCount] = useState<number>(0);


   useEffect(() => {
      const fetchTimetableHistory = async () => {
         const timetableHistoryQuery = query(
            timetableHistoryCol,
            limit(50),
            where('email', '==', email),
            orderBy('createdAt', 'desc')
         );
         const timetableHistoryDocs = await getDocs(timetableHistoryQuery);
         const res = timetableHistoryDocs.docs.map((historyDoc) => historyDoc.data());
         
         SetQueriesCount(res.reduce((prev, curr)=> {
            let count = (curr as any).clickCount || 0
            return prev +  count;
         }, 0));

         setHistory(res as Array<ITimetableHistory>);
      };

      fetchTimetableHistory();
   }, []);

   return (
      <>
         <Flex
            paddingY={'2rem'}
            justifyContent={isUnder600 ? 'center' : 'flex-start'}
            flexDirection={'column'}
            borderBottom={'1px solid var(--border-color)'}
            borderTop={'1px solid var(--border-color)'}
            marginBottom={'1.5rem'}
         >
            <Heading className="roboto" fontWeight={'thin'} fontSize={'3xl'} padding={'1rem'}>
               {`Timetable History`.toUpperCase()}
            </Heading>
            <Text textAlign={'center'} textColor={'InfoText'}>
               {history.length == 0 && <>No history found</>}
            </Text>
            <Flex flexDirection={'column'} padding={isUnder600 ? '0.5rem' : '1rem'} gap={'0.5rem'}>
               {removeDuplicateTimetableHistory(history).map((history, idx) => {
                  return (
                     <Link
                        href={`/timetable/${history.payload.fall?.replace('/', '-')} ${
                           history.payload.semester
                        } ${history.payload.section}`}
                        key={idx}
                     >
                        <Box
                           background={'var(--card-color-dark)'}
                           padding={'1rem'}
                           textAlign={'center'}
                           borderRadius={'base'}
                           cursor={'pointer'}
                           _hover={{
                              border: '1px solid var(--border-color)',
                              background: 'var(--card-color)'
                           }}
                        >
                           {history.payload.fall?.replace('/', '-')} / {history.payload.semester} /{' '}
                           {history.payload.section}
                        </Box>
                     </Link>
                  );
               })}
            </Flex>
            <Center>
               <Text fontSize={'md'} fontFamily={'monospace'} color={'whatsapp.300'}>
                  Total Queries: {queryCounts}
               </Text>
            </Center>
         </Flex>
      </>
   );
};
