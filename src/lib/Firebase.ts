import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import type { FirebaseApp } from 'firebase/app'
import type { Auth } from 'firebase/auth'
import type { Firestore }  from 'firebase/firestore'

interface InitializeFirebaseAppType
{
    firebaseApp: FirebaseApp,
    firebaseAuth: Auth,
    firebaseStore: Firestore
}

export function initializeFirebaseApp () : InitializeFirebaseAppType
{
    const firebaseApp: FirebaseApp = initializeApp ()
    const firebaseAuth: Auth = getAuth (firebaseApp)
    const firebaseStore: Firestore = getFirestore (firebaseApp)

    return {
        firebaseApp,
        firebaseAuth,
        firebaseStore
    }
}
