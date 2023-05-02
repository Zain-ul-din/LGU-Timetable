import { Center } from '@chakra-ui/react';
import { useEffect, type ReactNode } from 'react';
import { firebase } from '~/lib/firebase';
import { NotLoggedIn } from '../Header';

import { useRouter } from 'next/router';
import Button from '../design/Button';

export default function AdminLayout({ children }: { children: ReactNode }) {
   if (!firebase.firebaseAuth.currentUser) {
      return (
         <Center marginY={'2rem'} fontSize={'2xl'} className="roboto" fontWeight={'bold'}>
            <NotLoggedIn text={'Sign in with Google to Access Admin Controls'} />
         </Center>
      );
   }

   return (
      <>
         {firebase.firebaseAuth.currentUser.email != process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
            <UnAuthenticated />
         ) : (
            <>{children}</>
         )}
      </>
   );
}

const UnAuthenticated = () => {
   const router = useRouter();
   return (
      <>
         <Center>
            <Button
               style={{ padding: '1rem' }}
               onClick={(e) => {
                  router.push('/');
               }}
            >
               {' '}
               <b style={{ paddingRight: '0.5rem', color: 'yellow' }}>
                  {' '}
                  User Not Authenticated!{' '}
               </b>{' '}
               Go Home
            </Button>
         </Center>
      </>
   );
};
