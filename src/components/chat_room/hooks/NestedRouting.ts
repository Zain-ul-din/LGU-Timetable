import { useContext, useEffect } from "react";
import AppStateProvider, { AppState, defaultState } from "./AppStateProvider";
import { NextRouter, useRouter } from "next/router";
import { ROUTING } from "~/lib/constant";



export default function useNestedRouting() {
  const [chatRoomState, setChatRoomState] = useContext(AppStateProvider);
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    const chatRoomQueryParams = {
      active_route: typeof query.active_route === "string" ? query.active_route : defaultState.active_route,
      upload_category: typeof query.upload_category === "string" ? query.upload_category : defaultState.upload_category,
    };

    setChatRoomState({ ...chatRoomState, 
      active_route: chatRoomQueryParams.active_route as any,
      upload_category: chatRoomQueryParams.upload_category  
    });
  }, [router.query]);
}

export function PushNestedRouterParam (state: AppState, router: NextRouter) 
{
  const queryParams = Object.fromEntries(Object.entries(state).filter(([key, val], idx)=> typeof val === "string"));
  router.push({ pathname: ROUTING.notification, query: queryParams as any });
} 
