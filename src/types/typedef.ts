/*
  @types exports
*/

/**
 * @type lecture time
 */
export type LectureTime = { startTime: string; endTime: string };

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

export interface TimetableData {
   subject: string;
   roomNo: string;
   teacher: string;
   startTime: TimetableLectureTime;
   endTime: TimetableLectureTime;
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
   createdAt: string;
}
