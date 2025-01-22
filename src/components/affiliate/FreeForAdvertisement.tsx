import { Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FIREBASE_ANALYTICS_EVENTS, reportFirebaseAnalytics } from '~/lib/FirebaseAnalysis';

interface FreeToAdvertiseProps {
  link: string;
}

export default function FreeForAdvertisement({ link }: FreeToAdvertiseProps) {
  return (
    <Link
      href={link}
      target="_black"
      referrerPolicy="no-referrer"
      onClick={() => {
        reportFirebaseAnalytics(FIREBASE_ANALYTICS_EVENTS.freeForAdvertisement, {});
      }}>
      <Center>
        <Flex
          bg={'white'}
          w={'100%'}
          py={3}
          rounded={'md'}
          px={4}
          mx={2}
          position={'relative'}
          overflow={'hidden'}
          color={'black'}>
          <Stack spacing={2}>
            <Heading fontSize={'2xl'}>Your Advertisement Here!</Heading>
            <Text color={'gray.800'} fontWeight={'bold'} fontSize={'sm'}>
              Get noticed for free with 3000+ signed in users! Click to place your ad.
            </Text>
          </Stack>
        </Flex>
      </Center>
    </Link>
  );
}
