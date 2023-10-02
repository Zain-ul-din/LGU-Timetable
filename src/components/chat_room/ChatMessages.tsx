import { Avatar, Flex, FlexProps, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { CHAT_CATEGORIES_EMOJIS } from '~/lib/constant';
import { DiscussionDocType } from '~/lib/firebase_doctypes';
import { fromFirebaseTimeStamp } from '~/lib/util';
import { useContext } from 'react';
import AppStateProvider, { AppState } from './hooks/AppStateProvider';
import { PushNestedRouterParam } from './hooks/NestedRouting';
import { useRouter } from 'next/router';

export default function ChatMessages() {
    const [appState, setAppState] = useContext(AppStateProvider);
    const router = useRouter();

    return (
        <Flex flexDir={'column'} p={'0.5rem'} gap={'0.5rem'}>
            {Object.values(appState.discussions).map((discussion, idx) => (
                <ChatMessageCard
                    key={idx}
                    discussion={discussion}
                    state={appState}
                    props={{
                        onClick: () => {
                            setAppState({
                                ...appState,
                                active_route: 'View',
                                discussion_id: discussion.id
                            });
                            PushNestedRouterParam(
                                { ...appState, active_route: 'View', discussion_id: discussion.id },
                                router
                            );
                        }
                    }}
                />
            ))}
        </Flex>
    );
}

export const ChatMessageCard = ({
    discussion,
    state: { users },
    props
}: {
    discussion: DiscussionDocType;
    state: AppState;
    props: FlexProps;
}) => {
    const [isUnder700] = useMediaQuery('(max-width: 700px)');

    return (
        <Flex
            bg={'var(--card-color)'}
            p={'0.5rem'}
            className="roboto"
            rounded={'md'}
            alignItems={'center'}
            gap={'0.5rem'}
            border={'1px solid var(--border-color)'}
            cursor={'pointer'}
            _hover={{
                opacity: '80%'
            }}
            {...props}>
            {/* <Flex flexDir={'column'} alignItems={'center'} mt={'auto'} gap={'0.01rem'}>
                <TriangleUpIcon fontSize={'xs'} />
                <Text fontSize={'0.8rem'}>
                    {discussion.voteCount ? discussion.voteCount : 0}
                </Text>
                <TriangleDownIcon fontSize={'xs'} />
            </Flex> */}
            <Flex bg={'var(--card-color-dark)'} p={'0.5rem'} rounded={'lg'}>
                {
                    CHAT_CATEGORIES_EMOJIS[
                        discussion.discussionType as keyof typeof CHAT_CATEGORIES_EMOJIS
                    ]
                }
            </Flex>
            <Flex flexDir={'column'}>
                <Heading className="roboto" fontSize={isUnder700 ? '0.8rem' : '1.2rem'}>
                    {discussion.title}
                </Heading>
                <Text fontSize={'0.7rem'} color={'var(--muted-light-color)'}>
                    Started
                    {users[discussion.authorId] && (
                        <>
                            {' '}
                            by{' '}
                            <Text display={'inline-block'} color={'ghostwhite'}>
                                {users[discussion.authorId].displayName}
                            </Text>{' '}
                        </>
                    )}
                    at: {fromFirebaseTimeStamp(discussion.createdAt).toDateString()}
                </Text>
            </Flex>

            {users[discussion.authorId] && (
                <Avatar src={users[discussion.authorId].photoURL as string} size={'sm'} ml={'auto'} />
            )}
        </Flex>
    );
};
