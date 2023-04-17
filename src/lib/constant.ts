import { LectureTime } from '~/types/typedef';

/*
  @const def
*/

export const timetableHeadTiles: Array<LectureTime> = [
   { startTime: '8:00', endTime: '8:30' },
   { startTime: '8:30', endTime: '9:00' },
   { startTime: '9:00', endTime: '9:30' },
   { startTime: '9:30', endTime: '10:00' },
   { startTime: '10:00', endTime: '10:30' },
   { startTime: '10:30', endTime: '11:00' },
   { startTime: '11:00', endTime: '11:30' },
   { startTime: '11:30', endTime: '12:00' },
   { startTime: '12:00', endTime: '12:30' },
   { startTime: '12:30', endTime: '1:00' },
   { startTime: '1:00', endTime: '1:30' },
   { startTime: '1:30', endTime: '2:00' },
   { startTime: '2:00', endTime: '2:30' },
   { startTime: '2:30', endTime: '3:00' },
   { startTime: '3:00', endTime: '3:30' },
   { startTime: '3:30', endTime: '4:00' }
];

export const daysName = [
   'Monday',
   'Tuesday',
   'Wednesday',
   'Thursday',
   'Friday',
   'Saturday',
   'Sunday'
];

export const admin_mail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export const LINKS = {
   API_QA_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable/discussions/new?category=q-a',
   SHARE_IDEAS_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable/discussions/new?category=ideas',
   BUG_REPORT_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable/issues/new',
   GIT_HUB_REPO_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable',
   BACK_END_REPO_LINK: 'https://github.com/IIvexII/LGU-TimetableAPI'
};

export const GITHUB_REPOS = [
   {
      owner: 'Zain-ul-din',
      repo_name: 'LGU-Timetable'
   },
   {
      owner: 'IIvexII',
      repo_name: 'LGU-TimetableAPI'
   }
];

export const ROUTING = {
   home: '/',
   developer: '/developer',
   contribute: '/contribute',
   profile: '/profile',
   timetable: '/timetable',
   notification: '/notifications',
   free_class_rooms: '/freeclassrooms'
};
