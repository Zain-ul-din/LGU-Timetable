import React, { createContext } from 'react';
import { TimetableInput } from '~/types/typedef';

interface TimetableInputHook {
   timeTableInput: TimetableInput;
   setTimeTableInput: React.Dispatch<React.SetStateAction<TimetableInput>>;
}

export const TimeTableInputContext = createContext<TimetableInputHook | null>(null);
