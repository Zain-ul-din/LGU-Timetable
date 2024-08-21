import {
  HStack,
  Text,
  Button as Btn,
  Flex,
  FlexProps,
  Input,
  useMediaQuery,
  Stack,
  Link
} from '@chakra-ui/react';
import PremiumButton from './design/PremiumButton';
import { useCallback, useState } from 'react';
import { useUserCredentials } from '~/hooks/hooks';

interface SessionInputProps extends FlexProps {}

export default function SessionInput({ ...rest }: SessionInputProps) {
  const [under600] = useMediaQuery('(max-width: 600px)');
  const [session, setSession] = useState({
    value: '',
    error: false
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [serverRes, setServerRes] = useState({
    message: undefined,
    succeed: undefined
  });

  const [user] = useUserCredentials();

  const isValidateSession = useCallback((session: string) => {
    var regex = /^[a-zA-Z0-9]+$/;
    const REQUIRE_LEN = 26;
    const duplicates = session.length - Array.from(new Set(Array.from(session))).length;
    return session.length === REQUIRE_LEN && duplicates < REQUIRE_LEN / 2 && regex.test(session);
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <Flex
      bg={'var(--card-color)'}
      border={'1px solid var(--border-color)'}
      w={'100%'}
      rounded={'md'}
      px={4}
      flexDir={'column'}
      py={5}
      gap={5}
      {...rest}>
      <h1
        style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: under600 ? '1.5rem' : '3rem',
          fontWeight: 'bold'
        }}>
        Keep Timetable Up-to-date for EveryOne
      </h1>
      <Stack
        as={'form'}
        onSubmit={(e) => {
          e.preventDefault();
          const error = !isValidateSession(session.value);
          setSession((prev) => ({ ...prev, error }));
          if (error) return;
          setLoading(true);
          fetch('/api/util/workflow', {
            method: 'POST',
            body: JSON.stringify({
              user_id: user.uid,
              session_id: session.value
            })
          })
            .then((res) => res.json())
            .then((res) => {
              setLoading(false);
              setServerRes(res);
            });
        }}>
        <Input
          variant={'filled'}
          boxShadow={'xl'}
          outline={'none'}
          _focus={{
            borderColor: 'var(--border-color)'
          }}
          size={'lg'}
          value={session.value}
          onChange={(e) =>
            setSession(() => ({
              value: e.target.value,
              error: !isValidateSession(e.target.value)
            }))
          }
          placeholder="Enter Session ID or Value"
        />
        <Text color={'red.400'}>{session.error ? 'Invalid Session ID' : ''}</Text>
        <HStack>
          <PremiumButton fontWeight={'bold'} size={'lg'} type="submit" isLoading={loading}>
            Submit
          </PremiumButton>
          <Btn
            variant={'outline'}
            size={'lg'}
            fontSize={{ sm: 'sm', base: 'xs' }}
            as={'a'}
            href={
              'https://github.com/IIvexII/LGU-TimetableAPI/blob/main/docs/How_to_get_session.md'
            }
            target="_blank">
            How to Obtain Session Id?
          </Btn>
        </HStack>
        {serverRes.message && (
          <Flex
            border={'1px solid var(--border-color)'}
            p={3}
            rounded={'md'}
            my={2}
            flexDir={'column'}
            gap={2}>
            <Text color={'rgba(255,255,255,0.7)'}>Server Response: {serverRes.message}</Text>
            {serverRes.succeed && (
              <Link
                href="https://github.com/Zain-ul-din/lgu-crawler/actions"
                target="_blank"
                fontSize={'sm'}
                textDecoration={'underline'}>
                🤖 See Workflow Running Here
              </Link>
            )}
          </Flex>
        )}
      </Stack>
    </Flex>
  );
}
