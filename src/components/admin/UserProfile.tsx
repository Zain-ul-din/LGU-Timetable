import { useEffect, useState } from 'react';
import { userColsRef } from '~/lib/firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import Loader from '../design/Loader';
import Profile from '../design/UserProfile';
import { UserDocType } from '~/lib/firebase_doctypes';

export default function UserProfile({ docId }: { docId: string }) {
    const [user, setUser] = useState<UserDocType>();

    useEffect(() => {
        const userDocRef = doc(userColsRef, docId);
        const unSub = onSnapshot(userDocRef, (user) => {
            setUser(user.data() as UserDocType);
        });

        return () => unSub();
    }, []);

    if (!user) {
        return <Loader>Loading User Data</Loader>;
    }

    return <Profile user={user} adminView={true} />;
}
