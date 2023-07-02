import { createContext } from 'react';
import { UseStateProps } from '~/types/typedef';
import ChatRoomRoute from '../types/ChatRoomRoute';
import { DiscussionDocType, UserDocType } from '~/lib/firebase_doctypes';

export interface AppState {
   active_route: ChatRoomRoute;
   upload_category: string | undefined;
   users: { [key: string]: UserDocType };
   discussion_id: string | undefined;
   discussions: { [id: string]: DiscussionDocType };
   loading_state: boolean;
}

export const defaultState: AppState = {
   active_route: 'Home',
   upload_category: undefined,
   users: {},
   discussion_id: undefined,
   discussions: {},
   loading_state: true
};

const AppStateProvider = createContext<UseStateProps<AppState>>({} as any);

export default AppStateProvider;
