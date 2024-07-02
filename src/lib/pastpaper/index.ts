import {
  collection,
  orderBy,
  query,
  limit,
  where,
  startAt,
  getDocs,
  DocumentReference,
  onSnapshot,
  doc,
  getDoc
} from 'firebase/firestore';
import { firebase, pastPapersCol } from '../firebase';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PastPaperDocType } from './types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { fromFirebaseTimeStamp } from '../util';

const ARBITRARY_LIMIT = 1000;

/**
 * Fetch Basic feed for home page
 */
async function fetchFeed(lastDocRef: unknown) {
  const q = lastDocRef
    ? query(
        pastPapersCol,
        limit(ARBITRARY_LIMIT),
        orderBy('upload_at', 'desc'),
        startAt(lastDocRef)
      )
    : query(pastPapersCol, limit(ARBITRARY_LIMIT), orderBy('upload_at', 'desc'));
  return getDocs(q);
}

export const usePastPaperPagination = (): [
  PastPaperDocType[],
  {
    fetchMore: () => void;
    validate: (uid: string) => void;
  }
] => {
  const [pastPapers, setPastPapers] = useState<PastPaperDocType[]>([]);
  const [user] = useAuthState(firebase.firebaseAuth);
  const [userUploads, setUserUploads] = useState<PastPaperDocType[]>([]);
  const [lastDocRef, setLastDocRef] = useState<unknown>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const initialFeedSnapShot = await fetchFeed(undefined);
      const initialFeed = initialFeedSnapShot.docs.map((doc) => doc.data() as PastPaperDocType);
      setPastPapers(initialFeed);
      setLastDocRef(initialFeedSnapShot.docs.at(-1));
    };

    fetchData();
  }, []);

  // listen for current user uploads
  useEffect(() => {
    if (!user) return;
    const q = query(
      pastPapersCol,
      where('uploader_uid', '==', user.uid),
      orderBy('upload_at', 'desc')
    );
    const unSub = onSnapshot(q, (snapShot) => {
      const docs = snapShot.docs.map((doc) => doc.data() as PastPaperDocType);
      setUserUploads(docs);
    });

    return () => unSub();
  }, [user]);

  const fetchMore = useCallback(async () => {
    if (lastDocRef == undefined) return;
    const snapShot = await fetchFeed(null);
    const newDocs = snapShot.docs.map((doc) => doc.data() as PastPaperDocType);
    setPastPapers((prev) => [...prev, ...newDocs]);
  }, [lastDocRef]);

  const validate = useCallback(async (uid: string) => {
    const docRef = doc(pastPapersCol, uid);
    const snapShot = await getDoc(docRef);
    if (!snapShot.exists) return;
    setPastPapers((prev) => [snapShot.data() as PastPaperDocType, ...prev]);
  }, []);

  const pastPapersAfterFilter = useMemo(() => {
    const filteredRes = [...userUploads, ...pastPapers]
      .filter((res, idx, self) => {
        return idx === self.findIndex((item) => item.uid === res.uid);
      })
      .filter((ele) => ele.deleted === false)
      .sort((a, b) => {
        const aDate = fromFirebaseTimeStamp(a.upload_at);
        const bDate = fromFirebaseTimeStamp(b.upload_at);
        return bDate.getTime() - aDate.getTime();
      });

    return filteredRes;
  }, [pastPapers, userUploads]);

  return [
    pastPapersAfterFilter,
    {
      fetchMore,
      validate
    }
  ];
};
