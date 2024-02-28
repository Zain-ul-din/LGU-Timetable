import { Box, Center, Flex } from '@chakra-ui/react';
import BackBtn from './BackBtn';
import { NotLoggedIn } from '../Header';
import { firebase } from '~/lib/firebase';

const MustSignIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      justifyContent={'center'}
      padding={'0.3rem'}
      maxWidth={'1200px'}
      margin={'0 auto'}
      flexDirection={'column'}
      marginBottom={'36'}
      gap={'1rem'}>
      <Box>
        <BackBtn />
      </Box>

      {firebase.firebaseAuth.currentUser ? (
        <>{children}</>
      ) : (
        <>
          <Center>
            <NotLoggedIn text="Sign-in to view the content" />
          </Center>
        </>
      )}
    </Flex>
  );
};

export default MustSignIn;
