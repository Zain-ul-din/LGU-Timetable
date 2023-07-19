import React, { createContext } from 'react';
import { TimeTableData } from '../types/typedef';

interface TimetableDataHook {
    timeTableData: TimeTableData;
    setTimeTableData: React.Dispatch<React.SetStateAction<TimeTableData>>;
}

export const TimeTableContext = createContext<TimetableDataHook | null>(null);
