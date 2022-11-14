// Firebase entry point

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore }  from 'firebase/firestore'

const firebaseConfig = {
    apiKey:             import.meta.env.VITE_apiKey,
    authDomain:         import.meta.env.VITE_authDomain,
    projectId:          import.meta.env.VITE_projectId,
    storageBucket:      import.meta.env.VITE_storageBucket,
    messagingSenderId:  import.meta.env.VITE_messagingSenderId,
    appId:              import.meta.env.VITE_appId,
    measurementId:      import.meta.env.VITE_measurementId
};

interface InitializeFirebaseAppType
{
    firebaseApp: FirebaseApp,
    firebaseAuth: Auth,
    firebaseStore: Firestore
}

function initializeFirebaseApp () : InitializeFirebaseAppType
{
    console.log (firebaseConfig)
    const firebaseApp: FirebaseApp = initializeApp (firebaseConfig)
    const firebaseAuth: Auth = getAuth (firebaseApp)
    const firebaseStore: Firestore = getFirestore (firebaseApp)
    
    return {
        firebaseApp,
        firebaseAuth,
        firebaseStore
    }
}

export const firebase: InitializeFirebaseAppType = initializeFirebaseApp ()
