import { useContext, useState, useEffect } from 'react';
import { TimetableInput } from '~/types/typedef';
import { UserCredentialsContext } from './UserCredentialsContext';
import { timetableHistoryCol } from '~/lib/firebase';
import { doc, getCountFromServer, query, serverTimestamp, setDoc, where } from 'firebase/firestore';

const STORAGE_KEY = 'TIME_TABLE_HISTORY';

interface UseTimetableHistory {
  payload: TimetableInput;
  created_at: string;
  hash: string;
}

const useTimetableHistory = (): [
  UseTimetableHistory[],
  (timetable: UseTimetableHistory) => void
] => {
  const user = useContext(UserCredentialsContext);
  const [timetableHistory, setTimetableHistory] = useState<UseTimetableHistory[]>([]);

  useEffect(() => {
    const storedTimetableHistory = localStorage.getItem(STORAGE_KEY);
    if (storedTimetableHistory) setTimetableHistory(JSON.parse(storedTimetableHistory));
  }, []);

  useEffect(() => {
    if (user == null || user.user == null) return;

    const timetableHistoryQuery = query(
      timetableHistoryCol,
      where('email', '==', user.user?.email)
    );

    const email = user.user.email as string;

    getCountFromServer(timetableHistoryQuery).then((snapShot) => {
      const count = snapShot.data().count;
      if (count !== 0) return;

      timetableHistory.forEach((history) => {
        setDoc(doc(timetableHistoryCol), {
          payload: history.payload,
          email: email,
          createdAt: serverTimestamp()
        });
      });
    });

    return () => {};
  }, [user, timetableHistory]);

  const addTimetableHistory = (timetable: UseTimetableHistory) => {
    setTimetableHistory((prev) => {
      const isAlreadyInHistory = prev.some((history) => history.hash === timetable.hash);
      if (isAlreadyInHistory) return prev;
      const newTimetableHistory = [timetable, ...prev];
      if (newTimetableHistory.length > 50) newTimetableHistory.pop();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTimetableHistory));
      return newTimetableHistory;
    });
  };

  return [timetableHistory, addTimetableHistory];
};

export default useTimetableHistory;
