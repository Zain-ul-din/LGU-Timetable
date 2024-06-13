import { createContext } from 'react';
import { ReactNode } from 'react-markdown/lib/ast-to-react';

export const AllSubjectsContext = createContext<string[]>([]);

interface AllSubjectsProviderProps {
  children?: ReactNode;
  value: string[];
}

const AllSubjectsProvider = ({ value, children }: AllSubjectsProviderProps) => {
  return <AllSubjectsContext.Provider value={value}>{children}</AllSubjectsContext.Provider>;
};

export default AllSubjectsProvider;
