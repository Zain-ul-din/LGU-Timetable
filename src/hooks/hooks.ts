import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from '~/lib/firebase';
import type { User } from 'firebase/auth';

/*
    Hook to remember logged-in user
*/
export function useUserCredentials(): [
   User | null,
   React.Dispatch<React.SetStateAction<User | null>>
] {
   const [loggedInUser, ,] = useAuthState(firebase.firebaseAuth);
   const [user, setUser] = useState<User | null>(null);
   useEffect(() => setUser(loggedInUser as User), [loggedInUser]);
   return [user, setUser];
}
