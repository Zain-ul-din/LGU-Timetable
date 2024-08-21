import { Button, Center, Flex, Heading, Spinner } from '@chakra-ui/react';
import MarkDown from '../design/MarkDown';
import { useEffect, useState } from 'react';
import { HttpClient } from '~/lib/httpclient';
import MustSignIn from '../design/MustSigin';
import Nominate from './Nominate';
import Candidates from './Candidates';

export default function Election() {
  const [mdContent, setMdContent] = useState<string>('');

  useEffect(() => {
    const mdUrl =
      'https://raw.githubusercontent.com/Zain-ul-din/LGU-Timetable/static_hosting/docs/election.md';
    const fetchData = async () => {
      const httpClient = new HttpClient(mdUrl, (res) => {
        setMdContent(res.data);
      });
      httpClient.get();
    };

    fetchData();
  }, []);

  if (mdContent.length == 0) {
    return (
      <Center py={8}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex maxW={'1250px'} mx={'auto'} py={4} px={'1rem'} flexDir={'column'}>
      <MarkDown text={mdContent} />
      <Flex py={6} flexDir={'column'} gap={4}>
        <MustSignIn text="Sign-in to participate" hideBackBtn>
          {/* <Nominate /> */}
        </MustSignIn>
        <Heading>Candidates</Heading>
        <Candidates />
      </Flex>
    </Flex>
  );
}
