import { Dispatch, SetStateAction } from 'react';
export type UseStateProps<T> = [T, Dispatch<SetStateAction<T>>];
