import { Avatar, Divider, Flex, HStack, Heading, Stack, Text } from '@chakra-ui/react';
import { onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CandidateDocType } from '~/lib/election';
import { electionColRef } from '~/lib/firebase';
import MarkDown from '../design/MarkDown';
import { UserDocType } from '~/lib/firebase_doctypes';
import { cacheUser, fromFirebaseTimeStamp } from '~/lib/util';

export default function Candidates() {
  const [candidates, setCandidates] = useState<CandidateDocType[]>([]);
  const [users, setUsers] = useState<{ [uid: string]: UserDocType }>({});

  useEffect(() => {
    const unSubscribe = onSnapshot(query(electionColRef, orderBy('created_at')), (snapShot) => {
      const candidates = snapShot.docs.map((doc) => doc.data()) as CandidateDocType[];
      setCandidates(candidates);
    });

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    candidates.forEach((candidate) => {
      cacheUser([users, setUsers], candidate.uid);
    });
  }, [candidates]);

  return (
    <>
      {candidates.map((candidate, idx) => {
        return (
          <Flex
            key={idx}
            p={4}
            border={'1px solid var(--border-color)'}
            rounded={'md'}
            flexDir={'column'}
            gap={6}
            boxShadow={'0px 0px 50px rgba(255,255,255,0.01)'}>
            <Heading>{users[candidate.uid]?.displayName}</Heading>
            <Divider />
            <MarkDown text={candidate.response} />
            {users[candidate.uid] && (
              <>
                <Divider mt={4} />
                <HStack>
                  <Avatar src={users[candidate.uid].photoURL as string} />
                  <Stack spacing={-1}>
                    <Text fontSize={'xl'}>{users[candidate.uid].displayName}</Text>
                    <Text fontSize={'xs'} fontWeight={'light'} color={'rgba(255,255,255,0.8)'}>
                      Posted At: {fromFirebaseTimeStamp(candidate.created_at).toDateString()}
                    </Text>
                  </Stack>
                </HStack>
              </>
            )}
          </Flex>
        );
      })}
    </>
  );
}
