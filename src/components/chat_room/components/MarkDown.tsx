import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import { Button, Flex, Textarea, Text, TextareaProps } from '@chakra-ui/react';
import { useState } from 'react';
import MarkDownRenderer from '~/components/design/MarkDown';
import styles from '~/styles/chat_room/MarkDown.module.css';

interface MarkDownProps {
   textAreaProps: TextareaProps;
   markdowntext?: string;
}

export default function MarkDown(props: MarkDownProps) {
   const [view, setView] = useState<boolean>(false);

   return (
      <Flex
         flexDir={'column'}
         bg={'var(--card-color)'}
         rounded={'lg'}
         gap={'0.5rem'}
         p={'0.5rem'}
         width={'100%'}
      >
         <Flex gap={'0.5rem'}>
            <Button size={'sm'} variant={'outline'} isActive={!view} onClick={() => setView(false)}>
               <EditIcon />
            </Button>
            <Button size={'sm'} variant={'outline'} isActive={view} onClick={() => setView(true)}>
               <ViewIcon />
            </Button>
         </Flex>
         {!view ? (
            <Textarea
               className="hide-scrollbar"
               minH={'12rem'}
               maxH={'30rem'}
               {...props.textAreaProps}
            />
         ) : (
            <Flex
               border={'1px solid var(--border-color)'}
               rounded={'md'}
               minH={'12rem'}
               overflowY={'auto'}
               p={'0.5rem'}
               className="hide-scrollbar"
            >
               <MarkDownRenderer text={props.markdowntext || ''} className={styles.mark_down} />
            </Flex>
         )}
         {view && (
            <Text
               ml={'auto'}
               className="roboto"
               fontSize={'sm'}
               color={'var(--muted-color)'}
               fontWeight={'semibold'}
            >
               Markdown is supported
            </Text>
         )}
      </Flex>
   );
}
