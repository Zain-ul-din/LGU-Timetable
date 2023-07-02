import { useContext, useEffect } from 'react';
import AppStateProvider, { AppState, defaultState } from './AppStateProvider';
import { NextRouter, useRouter } from 'next/router';
import { ROUTING } from '~/lib/constant';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { discussionsColRef } from '~/lib/firebase';
import { DiscussionDocType } from '~/lib/firebase_doctypes';
import { addUserToCache } from '~/lib/util';

export default function useNestedRouting() {
   const [chatRoomState, setChatRoomState] = useContext(AppStateProvider);
   const router = useRouter();

   const user = useContext(UserCredentialsContext);
   
   useEffect(() => {
      if (Object.keys(chatRoomState.discussions).length > 0) return;

      let listeners: any = []

      // fetch posts
      const discussions_query = query(discussionsColRef, orderBy('createdAt', 'desc'));

      const listener = onSnapshot(discussions_query, (snapShot) => {
          const discussions = snapShot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          })) as Array<DiscussionDocType>;

          discussions.forEach((discussion) => {
            addUserToCache([chatRoomState, setChatRoomState], discussion.authorId);
          });
          
          
          setChatRoomState((prevState)=> {
            return {...prevState,
               discussions: {
                  ...chatRoomState.discussions,
                  ...discussions.reduce((acc, curr) => {
                     return { ...acc, [curr.id]: curr };
                  }, {})
               },
               loading_state: false}
          });
       });

      return () => listener();
   }, []);

   useEffect(() => {
      if (!user?.user) return;
      setChatRoomState({
         ...chatRoomState,
         users: {
            ...chatRoomState.users,
            [user.user.email as string]: user.user
         }
      });
   }, [user?.user]);

   useEffect(() => {
      const query = router.query;
      const chatRoomQueryParams = {
         active_route:
            typeof query.active_route === 'string' ? query.active_route : defaultState.active_route,
         upload_category:
            typeof query.upload_category === 'string'
               ? query.upload_category
               : defaultState.upload_category,
         discussion_id:
            typeof query.discussion_id === 'string' ? query.discussion_id : defaultState.discussion_id
       };
       
      setChatRoomState({
         ...chatRoomState,
         active_route: chatRoomQueryParams.active_route as any,
         upload_category: chatRoomQueryParams.upload_category,
         discussion_id: query.discussion_id as string
      });
   }, [router.query]);
}

export function PushNestedRouterParam(state: AppState, router: NextRouter) {
   const queryParams = Object.fromEntries(
      Object.entries(state).filter(([key, val], idx) => typeof val === 'string')
   );
   router.push({ pathname: ROUTING.notification, query: queryParams as any });
}
