import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase, userColsRef } from '~/lib/firebase';
import type { User } from 'firebase/auth';
import type { UserDocType } from '~/lib/firebase_doctypes';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

/*
   Hook to remember logged-in user
*/
export function useUserCredentials(): [
   UserDocType | null,
   React.Dispatch<React.SetStateAction<UserDocType | null>>
] {
   const [loggedInUser, ,] = useAuthState(firebase.firebaseAuth);
   const [user, setUser] = useState<UserDocType | null>(null);
   useEffect(() => {
      setUser(loggedInUser as UserDocType);
      const user_email = loggedInUser?.email;
      const user_doc = doc(userColsRef, `${user_email}`);

      let unSub: any = undefined;
      if (loggedInUser) {
         unSub = onSnapshot(user_doc, (doc) => {
            setUser({ ...loggedInUser, ...doc.data() } as UserDocType);
         });
      }

      return () => {
         if (typeof unSub == 'function') unSub();
      };
   }, [loggedInUser]);
   return [user, setUser];
}
