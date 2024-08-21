import {
  Heading,
  Textarea,
  Text,
  Stack,
  Button,
  Box,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react';
import {
  doc,
  getCountFromServer,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  FieldValue
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { BsMarkdown } from 'react-icons/bs';
import { useUserCredentials } from '~/hooks/hooks';
import {
  CandidateDocType,
  ELECTION_INPUT_VALIDATION_PROMPT,
  ElectionPromptGeminiRes
} from '~/lib/election';
import { electionColRef } from '~/lib/firebase';
import askGemini from '~/lib/gemini';

export default function Nominate() {
  const [user] = useUserCredentials();
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');

  useEffect(() => {
    if (!user) return;

    const unSubScribe = onSnapshot(doc(electionColRef, user.uid), (snapShot) => {
      if (!snapShot.exists()) return;
      const res = snapShot.data();
      setResponse(res.response);
    });

    return () => unSubScribe();
  }, [user]);

  const submitResponse = useCallback(async () => {
    if (!user) return;
    setErr('');
    if (response.length <= 20) return setErr('content is to short');
    setLoading(true);

    const geminiResponse: ElectionPromptGeminiRes = JSON.parse(
      await askGemini(`${ELECTION_INPUT_VALIDATION_PROMPT} ${response}`)
    );

    if (!geminiResponse.isValid) {
      setErr(geminiResponse.message || '');
      setLoading(false);
      return;
    } else {
      setResponse(geminiResponse.markDown);
    }

    const { count } = (
      await getCountFromServer(query(electionColRef, where('id', '==', user.uid)))
    ).data();

    const data: CandidateDocType = {
      response: geminiResponse.markDown,
      uid: user.uid,
      updated_at: serverTimestamp(),
      created_at: serverTimestamp(),
      vote_count: 0,
      votes: []
    };

    const docRef = doc(electionColRef, user.uid);

    if (count === 0) {
      await setDoc(docRef, data);
    } else {
      await setDoc(
        docRef,
        {
          response: geminiResponse.markDown,
          updated_at: serverTimestamp()
        } as CandidateDocType,
        { merge: true }
      );
    }

    setLoading(false);
  }, [user, response]);

  if (!user) return <></>;

  return (
    <>
      <Heading size={'lg'}>Nominate Your Self</Heading>
      <Text>{`Nominees must provide a brief introduction outlining why they believe they would be a suitable candidate for the project. This should include their vision for the project's future and any proposed new features they intend to introduce.`}</Text>

      <Stack
        as={'form'}
        onSubmit={(e) => {
          e.preventDefault();
          submitResponse();
        }}>
        <FormControl isInvalid={err.length !== 0}>
          <Textarea
            placeholder="Enter your Response"
            minH={'20rem'}
            value={response}
            onChange={(e) => {
              setResponse(e.target.value);
            }}
          />
          <FormErrorMessage>{err}</FormErrorMessage>
        </FormControl>
        <Box w={'full'} display={'flex'}>
          <Text fontSize={'sm'} color={'rgba(255,255,255,0.5)'}>
            <BsMarkdown
              style={{
                display: 'inline-block',
                marginRight: '0.4rem',
                transform: 'translateY(2px)'
              }}
            />
            Supports Markdown Format
          </Text>
        </Box>
        <Box w={'full'} display={'flex'}>
          <Button
            type="submit"
            ml={'auto'}
            variant={'outline'}
            colorScheme="green"
            isLoading={loading}>
            Submit
          </Button>
        </Box>
      </Stack>
    </>
  );
}
