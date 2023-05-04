// Firebase entry point

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { Analytics } from 'firebase/analytics';

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
}

function initializeFirebaseApp(): InitializeFirebaseAppType {
   const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
   const firebaseAuth: Auth = getAuth(firebaseApp);
   const firebaseStore: Firestore = getFirestore(firebaseApp);
   const firebaseAnalytics: Analytics | null =
      typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null;

   return {
      firebaseApp,
      firebaseAuth,
      firebaseStore,
      firebaseAnalytics
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
