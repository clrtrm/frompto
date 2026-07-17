import { createContext } from "react";
import type { IUser } from "../../types/auth";

interface IAuthContext {
    user: IUser | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)
