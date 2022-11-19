import { createContext } from "react";

import type { User } from 'firebase/auth'

interface UserCredentialsHook
{
    user: User,
    setUser: React.Dispatch <React.SetStateAction<User>>
}

export const userCredentialsContext = createContext <UserCredentialsHook | null> (null)
