import { createContext } from 'react';

import type { User } from 'firebase/auth';

interface UserCredentialsHook {
   user: User | null;
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserCredentialsContext = createContext<UserCredentialsHook | null>(null);
