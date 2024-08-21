import { Flex } from '@chakra-ui/react';
import Header from './Header';
import ChatRoomRoutes from './ChatRoomRoutes';
import useNestedRouting from './hooks/NestedRouting';

export default function ChatRoom() {
  useNestedRouting();

  return (
    <Flex
      width={'100%'}
      minHeight={'80vh'}
      height={'100%'}
      maxWidth={'1300px'}
      m={'0 auto'}
      rounded={'xl'}
      border={'1px solid var(--border-color)'}
      p={'0.2rem'}
      mb={'2rem'}>
      <Flex
        className="hide-scrollbar"
        width={'100%'}
        bg={'gray.600'}
        flexDir={'column'}
        rounded={'xl'}>
        <Header />
        <ChatRoomRoutes />
      </Flex>
    </Flex>
  );
}
