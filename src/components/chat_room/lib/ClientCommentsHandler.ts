import { discussionsCommentsColRef } from "~/lib/firebase";
import Singleton from "../base/Singleton";
import { Comment } from "~/lib/firebase_doctypes";
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

class ClientCommentHandler extends Singleton<ClientCommentHandler>
{
    public Post(docId: string, user_id: string, comment: string) {
        const discussionsCommentsDocRef = doc(discussionsCommentsColRef);
        return setDoc(discussionsCommentsDocRef, {
           id: discussionsCommentsDocRef.id,
           comment: comment,
           user_id: user_id,
           dis_id: docId,
           createdAt: serverTimestamp(),
           updatedAt: serverTimestamp()
        } as Comment);
    }


    public Delete (comment: Comment, docId: string, err?: ()=> void)
    {
        if(comment.isLocked || comment.isDeleted)
        {
            err?.call(this);
            return;
        }

        const discussionsCommentsDocRef = doc(discussionsCommentsColRef, docId);
        return updateDoc(discussionsCommentsDocRef, { 
            isDeleted: true, updatedAt: serverTimestamp() 
        });
    }
    
}

export const clientCommentsHandler = ClientCommentHandler.Instance as ClientCommentHandler;
