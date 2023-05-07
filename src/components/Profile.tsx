import styles from '~/styles/profile.module.css';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { signOut } from 'firebase/auth';
import { firebase } from '~/lib/firebase';
import Button from './design/Button';

import { Icon, List, ListItem, Switch, Text } from '@chakra-ui/react';

export default function Profile() {
   const user = useContext(UserCredentialsContext);

   return (
      <>
         {user?.user ? (
            <div className={styles.profile + ' roboto'}>
               <h1>PROFILE</h1>

               <div className={styles.credentials}>
                  <Image
                     src={user.user.photoURL as string}
                     alt="user_photo"
                     width={150}
                     height={150}
                  />
                  <div>
                     <h1>{user.user.displayName}</h1>
                     <p>Email: {user.user.email}</p>
                     {/* <p>
                        Public Profile <Switch colorScheme={'green'} size={'md'}/>
                     </p> */}
                     <Button
                        onClick={(e) => {
                           signOut(firebase.firebaseAuth);
                        }}
                     >
                        SignOut
                     </Button>
                  </div>
               </div>
               <History />
            </div>
         ) : (
            <>
               <Center marginY={'2rem'} fontSize={'1xl'} className="roboto">
                  <NotLoggedIn text={'Sign in with Google to Join'} />
               </Center>
               <Center>
                  <Box fontSize={'xl'} padding={'1rem'} textAlign={'center'}>
                     Unlock a personalized experience with instant access to your{' '}
                     <Box color={'whatsapp.400'} display={'inline'}>
                        {' '}
                        timetable selection history
                     </Box>
                     ,{' '}
                     <Box color={'whatsapp.400'} display={'inline'}>
                        {' '}
                        community support
                     </Box>
                     , and
                     <Box color={'whatsapp.400'} display={'inline'}>
                        {' '}
                        developer APIs.
                     </Box>{' '}
                     by simply logging in with your
                     <Box color={'whatsapp.400'} display={'inline'}>
                        {' '}
                        Google account.
                     </Box>
                     and much more
                  </Box>
               </Center>
            </>
         )}
      </>
   );
}

import { Flex, Heading, useMediaQuery, Box, Center } from '@chakra-ui/react';
import { removeDuplicateTimetableHistory } from '~/lib/util';

import {
   FieldValue,
   doc,
   getDocs,
   increment,
   limit,
   orderBy,
   query,
   updateDoc,
   where
} from 'firebase/firestore';
import { timetableHistoryCol } from '~/lib/firebase';
import Link from 'next/link';

import { ITimetableHistory } from '~/types/typedef';
import { NotLoggedIn } from './Header';

interface IHistoryDocStateType extends ITimetableHistory {
   docId: string;
}

const History = () => {
   const [isUnder600] = useMediaQuery('(max-width: 600px)');
   const [history, setHistory] = useState<Array<IHistoryDocStateType>>([]);

   const user = useContext(UserCredentialsContext);

   useEffect(() => {
      if (!user?.user) return;
      const fetchTimetableHistory = async () => {
         const timetableHistoryQuery = query(
            timetableHistoryCol,
            limit(50),
            where('email', '==', user.user?.email),
            orderBy('createdAt', 'desc')
         );
         const timetableHistoryDocs = await getDocs(timetableHistoryQuery);
         const res = timetableHistoryDocs.docs.map((historyDoc) => ({
            docId: historyDoc.id,
            ...historyDoc.data()
         }));

         setHistory(res as Array<IHistoryDocStateType>);
      };

      fetchTimetableHistory();
   }, [user]);

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
                        onClick={() => {
                           const historyDoc = doc(
                              timetableHistoryCol,
                              (history as IHistoryDocStateType).docId
                           );
                           updateDoc(historyDoc, {
                              clickCount: increment(1)
                           });
                        }}
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
         </Flex>
      </>
   );
};
