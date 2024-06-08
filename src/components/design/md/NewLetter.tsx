import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Text,
  FormLabel,
  Heading,
  Input
} from '@chakra-ui/react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useUserCredentials } from '~/hooks/hooks';
import { newsLetterColRef } from '~/lib/firebase';

export default function NewsLetter({ uid }: { uid: string }) {
  const [email, setEmail] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [user] = useUserCredentials();

  const validateEmail = (value: string) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async () => {
    setResponse('');
    if (!validateEmail(email)) {
      setIsValid(false);
    } else {
      setLoading(true);
      await setDoc(
        doc(newsLetterColRef, `${email}_${uid}`),
        {
          email,
          createdBy: user ? user.uid : '',
          userMail: user ? user.email : '',
          userName: user ? user.displayName : '',
          photoURL: user ? user.photoURL : '',
          created_at: serverTimestamp()
        },
        {
          merge: true
        }
      );
      setLoading(false);
      setEmail('');
      setIsValid(true);
      setResponse(
        "Thank you for reaching out! 🌟 We've received your message and will be in touch with you soon. Your interest means a lot to us!"
      );
    }
  };

  return (
    <Flex p={3} flexDir={'column'} gap={4} rounded={'md'} border={'1px solid var(--border-color)'}>
      <Heading>📰 News Letter</Heading>
      <FormControl isInvalid={!isValid}>
        <FormLabel>Enter your email</FormLabel>
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <FormErrorMessage>Email is invalid</FormErrorMessage>
        <FormHelperText color={'green.400'} opacity={1}>
          {response}
        </FormHelperText>
      </FormControl>
      <Box>
        <Button onClick={handleSubmit} variant={'outline'} isLoading={loading}>
          Submit
        </Button>
      </Box>
      <Text fontSize={'xs'} ml={'auto'} color={'gray.400'}>
        Category: {uid}
      </Text>
    </Flex>
  );
}
