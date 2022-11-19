import { setDoc, collection, getDoc, doc } from "firebase/firestore";
import { firebase } from './Firebase'
import axios from "axios";
import { ipInfoUrl } from "../constants/Constants";
import { User } from "firebase/auth";
import { removeDuplicate } from "../helper/util";

export function addUserAnonymously ()
{
    const colRef = collection (firebase.firebaseStore, 'users')
    const docRef = doc (colRef,'users_credentials')

    getDoc (docRef).then (res => {
        const data:any = res.data()
        axios.get (ipInfoUrl).then (credentialRes => {
            if (!credentialRes.data ) return;
            if (data.users == null) data.users = []
            data.users.push (credentialRes.data)
            data.users = removeDuplicate (data.users, (obj)=> obj.ip)    
            setDoc (docRef, data).then (()=> {})
        })
    })
}

export function addLoggedInUser (user: User)
{
    if (!user) return
    if (window.localStorage.getItem ("FIREBASE_ANALYSIS_CREDENTIAL") == user.email) return

    const colRef = collection (firebase.firebaseStore, 'users')
    const docRef = doc (colRef,'login_users_credentials')

    getDoc (docRef).then (res => {
        const data: any = res.data ()

        if (data.users == null) data.users = []

        data.users.push ({
            email: user.email ,
            emailVerified: user.emailVerified,
            displayName: user.displayName,
            isAnonymous: user.isAnonymous,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            providerId: user.providerId,
            uid: user.uid,
            comment: '' 
        })
        
        data.users = removeDuplicate (data.users, (obj)=> obj.email)
        
        setDoc (docRef, data).then (()=> {
            window.localStorage.setItem ("FIREBASE_ANALYSIS_CREDENTIAL", user.email as string)
        })
    })
}

