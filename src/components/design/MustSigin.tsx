import { Box, Center, Flex, Text } from '@chakra-ui/react';
import BackBtn from './BackBtn';
import { NotLoggedIn } from '../Header';
import { firebase } from '~/lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const MustSignIn = ({
  children,
  text,
  hideBackBtn
}: {
  children: React.ReactNode;
  text?: string;
  hideBackBtn?: boolean;
}) => {
  const [user, loading, err] = useAuthState(firebase.firebaseAuth);

  if (err) {
    return (
      <Center>
        <Text color={'red.300'} p={10}>
          Error loading auth. Try refreshing the page.
        </Text>
      </Center>
    );
  }

  if (user) return <>{children}</>;

  return (
    <Flex
      justifyContent={'center'}
      padding={'0.3rem'}
      maxWidth={'1200px'}
      margin={'0 auto'}
      flexDirection={'column'}
      marginBottom={'36'}
      gap={'1rem'}>
      {hideBackBtn ? (
        <></>
      ) : (
        <Box>
          <BackBtn />
        </Box>
      )}
      <Center>
        <NotLoggedIn text={text || 'Sign-in to view the content'} isLoading={loading} />
      </Center>
    </Flex>
  );
};

export default MustSignIn;
