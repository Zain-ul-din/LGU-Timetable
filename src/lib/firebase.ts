// Firebase entry point

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { Analytics } from 'firebase/analytics';
import type { FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId
};

interface InitializeFirebaseAppType {
  firebaseApp: FirebaseApp;
  firebaseAuth: Auth;
  firebaseStore: Firestore;
  firebaseAnalytics: Analytics | null;
  firebaseStorage: FirebaseStorage;
}

function initializeFirebaseApp(): InitializeFirebaseAppType {
  const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
  const firebaseAuth: Auth = getAuth(firebaseApp);
  const firebaseStore: Firestore = getFirestore(firebaseApp);
  const firebaseAnalytics: Analytics | null =
    typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null;
  const firebaseStorage = getStorage(firebaseApp);

  return {
    firebaseApp,
    firebaseAuth,
    firebaseStore,
    firebaseAnalytics,
    firebaseStorage
  };
}

export const firebase: InitializeFirebaseAppType = initializeFirebaseApp();

// Collections
export const metaDataCol = collection(firebase.firebaseStore, 'meta_data');
export const timeTableCol = collection(firebase.firebaseStore, 'timetable');
export const docsCol = collection(firebase.firebaseStore, 'docs');
export const timetableHistoryCol = collection(firebase.firebaseStore, 'timetable_history');
export const apiAnalysisCol = collection(firebase.firebaseStore, 'api_analysis');
export const userColsRef = collection(firebase.firebaseStore, 'users_data');
export const teachersTimetableCol = collection(firebase.firebaseStore, 'teachers_timetable');
export const roomsTimetableCol = collection(firebase.firebaseStore, 'rooms_timetable');
export const pastPapersCol = collection(firebase.firebaseStore, 'past_papers');
export const pastPapersInputCol = collection(firebase.firebaseStore, 'past_papers_input');
export const discussionsColRef = collection(firebase.firebaseStore, 'discussions');
export const discussionsCommentsColRef = collection(firebase.firebaseStore, 'discussions_comments');
export const workFlowColRef = collection(firebase.firebaseStore, 'workflow');
export const discussionSubColName = 'participants';
export const electionColRef = collection(firebase.firebaseStore, 'election');
export const newsLetterColRef = collection(firebase.firebaseStore, 'news_letter');

///
/// firebase storage
///


import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export async function uploadBlobToFirestore(
  blob: Blob,
  destinationBlobName?: string
): Promise<string> {
  // Create a reference to the destination blob
  const storageRef = ref(firebase.firebaseStorage, `images/${destinationBlobName || uuidv4()}`);
  // Upload the blob to Firebase Storage
  await uploadBytes(storageRef, blob);
  // Get the URL of the uploaded file
  const url = await getDownloadURL(storageRef);
  return url;
}
