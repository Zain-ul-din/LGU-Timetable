import { LectureTime } from '~/types/typedef';

/*
  @const def
*/

export const timetableHeadTitles: Array<LectureTime> = [
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

// sunday must be at index 0 to get exact day from date object
// https://stackoverflow.com/questions/17038105/get-exact-day-from-date-string-in-javascript
export const DAYS_NAME = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const admin_mail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export const LINKS = {
    API_QA_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable/discussions/new?category=q-a',
    SHARE_IDEAS_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable/discussions/new?category=ideas',
    BUG_REPORT_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable/issues/new',
    GIT_HUB_REPO_LINK: 'https://github.com/Zain-ul-din/LGU-Timetable',
    BACK_END_REPO_LINK: 'https://github.com/IIvexII/LGU-TimetableAPI',
    QA_REDIRECT_LINK: 'https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FZain-ul-din%2FLGU-Timetable%2Fdiscussions%2Fnew%3Fcategory%3Dq-a'
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
    discussions: '/discussions',
    free_class_rooms: '/freeclassrooms',
    admin: '/admin',
    teachers: '/timetable/teachers',
    rooms: '/timetable/rooms',
    clash_resolver: '/util/timetable_clashresolver'
};

export const APIS_ENDPOINTS = {
    ImgToTxt: 'https://api.api-ninjas.com/v1/imagetotext', // https://api-ninjas.com/api/imagetotext,
    ReadMeMd: 'https://raw.githubusercontent.com/Zain-ul-din/LGU-Timetable/master/README.md',
    Util_Cache: '/api/util/cache',
    SCREEN_SHOTS_PATH: 'https://raw.githubusercontent.com/zainuldeen/lgu-crawler/master/dist/'
};

export const CHAT_CATEGORIES = {
    ViewAll: '💬 View all discussions',
    Announcements: '📢 Announcements',
    General: '👋 General',
    Ideas: '💡 Ideas',
    Polls: '📊 Polls',
    QNA: '🙋‍♀️ Q&A',
    Apis: '👩‍💻 Developer APIS'
};

export const CHAT_CATEGORIES_EMOJIS = {
    ViewAll: '💬',
    Announcements: '📢',
    General: '👋',
    Ideas: '💡',
    Polls: '📊',
    QNA: '🙋‍♀️',
    Apis: '👩‍💻'
};

export const EMOJIS = ['👍', '😄', '🎉', '❤️', '🚀', '👀', '🔥'];

export const STAR_RATING = ['worst 😟', 'poor 😞', 'average 😐', 'good 😊', 'excellent 😄'];
