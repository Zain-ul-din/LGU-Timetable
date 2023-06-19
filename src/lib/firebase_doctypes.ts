import { User } from "firebase/auth";
import { FieldValue } from "firebase/firestore";

export interface Discussions {
    author: string;
    title: string;
    content: string;
    upVotes: number;
    downVotes: number;
    category: string;
    labels: Array<string>;
    participant: Array<string>;
    isLocked: boolean;
    createdAt: string;
    updatedAt: string;
    lockedAt: string;
    comments: Array<Comment>;
    reacts: Array<string>;
    status: string;
}

type Status = "closed" | "In progress"; 

interface Comment {
    author: string;
    comment: string;
    upVotes: number;
    downVotes: number;
    reacts: Array<string>;
}

export interface UserDocType   {
    email: string | null
    emailVerified: boolean
    displayName: string | null
    isAnonymous: boolean
    phoneNumber: string | null
    photoURL: string | null
    providerId: string
    uid: string
    comment?: string
    createdAt?: FieldValue
    isPublic?: boolean
    repo?: number | null
}






