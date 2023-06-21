import { createContext } from "react";
import { UseStateProps } from "~/types/typedef";
import ChatRoomRoute from "../types/ChatRoomRoute";

export interface AppState 
{
    active_route: ChatRoomRoute,
    upload_category: string | undefined
}

export const defaultState: AppState =
{
    active_route: 'Home',
    upload_category: undefined
}

const AppStateProvider = createContext<UseStateProps<AppState>>({} as any);

export default AppStateProvider;


