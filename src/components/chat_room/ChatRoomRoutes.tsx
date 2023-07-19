import { Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import UploadPost from './UploadPost';
import { useContext } from 'react';
import AppStateProvider from './hooks/AppStateProvider';
import { PushNestedRouterParam } from './hooks/NestedRouting';
import { useRouter } from 'next/router';
import ChatMessages from './ChatMessages';
import DiscussionView from './DiscussionView';

export default function ChatRoomRoutes() {
    const [appState, setAppState] = useContext(AppStateProvider);
    const router = useRouter();

    if (appState.loading_state)
        return (
            <Flex width={'100%'} height={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Spinner mx={'1rem'} /> Loading Discussions
            </Flex>
        );

    if (router.query.active_route == undefined) return <ChatMessages />;

    switch ((router.query.active_route as string).toLowerCase()) {
        case 'home':
            return <ChatMessages />;
        case 'upload':
            return <UploadPost />;
        case 'view':
            return <DiscussionView />;
        default:
            return (
                <Center p={'1rem'} flexDir={'column'} gap={'1rem'}>
                    <Heading color={'red.400'} fontSize={'2xl'} className="roboto">
                        Page Not Found
                    </Heading>
                    <Button
                        colorScheme="messenger"
                        onClick={() => {
                            setAppState({ ...appState, active_route: 'Home' });
                            PushNestedRouterParam({ ...appState, active_route: 'Home' }, router);
                        }}>
                        Go Home
                    </Button>
                </Center>
            );
    }
}
