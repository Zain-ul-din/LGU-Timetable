import { Avatar, Badge, Flex, Stack, Text } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { CHAT_CATEGORIES, ROUTING } from '~/lib/constant';
import handleGlowBlob from '~/lib/glow';
import { NotLoggedIn } from '../Header';
import Link from 'next/link';
import { ChatIcon, TriangleUpIcon } from '@chakra-ui/icons';

import type { FlexProps } from '@chakra-ui/react';
import AppStateProvider from './hooks/AppStateProvider';
import { useRouter } from 'next/router';
import { PushNestedRouterParam } from './hooks/NestedRouting';

export default function Header() {
   const potentialUser = useContext(UserCredentialsContext);
   const [appState, setAppState] = useContext(AppStateProvider);
   const router = useRouter();

   if (!potentialUser)
      return (
         <Flex width={'100%'} justifyContent={'center'} my={'2rem'}>
            <NotLoggedIn text="Login to Join Discussions" />
         </Flex>
      );

   return (
      <Flex flexDir={'column'} width="100%" className="glow roboto">
         <Flex p={'0.5rem'} gap={'0.5rem'} borderBottom={'1px solid var(--border-color)'}>
            <Flex flexDir={'column'} justifyContent={'center'}>
               <Avatar src={potentialUser.user?.photoURL || ''} size={'sm'} />
            </Flex>
            <Flex alignItems={'center'} justifyContent={'center'}>
               <Link href={ROUTING.profile}>
                  <Text px={'2px'} fontSize={'lg'} color={'blue.400'}>
                     {potentialUser.user?.displayName}
                  </Text>
               </Link>
               <Text fontSize={'xs'} px={'2px'} py={'0.5rem'}>
                  <Badge bg={'var(--gold-lighter)'} border={'1px solid var(--gold)'} px={'0.2rem'}>
                     <TriangleUpIcon color={'var(--gold)'} /> {potentialUser.user?.repo || 0}
                  </Badge>
               </Text>
            </Flex>

            <Flex
               ml={'auto'}
               alignSelf={'center'}
               cursor={'pointer'}
               mr={'1rem'}
               onClick={() => {
                  setAppState({ ...appState, active_route: 'Upload', upload_category: undefined });
                  PushNestedRouterParam(
                     { ...appState, active_route: 'Upload', upload_category: undefined },
                     router
                  );
               }}
            >
               <ChatIcon />
            </Flex>
         </Flex>
      </Flex>
   );
}

// bg='rgba(255, 255, 255, 0.1)'
/*
{Object.values(CHAT_CATEGORIES).map((chatCategory, idx)=> {
            return <Flex key={idx} px={'2rem'} mr={'auto'} width={'100%'}
                py={'1rem'} 
                rounded={'lg'} cursor={'pointer'}
                border={'0.1px solid var(--border-color)'}
                className="roboto glow"
                onMouseMove={handleGlowBlob}
                bg={''}
                _hover={{
                    bg:'rgba(255, 255, 255, 0.05)'
                }}
            >
                {chatCategory}
            </Flex>
        })}
*/
