import { useRouter } from "next/router";
import { useEffect } from "react";
import { ROUTING } from "~/lib/constant";

export interface UseReferrerOptions 
{
    redirectTo: keyof typeof ROUTING;
}

/*
    keep track of traffic from where user is coming 
    https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer
*/
export function useReferrer (opts: UseReferrerOptions) 
{
    const router = useRouter()
    
    useEffect(()=> {
        const LOCAL_STORAGE_KEY = "USE_REFERRER";
        if(isUserFromSearchEngine() && localStorage.getItem(LOCAL_STORAGE_KEY) === undefined) 
        {
            localStorage.setItem(LOCAL_STORAGE_KEY, "used");
            router.push(ROUTING[opts.redirectTo])
        }
    }, [])
}

/** 
 * returns true if user coming via search engine
*/
const isUserFromSearchEngine = () => {
    const { referrer } = document;
    const { origin } = window.location
    
    if(referrer == "" || referrer.includes(origin)) return false; // user navigate to page directly

    const searchEngines = ['https://www.google.com/', 'https://www.bing.com/']
     
    // user coming from search engine
    return searchEngines.filter(v => referrer.startsWith(v))
} 
