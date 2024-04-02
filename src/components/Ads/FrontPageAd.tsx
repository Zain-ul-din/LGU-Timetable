import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import router from 'next/router';
import useTyperEffect from '~/hooks/useTyperEffect';

// TODO: take data from props

export default function FrontPageAd() {
  const { displayText, isTypingComplete } = useTyperEffect({
    text: 'Earn Constituent Badge by voting candidate in moderator election phase.',
    speed: 40
  });

  return (
    <Flex mx={'auto'} maxWidth={'950px'} my={4}>
      <Flex
        bg={'var(--card-color)'}
        rounded={'md'}
        border={'1px solid var(--border-color)'}
        p={4}
        w={'full'}
        boxShadow={'0px 0px 50px rgba(255, 255,255, 0.03)'}
        mx={'1rem'}>
        <Stack w={'full'}>
          <Heading size={'lg'} textAlign={'center'}>
            Moderator Election Phase
          </Heading>
          <Text fontSize={'lg'}>
            {displayText}
            {!isTypingComplete ? <BlinkCursor /> : <></>}
          </Text>
          <Button
            size={'sm'}
            bgGradient={'linear(to-l, #7928CA, #FF0080)'}
            _hover={{
              bgGradient: 'linear(to-l, #7928CA, #FF0080)'
            }}
            onClick={() => {
              router.push('/election');
            }}
            fontSize={'md'}>
            Vote Nominees
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
}

const BlinkCursor = () => {
  return (
    <Flex
      height={'1rem'}
      display={'inline-block'}
      alignItems={'center'}
      style={{
        transform: 'translateY(0.3rem)'
      }}
      mx={'2px'}>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.5, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1,
          repeatDelay: 0.1,
          ease: 'linear'
        }}
        style={{
          background: 'white',
          width: '0.7rem',
          height: '0.7rem',
          borderRadius: '50%',
          transformOrigin: '50% 50%'
        }}>
        {' '}
      </motion.div>
    </Flex>
  );
};
