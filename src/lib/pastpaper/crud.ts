import { arrayRemove, arrayUnion, doc, increment, updateDoc } from 'firebase/firestore';
import { pastPapersCol } from '../firebase';
import { PastPaperDocType } from './types';

export const deletePastPaper = async (uid: string) => {
  const docRef = doc(pastPapersCol, uid);
  return updateDoc(docRef, {
    deleted: true
  } as Partial<PastPaperDocType>);
};

export const pastPaperUpVote = async (uid: string, doerId: string) => {
  const docRef = doc(pastPapersCol, uid);
  return updateDoc(docRef, {
    up_votes: arrayUnion(doerId) as any,
    down_votes: arrayRemove(doerId) as any,
    votes_count: increment(1) as any
  } as Partial<PastPaperDocType>);
};

export const pastPaperDownVote = async (uid: string, doerId: string) => {
  const docRef = doc(pastPapersCol, uid);
  return updateDoc(docRef, {
    down_votes: arrayUnion(doerId) as any,
    up_votes: arrayRemove(doerId) as any,
    votes_count: increment(-1) as any
  } as Partial<PastPaperDocType>);
};
