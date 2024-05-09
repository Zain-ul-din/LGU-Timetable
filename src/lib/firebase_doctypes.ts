import { FieldValue } from 'firebase/firestore';

export interface UserDocType {
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
  comment?: string;
  createdAt?: FieldValue;
  isPublic?: boolean;
  repo?: number | null;
  pro?: boolean | null;
  isBan?: boolean;
  rating?: number;
}

interface UserPost<T> {
  userId: string;
  createAt: FieldValue;
  updatedAt: FieldValue;
  post: T;
}

import { CHAT_CATEGORIES } from './constant';

interface Question {
  questionTitle: string;
  options: Array<string>;
}

interface Answer {
  selectOptions: {
    [key: number]: [val: number];
  };
}

export interface DiscussionDocType {
  createdAt: FieldValue;
  updatedAt: FieldValue;

  id: string;
  title: string;
  content: string;
  authorId: string;
  discussionType: typeof CHAT_CATEGORIES | string;

  isPrivate?: boolean;

  isPremium?: boolean;
  weight: number;

  hasAnswer?: boolean;
  acceptedAnswer?: boolean;

  labels?: UserPost<string>;

  poll?: Array<Question>;

  participants?: Array<ParticipantDocType> /* Sub collection documents */;

  isDeleted?: boolean;

  // spam prevention
  isLocked?: boolean;
  contentEditCount?: number;
  titleEditCount?: number;

  requestUnlock?: Array<RequestStatus>;
  requestEdit?: Array<RequestStatus>;
  needModeratorAttention?: boolean;

  voteCount: number;

  viewCount?: number;
}

export interface Post<T> {
  createAt: FieldValue;
  updatedAt: FieldValue;
  post: T;
}

export interface ParticipantDocType {
  user_id: string;
  createAt: FieldValue;
  updatedAt: FieldValue;

  reacts?: Array<string>;
  isModerator?: boolean;
  voteType?: 'up' | 'down';
  isBanned?: boolean;

  pollAnswers?: Array<Answer> /*Poll answers if exists*/;

  reports?: UserPost<string>;
}

export type RequestStatus = {
  status: 'pending' | 'accepted' | 'rejected';
  moderator_weight: number;
  moderator_id: string;
};

export interface Comment {
  id: string;
  user_id: string;
  dis_id: string;

  comment: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;

  isDeleted?: boolean;

  // prevent spam
  isLocked?: boolean;
  editCount?: number;

  requestUnlock?: Array<RequestStatus>;
  requestEdit?: Array<RequestStatus>;
}
