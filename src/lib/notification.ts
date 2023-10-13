/*
    Credits: 
        https://medium.com/@zain_ul_din/in-app-notifications-using-firebase-a89a7512a892
*/

import { 
    CollectionReference, 
    collection, 
    query, where, onSnapshot, 
    QuerySnapshot, updateDoc, 
    doc, setDoc, 
    serverTimestamp,
    arrayRemove,
    Unsubscribe,
    FieldValue,
    arrayUnion,
    getCountFromServer
} 
from "firebase/firestore";
import { firebase } from "./firebase";
import { createContext, useEffect, useState } from "react";
import { UserDocType } from "./firebase_doctypes";

type DiscussionNotificationDocType = {
    discussion_id: string; // publisher user uid (unique id)
    subscribers: string[] // list of users uid who gets notified
    created_at: FieldValue // server timestamp
}

export class DiscussionNotification 
{
    // private discussion_id: string;
    private static collection: CollectionReference = collection(firebase.firebaseStore, "discussion_notifications");
    private subscriber_id: string;

    /**
     * Creates an instance of discussion notification.
     * @param subscriber_id current user id
    */
    constructor(
        subscriber_id: string
    ) 
    {
        this.subscriber_id = subscriber_id 
    }

    /**
     * Subscribes for Notifications
     * @param {*} observer handler
     * @returns Unsubscribe Callback
     * @warning
     *      !Manually UnSubscribe by calling returned callback 
    */
    subscribe (
        observer: (snapShort: QuerySnapshot) => void
    ): Unsubscribe
    {
        const q = query(DiscussionNotification.collection, 
          where('subscribers', 'array-contains',this.subscriber_id)) 
        return onSnapshot(q, observer)
    }

    /**
     * UnSubscribes notification
     * @param {*} observer_id 
     */
    unSubscribe(
        discussion_id: string
    )
    {
        const _doc = doc(DiscussionNotification.collection, discussion_id)
        updateDoc(_doc, {
            subscribers: arrayRemove(this.subscriber_id)
        });
    }
    
    /**
     * Emits Notification
     * @param {*} discussion_id discussion id
     * @param {*} subscribers users that should be notify
     * @param {*} type Notification.NOTIFICATION_TYPE
     * @param {*} payload actual data to send 
     * @returns promise<void>
    */
    static notify(
        sender: string,
        discussion_id: string,
        subscribers: Array<string>
    )
    {   
        const _doc = doc(DiscussionNotification.collection, discussion_id)
        const _subscriber = subscribers.filter(i => i !== sender)
        
        const updateNotificationDoc = ()=> {
            updateDoc(_doc, {
                subscribers: arrayUnion(..._subscriber),
                created_at: serverTimestamp()
            });
        }
        
        try {
            updateNotificationDoc()
        } catch (err) {
            setDoc(_doc, {
                discussion_id: discussion_id,
                subscribers: _subscriber,
                created_at: serverTimestamp()
            } as DiscussionNotificationDocType);
            
            updateNotificationDoc()
        }
    }
}

///
/// React Extension
///

export const DiscussionNotificationContext = createContext<DiscussionNotificationDocType[]>([])
export const DiscussionNotificationProvider = DiscussionNotificationContext.Provider

export const useDiscussionNotifications = (
    user: UserDocType | null
)=> {
    const [notifications, setNotifications] = useState<DiscussionNotificationDocType[]>([])
    
    useEffect(()=> {
        if(!user) return;

        const discussion_notification = new DiscussionNotification(user.uid)

        const unSub = discussion_notification.subscribe((snapShot)=> {
            setNotifications(snapShot.docs.map(d=>d.data()) as DiscussionNotificationDocType[])
        })

        return ()=> {
            unSub()
        }
    }, [user])

    return notifications
}
