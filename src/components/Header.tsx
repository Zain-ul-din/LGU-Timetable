import styles from '~/styles/header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import handleGlowBlob from '~/lib/glow';

import { Secular_One } from 'next/font/google';
import { FcGoogle } from 'react-icons/fc';
import { Button as Btn, Button, HStack } from '@chakra-ui/react';

import { signInWithPopup, GoogleAuthProvider, UserCredential, User } from 'firebase/auth';
import { firebase } from '~/lib/firebase';
import {
  FIREBASE_ANALYTICS_EVENTS,
  addLoggedInUser,
  reportFirebaseAnalytics
} from '~/lib/FirebaseAnalysis';
import { useContext, useEffect } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ROUTING } from '~/lib/constant';

const secular_One = Secular_One({ subsets: ['latin'], weight: '400' });

export default function Header() {
  const user = useContext(UserCredentialsContext);

  useEffect(() => {
    if(!user.user) return;
    addLoggedInUser(user.user as User);
  }, [user])
  
  return (
    <div
      className={styles.header_wrapper + ' ' + 'glow glow_sm' + ' roboto'}
      onMouseMove={(e) => handleGlowBlob(e)}>
      <div className={styles.header + ' ' + secular_One.className}>
        <h1>
          <Link href={'/'}>LGU</Link>
        </h1>

        <div className={styles.items}>
          {user?.user ? (
            <LoggedIn user={user.user as User} />
          ) : (
            <NotLoggedIn text={'Sign in with Google'} />
          )}
        </div>
      </div>
    </div>
  );
}

export const NotLoggedIn = ({ text, isLoading }: { text: string; isLoading?: boolean }) => {
  return (
    <Btn
      colorScheme="linkedin"
      onClick={(e) => {
        signInWithPopup(firebase.firebaseAuth, new GoogleAuthProvider());
        // .then(
         // (data: UserCredential) => 
        // );
      }}
      fontWeight={'bold'}
      isLoading={isLoading}>
      {text}
      <i style={{ margin: '0rem 0.1rem 0rem 0.3rem' }}>
        <FcGoogle />
      </i>
    </Btn>
  );
};

const LoggedIn = ({ user }: { user: User }) => {
  const router = useRouter();

  return (
    <>
      <HStack alignItems={'center'}>
        <Button
          fontWeight={'normal'}
          border={'1px solid var(--border-color)'}
          onClick={() => {
            reportFirebaseAnalytics(FIREBASE_ANALYTICS_EVENTS.updated_timetable, {});
            router.push(ROUTING.developer);
          }}>
          Update Timetable
        </Button>
        <Link href="/profile">
          <Tooltip
            background={'var(--bg-color)'}
            color={'white'}
            border={'1px solid var(--border-color)'}
            label="profile link"
            fontSize={'1xl'}
            className="roboto">
            <Image
              src={user.photoURL as string}
              alt={'user_avatar'}
              width={40}
              height={40}
              style={{
                borderRadius: '50%',
                border: '1px solid var(--border-color)',
                transform: 'translateY(1px)'
              }}
            />
          </Tooltip>
        </Link>
      </HStack>
    </>
  );
};
