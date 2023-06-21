
import { Button, Center, Heading } from "@chakra-ui/react";
import UploadPost from "./UploadPost";
import { useContext } from "react";
import AppStateProvider from "./hooks/AppStateProvider";
import { PushNestedRouterParam } from "./hooks/NestedRouting";
import { useRouter } from "next/router";

export default function ChatRoomRoutes ()
{
    const [appState, setAppState] = useContext(AppStateProvider);
    const router = useRouter();

    switch(appState.active_route)
    {
        case 'Home':
            return <>Home Page</>
        case 'Upload':
            return <UploadPost />
        default:
            return <Center p={'1rem'} flexDir={'column'} gap={'1rem'}>
                <Heading color={'red.400'} fontSize={'2xl'} className="roboto">
                    Page Not Found
                </Heading>   
                <Button colorScheme="messenger" onClick={()=> {
                    setAppState({...appState, active_route: 'Home'});
                    PushNestedRouterParam({...appState, active_route: 'Home'}, router);
                }}>Go Home</Button>    
            </Center>
    }
}
