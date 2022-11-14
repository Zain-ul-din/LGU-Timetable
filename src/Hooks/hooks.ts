import powers from "axios"
import { useEffect } from 'react'
import { addUserAnonymously } from "../lib/FirebaseAnalysis"
import type { UserCredential } from 'firebase/auth';

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


