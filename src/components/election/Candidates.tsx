import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Stack,
  Text,
  useMediaQuery,
  useToast
} from '@chakra-ui/react';
import {
  arrayUnion,
  doc,
  increment,
  onSnapshot,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { CandidateDocType } from '~/lib/election';
import { electionColRef, firebase } from '~/lib/firebase';
import MarkDown from '../design/MarkDown';
import { UserDocType } from '~/lib/firebase_doctypes';
import { cacheUser, fromFirebaseTimeStamp } from '~/lib/util';
import { ArrowUpIcon, UpDownIcon } from '@chakra-ui/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, UserCredential, signInWithPopup } from 'firebase/auth';
import { addLoggedInUser } from '~/lib/FirebaseAnalysis';
import Link from 'next/link';
import { ROUTING } from '~/lib/constant';
import AdminLayout from '../admin/layout';

export default function Candidates() {
  const [candidates, setCandidates] = useState<CandidateDocType[]>([]);
  const [users, setUsers] = useState<{ [uid: string]: UserDocType }>({});
  const [user, loading] = useAuthState(firebase.firebaseAuth);
  const [voted, setVoted] = useState<boolean>(false);
  const toast = useToast();

  useEffect(() => {
    const unSubscribe = onSnapshot(
      query(electionColRef, orderBy('vote_count', 'desc')),
      (snapShot) => {
        const candidates = snapShot.docs.map((doc) => doc.data()) as CandidateDocType[];
        setCandidates(candidates);
      }
    );

    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    let _voted = false;
    candidates.forEach((cand) => {
      if (cand.votes.includes(user?.uid as string)) _voted = true;
    });
    setVoted(_voted);
  }, [candidates, user]);

  useEffect(() => {
    let clearCache: () => void = () => {};
    candidates.forEach((candidate) => {
      clearCache = cacheUser([users, setUsers], candidate.uid);
    });
    return () => clearCache();
  }, [candidates]);

  const vote = useCallback(
    (docId: string) => {
      if (!user) return;
      setVoted(true);
      const docRef = doc(electionColRef, docId);

      const influence = user.email?.endsWith('@lgu.edu.pk') && !/[0-9]/.test(user.email) ? 5 : 1;
      updateDoc(docRef, {
        votes: arrayUnion(user.uid),
        vote_count: increment(influence)
      });

      toast({
        title: 'Voted',
        description: 'You Earned new Badge for voting in election phase.',
        render: () => {
          return (
            <HStack
              bg={'black'}
              my={2}
              p={4}
              rounded={'md'}
              border={'1px solid var(--border-color)'}>
              <UpDownIcon />
              <Text>
                Earned new Badge for voting in election phase.
                <Link
                  style={{
                    textDecoration: 'underline',
                    color: 'var(--muted-text)',
                    margin: '0 0.5rem'
                  }}
                  href={ROUTING.profile}>
                  Check Profile
                </Link>
              </Text>
            </HStack>
          );
        },
        status: 'success',
        position: 'top',
        duration: 9000,
        isClosable: true
      });
    },
    [user, toast]
  );

  const [isUnder600] = useMediaQuery('(max-width: 600px)');

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
                <Flex
                  w={'100%'}
                  gap={4}
                  flexWrap={'wrap'}
                  justifyContent={'center'}
                  alignItems={'center'}>
                  <Avatar src={users[candidate.uid].photoURL as string} />
                  <Stack spacing={-1}>
                    <Text fontSize={'xl'}>{users[candidate.uid].displayName}</Text>
                    <Text fontSize={'xs'} fontWeight={'light'} color={'rgba(255,255,255,0.8)'}>
                      Posted At: {fromFirebaseTimeStamp(candidate.created_at).toDateString()}
                    </Text>
                  </Stack>
                  {user && !loading ? (
                    <Stack ml={isUnder600 ? 'initial' : 'auto'} textAlign={'center'}>
                      <Button
                        boxShadow={'0px 0px 20px rgba(255,255,255,0.05)'}
                        variant={'outline'}
                        leftIcon={<ArrowUpIcon />}
                        onClick={() => vote(candidate.uid)}
                        isDisabled={voted}>
                        {candidate.votes.includes(user.uid) ? 'You Voted' : 'Vote'}{' '}
                        {users[candidate.uid].displayName}
                      </Button>
                      <Text fontSize={'sm'} color={'var(--muted-text)'}>
                        Total Votes Received: {candidate.votes.length}
                      </Text>
                    </Stack>
                  ) : (
                    <Button
                      colorScheme={'blue'}
                      ml={isUnder600 ? 'initial' : 'auto'}
                      onClick={() => {
                        signInWithPopup(firebase.firebaseAuth, new GoogleAuthProvider()).then(
                          (data: UserCredential) => addLoggedInUser(data.user)
                        );
                      }}>
                      Sign to vote
                    </Button>
                  )}
                </Flex>
                <AdminLayout fallBack={<></>}>
                  <Voters voters={candidate.votes} />
                </AdminLayout>
              </>
            )}
          </Flex>
        );
      })}
    </>
  );
}

const Voters = ({ voters }: { voters: string[] }) => {
  const [users, setUsers] = useState<{ [uid: string]: UserDocType }>({});

  useEffect(() => {
    let clearCache: () => void = () => {};
    voters.forEach((voter) => {
      clearCache = cacheUser([users, setUsers], voter);
    });
    return () => clearCache();
  }, [voters]);

  return (
    <>
      <Divider />
      <Flex flexWrap={'wrap'} gap={4} flexDir={'row'}>
        {Object.values(users).map((user, idx) => {
          return (
            <Box key={idx}>
              <HStack>
                <Avatar src={user.photoURL as string} />
                <Text fontSize={'sm'}>{user.displayName}</Text>
              </HStack>
            </Box>
          );
        })}
      </Flex>
    </>
  );
};
