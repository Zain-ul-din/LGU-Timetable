import {
    DocumentReference,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
    setDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import { discussionsColRef, discussionsCommentsColRef, discussionSubColName } from '~/lib/firebase';
import { Comment, ParticipantDocType } from '~/lib/firebase_doctypes';


export function postVote(docId: string, user_id: string, voteType: 'up' | 'down') {
    const discussionDocRef = doc(discussionsColRef, docId);
    const sub_collectionRef = collection(discussionDocRef, discussionSubColName);

    updateDoc(doc(sub_collectionRef, user_id), {
        voteType,
        updatedAt: serverTimestamp()
    }).catch(() => {
        createParticipant(user_id, doc(sub_collectionRef, user_id), () =>
            postVote(docId, user_id, voteType)
        );
    });
}

export function addReaction(docId: string, user_id: string, reaction: string) {
    const discussionDocRef = doc(discussionsColRef, docId);
    const sub_collectionRef = collection(discussionDocRef, discussionSubColName);

    updateDoc(doc(sub_collectionRef, user_id), {
        reacts: arrayUnion(reaction),
        updatedAt: serverTimestamp()
    }).catch(() => {
        createParticipant(user_id, doc(sub_collectionRef, user_id), () =>
            addReaction(docId, user_id, reaction)
        );
    });
}

export function removeReaction(docId: string, user_id: string, reaction: string) {
    const discussionDocRef = doc(discussionsColRef, docId);
    const sub_collectionRef = collection(discussionDocRef, discussionSubColName);

    updateDoc(doc(sub_collectionRef, user_id), {
        reacts: arrayRemove(reaction),
        updatedAt: serverTimestamp()
    }).catch(() => {
        createParticipant(user_id, doc(sub_collectionRef, user_id), () =>
            removeReaction(docId, user_id, reaction)
        );
    });
}

export function addComment(docId: string, user_id: string, comment: string) {
    const discussionsCommentsDocRef = doc(discussionsCommentsColRef);
    setDoc(discussionsCommentsDocRef, {
        id: discussionsCommentsDocRef.id,
        comment: comment,
        user_id: user_id,
        dis_id: docId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    } as Comment);
}

function createParticipant(user_id: string, docRef: DocumentReference, onCreated: () => void) {
    const participant: ParticipantDocType = {
        user_id,
        createAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    };

    setDoc(docRef, participant).then(() => onCreated());
}
