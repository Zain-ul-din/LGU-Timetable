import { Fragment, useContext, useEffect, useState } from "react";
import AppStateProvider from "./hooks/AppStateProvider";
import { useRouter } from "next/router";
import { Comment, DiscussionDocType, ParticipantDocType, UserDocType } from "~/lib/firebase_doctypes";
import { EMOJIS, ROUTING } from "~/lib/constant";
import { Avatar, AvatarGroup, Button, Divider, Flex, Icon, Text } from "@chakra-ui/react";
import EditableText from "./components/EditableText";
import MarkDown from "../design/MarkDown";
import styles from '~/styles/chat_room/MarkDown.module.css';
import { UserCredentialsContext } from "~/hooks/UserCredentialsContext";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import {  BiMessageSquareCheck } from "react-icons/bi";
import EmojiPickUp from "./components/EmojiPickUp";

import MarkDownInput from "./components/MarkDown";
import { addUserToCache, fromFirebaseTimeStamp } from "~/lib/util";
import { collection, doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { discussionSubColName, discussionsColRef, discussionsCommentsColRef } from "~/lib/firebase";
import { addComment, addReaction, postVote, removeReaction } from "./lib/firebase_util";
import { Unsubscribe, User } from "firebase/auth";


export default function DiscussionView () 
{   

    const [appState, setAppState] = useContext(AppStateProvider);
    const user = useContext(UserCredentialsContext);

    const router = useRouter();
    const [discussion, setDiscussion] = useState<DiscussionDocType | undefined>(undefined);
    const [participants, setParticipants] = useState<ParticipantDocType[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    
    useEffect(()=> {
        if (typeof router.query.discussion_id != "string") 
        {
            router.push(ROUTING.notification);
            return;
        }

        if(appState.loading_state) return;

        let unSub: Unsubscribe | undefined = undefined;  

        const discussionId = router.query.discussion_id as string;

        console.log(discussionId + " id");
        const commentsUnSub = onSnapshot(query(discussionsCommentsColRef, 
            where("dis_id", "==", discussionId), orderBy("createdAt", "asc"))
            , snapShot => {
            console.log(snapShot.docs.map(d=> d.data()));
            const comments: Comment[] = [];
            snapShot.forEach(doc => {
                comments.push(doc.data() as Comment);
            });
            setComments(comments);
         });

        if (appState.discussions[discussionId] == undefined)
        {
            // fetch discussion from server
            alert("we have to fetch the discussion from the server");
        }

        unSub = onSnapshot(collection(doc(discussionsColRef, discussionId), discussionSubColName), (snapShot)=> {
            const participants: ParticipantDocType[] = [];
            snapShot.forEach((doc)=> {
                addUserToCache([appState, setAppState], doc.data().user_id);
                participants.push(doc.data() as ParticipantDocType);
            });

            setParticipants(participants);
        });

        return ()=> {
            if (unSub) unSub();
            commentsUnSub();
        };

    }, [appState.loading_state])

    useEffect(()=> {
        setDiscussion(appState.discussions[router.query.discussion_id as string]);
    }, [appState.discussions])
    
    return <>
        {discussion && <Flex p={'0.5rem'} flexDir={'column'} gap={'0.5rem'}>
            {discussion.authorId == user?.user?.email ? 
                <EditableText editAbleProps={{
                    defaultValue: discussion.title,
                    fontSize: '3xl',
                    className: 'roboto',
                    fontWeight: 'bold',
            }} /> : 
                <Text fontSize={'3xl'} className="roboto" fontWeight={'bold'}>
                    {discussion.title}
            </Text>}

            <Flex width={'100%'} p={'1rem'} pb={'0.5rem'} border={'0.1px solid var(--border-color)'} rounded={'lg'} 
                flexDir={'column'} gap={'0.5rem'}>

                <Flex>
                    {appState.users[discussion.authorId] && <Flex gap={'0.5rem'} alignItems={'center'}>
                        <Flex>
                            <Avatar 
                                src={appState.users[discussion.authorId].photoURL as string} 
                                size={'sm'}
                            />
                        </Flex>
                        <Flex flexDir={'column'}>
                            <Text fontSize={'md'} fontWeight={'bold'} className={'roboto'} lineHeight={1}>
                                {appState.users[discussion.authorId].displayName}
                            </Text>
                            <Text fontSize={'sm'} fontWeight={'thin'} color={'var(--muted-light-color)'} className={'roboto'} lineHeight={1}>
                                started on {fromFirebaseTimeStamp(discussion.createdAt).toDateString()}
                            </Text>
                        </Flex>    
                    </Flex>}
                </Flex>    
                <MarkDown text={discussion.content} className={styles.mark_down}/>

                {/* votes & emojis */}
                <Flex gap={'0.5rem'} mt={'1rem'}>
                    
                    <Button colorScheme="green" rounded={'full'} size={'sm'} variant={'outline'} 
                        onClick = {()=> postVote(discussion.id, user?.user?.uid as string, "up") }
                        fontSize={'lg'}
                    >
                        <ArrowUpIcon />
                        {participants.filter(p => p.voteType == "up").length}
                        
                        <AvatarGroup size='xs' max={5} mx={'0.2rem'}>
                            {participants.filter(p => p.voteType == "up")
                                .map((p, index)=> {
                                if (appState.users[p.user_id] == undefined) return <Fragment key={index}></Fragment>
                                return <Avatar src={appState.users[p.user_id].photoURL || ""} key={index}/>
                            })}
                        </AvatarGroup>

                    </Button>

                    
                    <Button colorScheme="red" rounded={'full'} size={'sm'} variant={'outline'}
                        onClick = {()=> postVote(discussion.id, user?.user?.uid as string, "down") }
                        fontSize={'lg'}
                    >
                        <ArrowDownIcon />
                        {participants.filter(p => p.voteType == "down").length}
                        
                        <AvatarGroup size='xs' max={5} mx={'0.2rem'}>
                            {participants.filter(p => p.voteType == "down")
                                .map((p, index)=> {
                                if (appState.users[p.user_id] == undefined) return <Fragment key={index}></Fragment>
                                return <Avatar src={appState.users[p.user_id].photoURL || ""} key={index}/>
                            })}
                        </AvatarGroup>
                    </Button>

                    <Flex alignItems={'center'} flexWrap={'wrap'} gap={'0.5rem'}>
                        <EmojiPickUp 
                            activeEmoji = {EMOJIS.filter(e => participants.filter(p => p.user_id == user?.user?.uid && p.reacts?.includes(e)).length > 0 )}
                            onPick={(e)=> {
                                addReaction(discussion.id, user?.user?.uid as string, e);
                            }}
                            onAlreadyPicked={(e)=> {
                                removeReaction(discussion.id, user?.user?.uid as string, e);
                            }}
                        />
                        <Flex p = {'0.5rem'} py={0} gap={'0.3rem'} alignItems={'center'}>
                            {EMOJIS.map((emoji, idx)=> {
                                if(participants.filter(p => p.reacts?.includes(emoji)).length == 0) return <Fragment key={idx}></Fragment>
                                return <Button key={idx} colorScheme="gray" rounded={'full'} size={'sm'} variant={'outline'} cursor={'unset'} isActive={true}>
                                    {participants.filter(p => p.reacts?.includes(emoji)).length} {emoji}
                                </Button>
                            })}
                        </Flex>
                    </Flex>    
                </Flex>
            </Flex>
            
            <Flex>
                {comments.length} Comments:
            </Flex>

            <Flex width={'100%'} flexDir={'column'} gap={'0.5rem'}>
                {comments.map((comment, idx)=> {
                    return <Comment comment={comment} user={appState.users[comment.user_id]} key={idx}/>
                })}
            </Flex>
            
            <Divider />
            <Flex width={'100%'}>
                <MarkDownInput  textAreaProps={{
                    minH: '10rem'
                }}/>
            </Flex>
            
            <Flex width={'100%'} justifyContent={'flex-end'} gap={'1rem'}>
                <Button  colorScheme="purple" size={'md'}  variant={'outline'}> 
                    <BiMessageSquareCheck style={{ margin: '0 0.2rem 0 0'}}/> Close Discussion
                </Button>
                <Button  colorScheme="green" size={'md'} variant={'outline'}
                    onClick={()=> {
                        addComment(discussion.id, user?.user?.uid as string, "this is a comment");
                    }}
                >Comment</Button>
            </Flex>
        </Flex>}
    </>
}

import { BsThreeDotsVertical } from "react-icons/bs";
import DropDown from "../design/DropDown";

const Comment = ({ comment, user }: { comment: Comment, user: UserDocType | undefined })=> {
    console.log(comment);
    return <Flex p = {'1rem'}  
        border={'1px solid var(--border-color)'}
        rounded={'lg'} flexDir={'column'} width={'100%'} gap={'0.5rem'}
    >
        <Flex>
            {user && <Flex gap={'0.5rem'} alignItems={'center'} width={'100%'}>
                <Flex>
                    <Avatar 
                        src={user.photoURL as string} 
                        size={'sm'}
                    />
                </Flex>
                <Flex flexDir={'column'}>
                    <Text fontSize={'md'} fontWeight={'bold'} className={'roboto'} lineHeight={1}>
                        {user.displayName}
                    </Text>
                    <Text fontSize={'sm'} fontWeight={'thin'} color={'var(--muted-light-color)'} className={'roboto'} lineHeight={1}>
                        commented on {fromFirebaseTimeStamp(comment.createdAt).toDateString()}
                    </Text>
                </Flex>    
                <Flex ml={'auto'}>
                    <DropDown onChange={(o)=> {}} options={['Edit', 'Delete', 'red']}>
                        <Icon fontSize={'xl'}>
                            <BsThreeDotsVertical />
                        </Icon>
                    </DropDown>
                </Flex>
            </Flex>}
        </Flex> 
        <Flex pl={'0.2rem'}  rounded={'md'} p = {'0.2rem'}>
            <MarkDown text={comment.comment} className={styles.mark_down}/>
        </Flex>
    </Flex>
};

