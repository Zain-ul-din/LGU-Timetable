import { Fragment, useContext, useEffect, useState } from 'react';
import AppStateProvider from './hooks/AppStateProvider';
import { useRouter } from 'next/router';
import {
    Comment as CommentType,
    DiscussionDocType,
    ParticipantDocType,
    UserDocType
} from '~/lib/firebase_doctypes';
import { EMOJIS, ROUTING } from '~/lib/constant';
import {
    Avatar,
    AvatarGroup,
    Button,
    Divider,
    Flex,
    Icon,
    Text,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import EditableText from './components/EditableText';
import MarkDown from '../design/MarkDown';
import styles from '~/styles/chat_room/MarkDown.module.css';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { ArrowDownIcon, ArrowUpIcon, CopyIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { BiMessageSquareCheck } from 'react-icons/bi';
import EmojiPickUp from './components/EmojiPickUp';

import MarkDownInput from './components/MarkDown';
import Comment from './components/Comment';

import { addUserToCache, fromFirebaseTimeStamp } from '~/lib/util';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { discussionSubColName, discussionsColRef, discussionsCommentsColRef } from '~/lib/firebase';
import { addComment, addReaction, postVote, removeReaction } from './lib/firebase_util';
import { Unsubscribe } from 'firebase/auth';
import { clientCommentsHandler } from './lib/ClientCommentsHandler';
import StaticDropDown from '../design/StaticDropDown';
import { BsEye, BsThreeDotsVertical } from 'react-icons/bs';
import CommentUploader from './components/CommentUploader';
import DiscussionEdit from './components/DiscussionEdit';
import DiscussionTitleEdit from './components/DiscussionTitleEdit';
import { UseStateProps } from '~/types/typedef';
import AreYouSureModel from '../design/AreYouSureModel';
import { discussionHandler } from './lib/DiscussionHandler';
import MustSignIn from '../design/MustSigin';
import { NotLoggedIn } from '../Header';

export default function DiscussionView() {
    const [appState, setAppState] = useContext(AppStateProvider);
    const user = useContext(UserCredentialsContext);

    const router = useRouter();
    const toast = useToast();
    const [discussion, setDiscussion] = useState<DiscussionDocType | undefined>(undefined);
    const [participants, setParticipants] = useState<ParticipantDocType[]>([]);
    const [comments, setComments] = useState<CommentType[]>([]);

    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        if (typeof router.query.discussion_id != 'string') {
            router.push(ROUTING.discussions);
            return;
        }
        
        if (appState.loading_state) return;

        let unSub: Unsubscribe | undefined = undefined;

        const discussionId = router.query.discussion_id as string;

        const commentsUnSub = onSnapshot(
            query(
                discussionsCommentsColRef,
                where('dis_id', '==', discussionId),
                orderBy('createdAt', 'asc')
            ),
            (snapShot) => {
                const comments: CommentType[] = [];
                snapShot.forEach((doc) => {
                    addUserToCache([appState, setAppState], doc.data().user_id);
                    comments.push(doc.data() as CommentType);
                });
                setComments(comments);
            }
        );
        
        // increment view count
        discussionHandler.incrementViewCount(discussionId)
        
        if (appState.discussions[discussionId] == undefined) {
            
            // fetch discussion from server
            alert('we have to fetch the discussion from the server');
        }

        unSub = onSnapshot(
            collection(doc(discussionsColRef, discussionId), discussionSubColName),
            (snapShot) => {
                const participants: ParticipantDocType[] = [];
                snapShot.forEach((doc) => {
                    addUserToCache([appState, setAppState], doc.data().user_id);
                    participants.push(doc.data() as ParticipantDocType);
                });

                setParticipants(participants);
            }
        );

        return () => {
            if (unSub) unSub();
            commentsUnSub();
        };
    }, [appState.loading_state]);

    useEffect(() => {
        setDiscussion(appState.discussions[router.query.discussion_id as string]);
    }, [appState.discussions]);

    const [comment, setComment] = useState<string>('');

    return (
        <>
            {discussion && (
                <Flex p={'0.5rem'} flexDir={'column'} gap={'0.5rem'}>
                    {discussion.authorId == user?.user?.uid ? (
                        <DiscussionTitleEdit discussion={discussion} />
                    ) : (
                        <Text fontSize={'2xl'} className="roboto" fontWeight={'bold'}>
                            {discussion.title}
                        </Text>
                    )}
                
                    <Text fontSize={'1rem'} fontFamily={'monospace'}
                        color={'whiteAlpha.600'}
                        ml={1} 
                    >
                        <BsEye 
                            style={{ 
                                display: 'inline', 
                                transform: 'translateY(3px)',
                                margin: '0rem 0.2rem'
                            }}
                        />
                        Views {discussion.viewCount || 0}
                    </Text>
                            
                    <Flex
                        width={'100%'}
                        p={'1rem'}
                        pb={'0.5rem'}
                        border={'0.1px solid var(--border-color)'}
                        rounded={'lg'}
                        flexDir={'column'}
                        gap={'0.5rem'}>
                        <Flex width={'100%'}>
                            {appState.users[discussion.authorId] && (
                                <Flex gap={'0.5rem'} alignItems={'center'}>
                                    <Flex>
                                        <Avatar
                                            src={
                                                appState.users[discussion.authorId]
                                                    .photoURL as string
                                            }
                                            size={'sm'}
                                        />
                                    </Flex>
                                    <Flex flexDir={'column'}>
                                        <Text
                                            fontSize={'md'}
                                            fontWeight={'bold'}
                                            className={'roboto'}
                                            lineHeight={1}>
                                            {appState.users[discussion.authorId].displayName}
                                        </Text>
                                        <Text
                                            fontSize={'sm'}
                                            fontWeight={'thin'}
                                            color={'var(--muted-light-color)'}
                                            className={'roboto'}
                                            lineHeight={1}>
                                            started on{' '}
                                            {fromFirebaseTimeStamp(
                                                discussion.createdAt
                                            ).toDateString()}
                                        </Text>
                                    </Flex>
                                </Flex>
                            )}

                            <Flex ml={'auto'}>
                                <DiscussionCrudControls
                                    haveAccess={
                                        discussion.authorId == user?.user?.uid ||
                                        user?.user?.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL
                                    }
                                    discussion={discussion}
                                    editState={[edit, setEdit]}
                                />
                            </Flex>
                        </Flex>
                        {edit ? (
                            <DiscussionEdit
                                discussion={discussion}
                                closeHandler={() => {
                                    setEdit(false);
                                }}
                            />
                        ) : (
                            <MarkDown text={discussion.content} className={styles.mark_down} />
                        )}

                        {/* votes & emojis */}
                        <Flex gap={'0.5rem'} mt={'1rem'}>
                            <Button
                                colorScheme="green"
                                rounded={'full'}
                                size={'sm'}
                                variant={'outline'}
                                onClick={() =>
                                    postVote(discussion.id, user?.user?.uid as string, 'up')
                                }
                                fontSize={'lg'}>
                                <ArrowUpIcon />
                                {participants.filter((p) => p.voteType == 'up').length}

                                <AvatarGroup size="xs" max={5} mx={'0.2rem'}>
                                    {participants
                                        .filter((p) => p.voteType == 'up')
                                        .map((p, index) => {
                                            if (appState.users[p.user_id] == undefined)
                                                return <Fragment key={index}></Fragment>;
                                            return (
                                                <Avatar
                                                    src={appState.users[p.user_id].photoURL || ''}
                                                    key={index}
                                                />
                                            );
                                        })}
                                </AvatarGroup>
                            </Button>

                            <Button
                                colorScheme="red"
                                rounded={'full'}
                                size={'sm'}
                                variant={'outline'}
                                onClick={() =>
                                    postVote(discussion.id, user?.user?.uid as string, 'down')
                                }
                                fontSize={'lg'}>
                                <ArrowDownIcon />
                                {participants.filter((p) => p.voteType == 'down').length}

                                <AvatarGroup size="xs" max={5} mx={'0.2rem'}>
                                    {participants
                                        .filter((p) => p.voteType == 'down')
                                        .map((p, index) => {
                                            if (appState.users[p.user_id] == undefined)
                                                return <Fragment key={index}></Fragment>;
                                            return (
                                                <Avatar
                                                    src={appState.users[p.user_id].photoURL || ''}
                                                    key={index}
                                                />
                                            );
                                        })}
                                </AvatarGroup>
                            </Button>

                            <Flex alignItems={'center'} flexWrap={'wrap'} gap={'0.5rem'}>
                                <EmojiPickUp
                                    activeEmoji={EMOJIS.filter(
                                        (e) =>
                                            participants.filter(
                                                (p) =>
                                                    p.user_id == user?.user?.uid &&
                                                    p.reacts?.includes(e)
                                            ).length > 0
                                    )}
                                    onPick={(e) => {
                                        addReaction(discussion.id, user?.user?.uid as string, e);
                                    }}
                                    onAlreadyPicked={(e) => {
                                        removeReaction(discussion.id, user?.user?.uid as string, e);
                                    }}
                                />
                                <Flex p={'0.5rem'} py={0} gap={'0.3rem'} alignItems={'center'}>
                                    {EMOJIS.map((emoji, idx) => {
                                        if (
                                            participants.filter((p) => p.reacts?.includes(emoji))
                                                .length == 0
                                        )
                                            return <Fragment key={idx}></Fragment>;
                                        return (
                                            <Button
                                                key={idx}
                                                colorScheme="gray"
                                                rounded={'full'}
                                                size={'sm'}
                                                variant={'outline'}
                                                cursor={'unset'}
                                                isActive={true}>
                                                {
                                                    participants.filter((p) =>
                                                        p.reacts?.includes(emoji)
                                                    ).length
                                                }{' '}
                                                {emoji}
                                            </Button>
                                        );
                                    })}
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    {/* comments */}
                    <Flex>{comments.length} Comments:</Flex>

                    <Flex width={'100%'} flexDir={'column'} gap={'0.5rem'}>
                        {comments.map((comment, idx) => {
                            
                            return (
                                <Comment
                                    comment={comment}
                                    user={appState.users[comment.user_id]}
                                    key={idx}
                                    is_author={
                                        user?.user?.uid == comment.user_id
                                        || 
                                        user?.user?.email == process.env.NEXT_PUBLIC_ADMIN_EMAIL
                                    }
                                />
                            );
                        })}
                    </Flex>

                    <Divider />

                    {/* user comment uploader  */}
                    {!user?.user ? <>
                        <Flex justifyContent={'center'} p={4}>
                            <NotLoggedIn text='login to comment'/>
                        </Flex>
                    </> : 
                    <CommentUploader
                        discussion_id={discussion.id}
                        user={user?.user as UserDocType}
                    />}
                </Flex>
            )}
        </>
    );
}

