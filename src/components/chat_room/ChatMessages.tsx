import {  TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { Avatar, Flex, FlexProps, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { CHAT_CATEGORIES_EMOJIS } from '~/lib/constant';
import { DiscussionDocType } from '~/lib/firebase_doctypes';
import { calculateVotes, fromFirebaseTimeStamp } from '~/lib/util';
import { useContext } from 'react';
import AppStateProvider, { AppState } from './hooks/AppStateProvider';
import { PushNestedRouterParam } from './hooks/NestedRouting';
import { useRouter } from 'next/router';

export default function ChatMessages() {
   const [appState, setAppState] = useContext(AppStateProvider);
   const router = useRouter();
   
   return (
      <Flex flexDir={'column'} p={'0.5rem'} gap={'0.5rem'}>
         {Object.values(appState.discussions).map((message, idx) => (
            <ChatMessageCard
               key={idx}
               message={message}
               state={appState}
               props={{
                  onClick: () => {
                     setAppState({ ...appState, active_route: 'View', discussion_id: message.id });
                     PushNestedRouterParam({ ...appState, active_route: 'View', discussion_id: message.id }, router);
                  }
               }}
            />
         ))}
      </Flex>
   );
}

export const ChatMessageCard = ({
   message,
   state: { users },
   props
}: {
   message: DiscussionDocType;
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
         {...props}
      >
         <Flex flexDir={'column'} alignItems={'center'} mt={'auto'} gap={'0.01rem'}>
            <TriangleUpIcon fontSize={'xs'} />
            <Text fontSize={'0.8rem'}>{calculateVotes([], [])}</Text>
            <TriangleDownIcon fontSize={'xs'} />
         </Flex>
         <Flex bg={'var(--card-color-dark)'} p={'0.5rem'} rounded={'lg'}>
            {CHAT_CATEGORIES_EMOJIS[message.discussionType as keyof typeof CHAT_CATEGORIES_EMOJIS]}
         </Flex>
         <Flex flexDir={'column'}>
            <Heading className="roboto" fontSize={isUnder700 ? '0.8rem' : '1.2rem'}>
               {message.title}
            </Heading>
            <Text fontSize={'0.7rem'} color={'var(--muted-light-color)'}>
               Started
               {users[message.authorId] && (
                  <>
                     {' '}
                     by{' '}
                     <Text display={'inline-block'} color={'ghostwhite'}>
                        {users[message.authorId].displayName}
                     </Text>{' '}
                  </>
               )}
               at: {fromFirebaseTimeStamp(message.createdAt).toDateString()}
            </Text>
         </Flex>

         {users[message.authorId] && (
            <Avatar src={users[message.authorId].photoURL as string} size={'sm'} ml={'auto'} />
         )}
      </Flex>
   );
};
