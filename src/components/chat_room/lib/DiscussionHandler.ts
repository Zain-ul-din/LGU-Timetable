import { discussionsColRef, discussionsCommentsColRef } from '~/lib/firebase';
import Singleton from '../base/Singleton';
import { Comment, DiscussionDocType } from '~/lib/firebase_doctypes';
import { doc, increment, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import errorMessages from '../ranking/errors_messages';
import { UserInteractionLimit } from '../ranking/param';

/**
 * Discussion handler
 */
class DiscussionHandler extends Singleton<DiscussionHandler> {
    /**
     * Updates discussion content
     * @param discussion
     * @param docId
     * @param discussion_content
     * @param [err]
     * @returns  Promise<void> | undefined
     */
    public UpdateDiscussionContent(
        discussion: DiscussionDocType,
        docId: string,
        discussion_content: string,
        err?: (reason: string) => void
    ) {
        if (discussion.isDeleted) {
            err?.call(this, errorMessages.ALREADY_DELETED_DISCUSSION);
            return;
        }

        if (
            discussion.contentEditCount &&
            discussion.contentEditCount > UserInteractionLimit.edit_discussionContent
        ) {
            err?.call(this, errorMessages.LOCKED_DISCUSSION);
            return;
        }

        const discussionsDocRef = doc(discussionsColRef, docId);
        return updateDoc(discussionsDocRef, {
            content: discussion_content,
            updatedAt: serverTimestamp(),
            contentEditCount: increment(1)
            // isLocked: use participants limit
        });
    }

    /**
     * Updates discussion title
     * @param discussion
     * @param new_title
     * @param [err]
     * @returns  Promise<void> | undefined
     */
    public UpdateDiscussionTitle(
        discussion: DiscussionDocType,
        new_title: string,
        err?: (reason: string) => void
    ) {
        if (discussion.isDeleted) {
            err?.call(this, errorMessages.ALREADY_DELETED_DISCUSSION);
            return;
        }

        if (
            discussion.titleEditCount &&
            discussion.titleEditCount > UserInteractionLimit.edit_discussionTitle
        ) {
            err?.call(this, errorMessages.LOCKED_DISCUSSION);
            return;
        }

        const discussionsDocRef = doc(discussionsColRef, discussion.id);

        return updateDoc(discussionsDocRef, {
            title: new_title,
            updatedAt: serverTimestamp(),
            titleEditCount: increment(1)
            // isLocked: use participants limit
        });
    }
}

export const discussionHandler = DiscussionHandler.Instance as DiscussionHandler;
