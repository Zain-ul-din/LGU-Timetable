import { discussionsCommentsColRef } from "~/lib/firebase";
import Singleton from "../base/Singleton";
import { Comment } from "~/lib/firebase_doctypes";
import { doc, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import errorMessages from "../ranking/errors_messages";
import { UserInteractionLimit } from "../ranking/param";

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
    
    public Update (
        Comment: Comment, docId: string, 
        comment_content: string,
        err?: (reason:string)=> void
    )
    {
        if(Comment.isDeleted)
        {
            err?.call(this, errorMessages.ALREADY_DELETED_COMMENT);
            return;
        }

        if (
            Comment.editCount && 
            Comment.editCount > UserInteractionLimit.edit_comment
        )
        {
            err?.call(this, errorMessages.LOCKED_COMMENT);
            return;
        }

        const discussionsCommentsDocRef = doc(discussionsCommentsColRef, docId);
        return updateDoc(discussionsCommentsDocRef, { 
            comment: comment_content, 
            updatedAt: serverTimestamp(),
            editCount: increment(1), 
            // isLocked: use participants limit
        });
    }
}

export const clientCommentsHandler = ClientCommentHandler.Instance as ClientCommentHandler;
