import { Button, Flex, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { BsEmojiSmile } from "react-icons/bs";
import { EMOJIS } from "~/lib/constant";

export default function EmojiPickUp ({ onPick, activeEmoji, onAlreadyPicked } : 
  { onPick: (emoji: string)=> void, activeEmoji: Array<string>, onAlreadyPicked: (emoji: string)=> void }
) {
    const initialFocusRef = React.useRef<any>(null);
    const { onOpen, onClose, isOpen } = useDisclosure()
    
    return <Popover
      initialFocusRef={initialFocusRef}
      placement='top'
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
    >
      <PopoverTrigger>
        <Button colorScheme="gray" rounded={'full'} size={'sm'} variant={'outline'}>
            <BsEmojiSmile/>
        </Button>
      </PopoverTrigger>
      <PopoverContent color='white' bg='var(--bg-color)' maxW={'15rem'}>
        <Flex p = {'0.5rem'} gap={'0.3rem'}>
            {EMOJIS.map((emoji, idx)=> {
                return <Flex p={'0.2rem'} key = {idx} rounded={'md'} 
                bg={activeEmoji.includes(emoji) ? 'var(--card-color-dark)' : 'var(--bg-color)'}
                _hover={{
                    bg: 'var(--card-color-dark)',
                    cursor: 'pointer'
                }} onClick={(e)=> {
                  onClose();
                  if(activeEmoji.includes(emoji)) 
                  {
                    onAlreadyPicked(emoji);
                  } else 
                  {
                    onPick(emoji);
                  }
                }}>{emoji}</Flex>
            })}
        </Flex>
      </PopoverContent>
    </Popover>
}
