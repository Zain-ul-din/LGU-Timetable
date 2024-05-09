import {
  ITimetableHistory,
  SubjectLectureTime,
  SubjectOjectType,
  TimeType,
  TimetableData,
  TimetableDocType,
  UseStateProps
} from '~/types/typedef';
import { DAYS_NAME, daysName } from './constant';
import { AppState as ChatAppState } from '~/components/chat_room/hooks/AppStateProvider';
import { doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
import { userColsRef } from './firebase';
import { UserDocType } from './firebase_doctypes';

/**
 * Get Table ColSpan base on startTime - endTime diff
 * -> 30min: 1 colSpan
 * @param startTime
 * @param endTime
 * @returns table colSpan base on time diff
 */
export function getColSpan(startTime: TimeType, endTime: TimeType): number {
  var startTimeToMin: number = startTime.hour * 60 + startTime.min;
  var endTimeToMin: number = endTime.hour * 60 + endTime.min;

  // invalid time
  if (startTimeToMin > endTimeToMin) {
    return 3;
  }

  var timeDiffToMin = endTimeToMin - startTimeToMin;

  let colSpan = 0;
  const halfHour: number = 30;

  while (timeDiffToMin >= halfHour) {
    timeDiffToMin -= halfHour;
    colSpan += 1;
  }

  return colSpan;
}

function isSameTime(startTime: TimeType, endTime: TimeType): boolean {
  return startTime.hour == endTime.hour && startTime.min == endTime.min;
}

/**
 * Creates Array that can fill all columns
 * @param data
 * @returns column
 */
export function fillColumn(data: Array<any>): Array<any> {
  if (data.length == 0) {
    return data;
  }

  let filterData: any[] = [];
  let startingTime: TimeType = { hour: 8, min: 0 };
  let endingTime: TimeType = { hour: 16, min: 0 };

  if (
    !isSameTime(startingTime, { hour: data[0].startTime.hours, min: data[0].startTime.minutes })
  ) {
    filterData.push({
      startTime: { hours: startingTime.hour, minutes: startingTime.min },
      endTime: { hours: data[0].startTime.hours, minutes: data[0].startTime.minutes },
      subject: null
    });
  }

  for (let i = 0; i < data.length; i += 1) {
    if (i > 0) {
      let acc = data[i - 1].endTime;
      let curr = data[i].startTime;
      if (
        !isSameTime({ hour: acc.hours, min: acc.minutes }, { hour: curr.hours, min: curr.minutes })
      ) {
        filterData.push({
          startTime: {
            hours: data[i - 1].endTime.hours,
            minutes: data[i - 1].endTime.minutes
          },
          endTime: { hours: data[i].startTime.hours, minutes: data[i].startTime.minutes },
          subject: null
        });
      }
    }

    filterData.push(data[i]);
  }

  if (
    !isSameTime(endingTime, {
      hour: filterData[filterData.length - 1].endTime.hours,
      min: filterData[filterData.length - 1].endTime.minutes
    })
  ) {
    filterData.push({
      startTime: {
        hours: filterData[filterData.length - 1].endTime.hours,
        minutes: filterData[filterData.length - 1].endTime.minutes
      },
      endTime: { hours: endingTime.hour, minutes: endingTime.min },
      subject: null
    });
  }

  return filterData;
}

/*
    Fills all days for free slot render
*/
export function fillMissingDays(data: any): any {
  daysName.forEach((day) => {
    if (data[day] == undefined) {
      data[day] = null;
    }
  });
  return data;
}

export function removeDuplicateTimetableHistory(arr: Array<ITimetableHistory>) {
  return arr.filter((currEle, idx, self) => {
    return (
      idx ==
      self.findIndex((ele) => {
        return (
          ele.payload.fall == currEle.payload.fall &&
          ele.payload.section == currEle.payload.section &&
          ele.payload.semester == currEle.payload.semester
        );
      })
    );
  });
}

export const isLectureTime = (timetableData: TimetableData, currTime: Date) => {
  const time = new Date(currTime);

  ///! TODO
  /// retrieve tolerance value from database.
  const tolerance = 0; // min
  time.setMinutes(currTime.getMinutes() + tolerance);

  const lectureStartTime = new Date(currTime);
  const lectureEndTime = new Date(currTime);

  lectureStartTime.setHours(timetableData.startTime.hours);
  lectureStartTime.setMinutes(timetableData.startTime.minutes);

  lectureEndTime.setHours(timetableData.endTime.hours);
  lectureEndTime.setMinutes(timetableData.endTime.minutes);

  const isItTrue = time >= lectureStartTime && time <= lectureEndTime;
  return isItTrue;
};

/**
 * Calculates free classrooms
 * @param timetables Array<TimetableDocType>
 * @param currTime Date
 * @returns free classrooms
 */
export function calculateFreeClassrooms(
  timetables: Array<TimetableDocType>,
  currTime: Date
): Array<string> {
  const busyRooms = Array.from(
    new Set(
      timetables
        .map((timetable) =>
          Object.entries(timetable.timetable)
            .map(([day, timetableData]: [string, Array<TimetableData>]) =>
              day.toLocaleLowerCase() == DAYS_NAME[currTime.getDay()].toLocaleLowerCase()
                ? timetableData.map((data) => (isLectureTime(data, currTime) ? data.roomNo : ''))
                : []
            )
            .reduce((prev, curr) => prev.concat(curr), [])
        )
        .reduce((prev, curr) => prev.concat(curr), [])
    )
  ).filter((room) => room != '');

  const freeRooms = Array.from(
    new Set(
      timetables
        .map((timetable) =>
          Object.entries(timetable.timetable)
            .map(([day, timetableData]: [string, Array<TimetableData>]) =>
              timetableData.map((data) => (!busyRooms.includes(data.roomNo) ? data.roomNo : ''))
            )
            .reduce((prev, curr) => prev.concat(curr), [])
        )
        .reduce((prev, curr) => prev.concat(curr), [])
    )
  ).filter((room) => room != '');

  return freeRooms;
}

export function fromFirebaseTimeStamp(time: any): Date {
  const fireBaseTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
  return fireBaseTime;
}

export function calculateVotes(
  downVotes: Array<string> | undefined,
  upVotes: Array<string> | undefined
) {
  const down_votes = downVotes?.length || 0;
  const up_votes = upVotes?.length || 0;
  return down_votes > up_votes ? -down_votes : up_votes;
}

function userCacheHof() {
  const userCache: { [key: string]: boolean } = {};
  return (state: UseStateProps<ChatAppState>, uId: string) => {
    if (uId in userCache) return;

    userCache[uId] = true; // user cached

    const userQuery = query(userColsRef, where('uid', '==', uId), limit(1));

    getDocs(userQuery)
      .then((docSnapShot) => {
        state[1]((prevState) => {
          return {
            ...prevState,
            users: {
              ...prevState.users,
              [uId]: {
                ...(docSnapShot.docs.map((d) => d.data())[0] as UserDocType),
                id: uId
              }
            }
          };
        });
      })
      .catch((err) => {
        delete userCache[uId]; // remove from cache, cuz it doesn't exist or fail to fetch
      });
  };
}

function userCacheHofGeneric() {
  let userCache: { [key: string]: boolean } = {};
  const clearCache = ()=> userCache = {};

  return (state: UseStateProps<{ [uid: string] : UserDocType }>, uId: string) => {
    if (uId in userCache) return clearCache;

    userCache[uId] = true; // user cached

    const userQuery = query(userColsRef, where('uid', '==', uId), limit(1));

    getDocs(userQuery)
      .then((docSnapShot) => {
        state[1]((prevState) => {
          return {
            ...prevState,
            [uId]: {
                ...(docSnapShot.docs.map((d) => d.data())[0] as UserDocType),
                id: uId
            }
          };
        });
      })
      .catch((err) => {
        delete userCache[uId]; // remove from cache, cuz it doesn't exist or fail to fetch
      });
    return clearCache;
  };
}

export const cacheUser = userCacheHofGeneric();
export const addUserToCache = userCacheHof();

export function dateToUnixTimestampInSeconds(date: Date): number {
  return Math.round(date.getTime() / 1000);
}

export const getTimeRemaining = (endtime: Date) => {
  const total = endtime.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
};

/**
 * returns true if lecture1 or lecture2 has time conflict
 * @param lecture1_time 
 * @param lecture2_time 
 * ```ts
    const t1: SubjectLectureTime = {
        day: "Monday",
        time: {
            startTime: { hours: 12, minutes: 0 },
            endTime: { hours: 1, minutes: 30 }
        }
    };

    const t2: SubjectLectureTime = {
        day: "Monday",
        time: {
            startTime: { hours: 1, minutes: 0 },
            endTime: { hours: 2, minutes: 0 }
        }
    };
    HasTimeConflict(t1,t2)
 * ```
 */
export const HasTimeConflict = (
  lecture1_time: SubjectLectureTime,
  lecture2_time: SubjectLectureTime
) => {
  if (lecture1_time.day !== lecture2_time.day) return false;

  if (JSON.stringify(lecture1_time) === JSON.stringify(lecture2_time)) return true;

  const lecture1_StartDate = new Date();
  lecture1_StartDate.setHours(lecture1_time.time.startTime.hours);
  lecture1_StartDate.setMinutes(lecture1_time.time.startTime.minutes);

  const lecture1_EndDate = new Date();
  lecture1_EndDate.setHours(lecture1_time.time.endTime.hours);
  lecture1_EndDate.setMinutes(lecture1_time.time.endTime.minutes);

  const lecture2_StartDate = new Date();
  lecture2_StartDate.setHours(lecture2_time.time.startTime.hours);
  lecture2_StartDate.setMinutes(lecture2_time.time.startTime.minutes);

  const lecture2_EndDate = new Date();
  lecture2_EndDate.setHours(lecture2_time.time.endTime.hours);
  lecture2_EndDate.setMinutes(lecture2_time.time.endTime.minutes);

  return lecture1_StartDate < lecture2_EndDate && lecture1_EndDate > lecture2_StartDate;
};

/*
    finds in cart courses time conflicts with other courses
*/
export const findCoursesTimeConflicts = (coursesObj: SubjectOjectType): SubjectOjectType => {
  return Object.entries(coursesObj).reduce((acc, curr) => {
    return {
      ...acc,
      [curr[0]]: {
        ...curr[1],
        conflicts: curr[1].isInCart
          ? {}
          : Object.fromEntries(
              Object.entries(
                Object.entries(coursesObj)
                  .filter((v) => v[1].isInCart)
                  .reduce((prev, val) => {
                    return {
                      ...prev,
                      [val[0]]: val[1].lectures.filter((lhs) => {
                        return (
                          curr[1].lectures.filter((rhs) => {
                            return HasTimeConflict(lhs, rhs);
                          }).length > 0
                        );
                      })
                    };
                  }, {})
              ).filter((v) => (v[1] as Array<any>).length > 0)
            )
      }
    };
  }, {});
};

// clamps two integer
export function clamp(num: number, min: number, max: number) {
  return num < min ? min : num > max ? max : num;
}

// converts file to blob
export function fileToBlob(file: File): Blob {
  const blobFile = new Blob([file], { type: file.type });
  return blobFile;
}