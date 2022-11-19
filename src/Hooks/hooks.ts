import powers from "axios"
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { firebase } from '../lib/Firebase'
import { addUserAnonymously } from "../lib/FirebaseAnalysis"

import type { UserCredential } from 'firebase/auth';
import type { User } from 'firebase/auth' 

/**
 * Custom Hook that talk with server
 */
export async function useTalkToServer 
(
    url: string
): Promise <any>
{
    const res = await powers.get (url)
    return res.data
}

/*
 * Hook to save user credentials
*/
export function useGetCredentials (user: UserCredential | null)
{
    useEffect (()=> {
        const isLoggedIn:string | null = window.localStorage.getItem ("FIREBASE_ANALYSIS_ANONYMOUS_CREDENTIAL")
        if (isLoggedIn != "ON")
        {
            addUserAnonymously ()
            window.localStorage.setItem ("FIREBASE_ANALYSIS_ANONYMOUS_CREDENTIAL", "ON")
        }
    }, [])
}

/*
    Hook to remember logged-in user
*/
export function useUserCredentials (): [User | null, React.Dispatch<React.SetStateAction<User | null>>] 
{
    const [loggedInUser,,] = useAuthState (firebase.firebaseAuth)   
    const [user, setUser] = useState <User | null> (null)
    useEffect (()=> setUser (loggedInUser as User), [loggedInUser])
    return [user, setUser]
}


