import { setDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { firebase, userColsRef } from './firebase';
import { useEffect } from 'react';
import { UserDocType } from './firebase_doctypes';

export async function addLoggedInUser(user: User) {
  if (!user) return;

  const userDoc = doc(userColsRef, user.email as string);

  const userData: UserDocType = {
    email: user.email,
    emailVerified: user.emailVerified,
    displayName: user.displayName,
    isAnonymous: user.isAnonymous,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    providerId: user.providerId,
    uid: user.uid,
    comment: '',
    createdAt: serverTimestamp(),
    isPublic: true,
    repo: 0
  };
  
  try {
    const docSnapShot = await getDoc(userDoc);
    if(!docSnapShot.exists()) setDoc(userDoc, userData, { merge: true });
  } catch(_) {
    setDoc(userDoc, userData, { merge: true });
  }
}

export enum FIREBASE_ANALYTICS_EVENTS {
  // pages
  home_page = 'home_page',
  profile = 'profile',
  time_table = 'time_table',
  free_classrooms = 'free_classrooms',
  developer = 'developer',
  contribute = 'contribute',
  notifications = 'notifications',
  clash_resolver = 'clash_resolver',
  // click events
  updated_timetable = 'updated_timetable',
  link_share_on_whatsapp = 'link_share_on_whatsapp',
  print_time_table = 'print_time_table',
  promotion_closed = 'promotion_closed',
  teacher_timetable = 'teacher_timetable',
  room_activities = 'room_activities',
  // affiliate
  educative = 'educative',
  freeForAdvertisement = 'free_for_advertisement',
}

import { logEvent } from 'firebase/analytics';

export function reportFirebaseAnalytics(key: string, val: any) {
  if (!firebase.firebaseAnalytics) return;
  logEvent(firebase.firebaseAnalytics, key, val);
}

export function useFirebaseAnalyticsReport(eventName: FIREBASE_ANALYTICS_EVENTS) {
  useEffect(() => {
    reportFirebaseAnalytics(eventName.toString(), {});
  }, [eventName]);
}