const DiscussionCrudControls = ({
    haveAccess,
    discussion,
    editState
}: {
    haveAccess: boolean;
    discussion: DiscussionDocType;
    editState: UseStateProps<boolean>;
}) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter()

    return (
        <>
            <AreYouSureModel
                title={'Are you sure you want to delete this discussion?'}
                handler={{ isOpen, onClose, onOpen }}
                onYes={()=>{
                    discussionHandler.deleteDiscussion(discussion).then(()=>{
                        router.push(ROUTING.discussions)
                    })
                }}
            />
            <StaticDropDown
                options={
                    [
                        {
                            label: (
                                <Flex alignItems={'center'} gap={'0.3rem'}>
                                    <CopyIcon /> Copy
                                </Flex>
                            ),
                            onClick: () => {
                                navigator.clipboard.writeText(discussion.content);
                                toast({
                                    title: 'Copied',
                                    status: 'success',
                                    position: 'top'
                                });
                            }
                        },
                        haveAccess
                            ? {
                                  label: (
                                      <Flex alignItems={'center'} gap={'0.3rem'}>
                                          <EditIcon /> Edit
                                      </Flex>
                                  ),
                                  onClick: () => {
                                      editState[1](true);
                                  }
                              }
                            : null,
                        haveAccess
                            ? {
                                  label: (
                                        <Flex alignItems={'center'} gap={'0.3rem'}
                                        >
                                          <DeleteIcon /> Delete
                                        </Flex>
                                  ),
                                  onClick: () => {
                                      onOpen();
                                  },
                                  color: {
                                      color: 'red.300',
                                      textColor: 'red.300'
                                  }
                              }
                            : null
                    ].filter((option) => option != null) as any[]
                }>
                <Icon fontSize={'xl'}>
                    <BsThreeDotsVertical />
                </Icon>
            </StaticDropDown>
        </>
    );
};
