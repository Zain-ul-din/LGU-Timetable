import styles from '~/styles/header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import handleGlowBlob from '~/lib/glow';

import { Secular_One } from 'next/font/google';
import { FcGoogle } from 'react-icons/fc';
import { Button as Btn } from '@chakra-ui/react';

import { signInWithPopup, GoogleAuthProvider, UserCredential, User } from 'firebase/auth';
import { firebase } from '~/lib/firebase';
import { addLoggedInUser } from '~/lib/FirebaseAnalysis';
import { useContext } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';

import { Tooltip } from '@chakra-ui/react';

const secular_One = Secular_One({ subsets: ['latin'], weight: '400' });

export default function Header() {
   const user = useContext(UserCredentialsContext);

   return (
      <div
         className={styles.header_wrapper + ' ' + 'glow glow_sm' + ' roboto'}
         onMouseMove={(e) => handleGlowBlob(e)}
      >
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

export const NotLoggedIn = ({ text }: { text: string }) => {
   return (
      <Btn
         colorScheme="linkedin"
         onClick={(e) => {
            signInWithPopup(firebase.firebaseAuth, new GoogleAuthProvider()).then(
               (data: UserCredential) => addLoggedInUser(data.user)
            );
         }}
         fontWeight={'hairline'}
      >
         {text}
         <i style={{ margin: '0rem 0.1rem 0rem 0.3rem' }}>
            <FcGoogle />
         </i>
      </Btn>
   );
};

const LoggedIn = ({ user }: { user: User }) => {
   return (
      <Link href="/profile">
         <Tooltip
            background={'var(--bg-color)'}
            color={'white'}
            border={'1px solid var(--border-color)'}
            label="profile link"
            fontSize={'1xl'}
            className="roboto"
         >
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
   );
};
