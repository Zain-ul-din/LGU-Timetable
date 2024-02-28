import { createContext } from 'react';

import type { User } from 'firebase/auth';
import { UserDocType } from '~/lib/firebase_doctypes';

interface UserCredentialsHook {
  user: UserDocType | null;
  setUser: React.Dispatch<React.SetStateAction<UserDocType | null>>;
}

export const UserCredentialsContext = createContext<UserCredentialsHook | null>(null);
