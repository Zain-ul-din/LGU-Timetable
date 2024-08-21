import { useContext } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';

import { useMediaQuery, Box, Center } from '@chakra-ui/react';
import UserProfile from './design/UserProfile';
import { NotLoggedIn } from './Header';

export default function Profile() {
  const user = useContext(UserCredentialsContext);
  const [isUnder600] = useMediaQuery('(max-width: 600px)');

  return (
    <>
      {user?.user ? (
        <UserProfile user={user.user} />
      ) : (
        <>
          <Center marginY={'2rem'} fontSize={'1xl'} className="roboto">
            <NotLoggedIn text={'Sign in with Google to Join'} />
          </Center>
          <Center>
            <Box fontSize={'xl'} padding={'1rem'} textAlign={'center'}>
              Unlock a personalized experience with instant access to your{' '}
              <Box color={'whatsapp.400'} display={'inline'}>
                {' '}
                timetable selection history
              </Box>
              ,{' '}
              <Box color={'whatsapp.400'} display={'inline'}>
                {' '}
                community support
              </Box>
              , and
              <Box color={'whatsapp.400'} display={'inline'}>
                {' '}
                developer APIs.
              </Box>{' '}
              by simply logging in with your
              <Box color={'whatsapp.400'} display={'inline'}>
                {' '}
                Google account.
              </Box>
              and much more
            </Box>
          </Center>
        </>
      )}
    </>
  );
}
