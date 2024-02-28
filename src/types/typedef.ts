/*
  @types exports
*/

import { User } from 'firebase/auth';

/**
 * @type lecture time
 */
export type LectureTime = { startTime: string; endTime: string };

export type LectureTimeObjectType = {
  startTime: { hours: number; minutes: number };
  endTime: { hours: number; minutes: number };
};

/**
 * @type time type
 */
export type TimeType = { hour: number; min: number };

/**
 * @type Api Response
 */
export type IApisResponse = {
  Monday?: Array<any> | null;
  Tuesday?: Array<any> | null;
  Wednesday?: Array<any> | null;
  Thursday?: Array<any> | null;
  Friday?: Array<any> | null;
  Saturday?: Array<any> | null;
  Sunday?: Array<any> | null;
};

/**
 * @type Timetable input type
 */
export type TimetableInput = {
  fall: string | null;
  semester: string | null;
  section: string | null;
};

/*
 * @type Timetable data signature
 */
export type TimeTableData = {
  data: any;
  loadingState: boolean;
};

export interface ITimetableHistory {
  payload: TimetableInput;
  email: string;
  createdAt: any;
  clickCount?: number | undefined;
}

// docs
export interface IApiDoc {
  id: string;
  docData: string;
}

interface TimetableLectureTime {
  hours: number;
  minutes: number;
}

/*
    Deprecated
*/
export interface TimetableData {
  subject: string;
  roomNo: string;
  teacher: string;
  startTime: TimetableLectureTime;
  endTime: TimetableLectureTime;
  class?: string | undefined;
  room?: string | undefined;
}

export interface TimetableDataType {
  subject: string;
  roomNo: string;
  teacher: string;
  startTime: TimetableLectureTime;
  endTime: TimetableLectureTime;
  class?: string | undefined;
  room?: string | undefined;
}

export interface TimetableResponseType {
  Monday?: Array<TimetableData>;
  Tuesday?: Array<TimetableData>;
  Wednesday?: Array<TimetableData>;
  Thursday?: Array<TimetableData>;
  Friday?: Array<TimetableData>;
  Saturday?: Array<TimetableData>;
  Sunday?: Array<TimetableData>;
}

export interface TimetableDocType {
  timetable: TimetableResponseType;
  updatedAt: string;
  id?: string;
}

export interface UserDataDocType extends User {
  comment: '';
  createdAt: string;
  isPublic: true;
}

import { FieldValue } from 'firebase/firestore';
import { SetStateAction } from 'react';

export interface UserMetaData {
  email: string | undefined;
  photo_url: string | undefined;
  display_name: string | undefined;
}

export interface PastPaperDocType {
  imgUrl: string; // input
  department: string; // input
  examType: string; // input
  subjectName: string; // input
  isVerified: boolean;
  approvedBy: UserMetaData | null;
  uploadedBy: UserMetaData;
  uploadedAt: FieldValue;
  upvote: Array<any>;
  downvote: Array<any>;
  ml: {};
  isPublic: boolean; // input
}

export interface FreeClassRoomStateType {
  loading: boolean;
  time: Date;
  freeClassRooms: Array<string>;
  customDate: Date | null;
}

import { Dispatch } from 'react';

export type UseStateProps<T> = [T, Dispatch<SetStateAction<T>>];

export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

/*
    Clash Resolver Types
*/

export type SubjectLectureTime = {
  day: string;
  time: LectureTimeObjectType;
};

export type SubjectObjectVal = {
  url_id: string;
  lectures: SubjectLectureTime[];
  isInCart: boolean;
  conflicts: {
    [key: string]: SubjectLectureTime[];
  };
};

export type SubjectOjectType = {
  [key: string]: SubjectObjectVal;
};
