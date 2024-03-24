import { Button, Flex, Heading } from '@chakra-ui/react';
import MarkDown from '../design/MarkDown';
import { useEffect, useState } from 'react';
import { HttpClient } from '~/lib/httpclient';
import MustSignIn from '../design/MustSigin';
import Nominate from './Nominate';
import Candidates from './Candidates';

const markDownContent = `

# Moderator Election


>  Nomination Begun at: March 14, 2024

>  Election Date: April 1st, 2024

>  Election End Date: April 6st, 2024

<br>

### Election Phase

Since this project is no longer maintained by the creators of this project. 
we believe the core moderators should come from the community, and be elected by the community itself through popular vote. 
We hold regular elections to determine who these community moderators will be.

### Candidacy Criteria

Generally, moderators should have the following qualities:

- patient and fair.
- Commitment to Open Source.
- Respectable towards user privacy.
- a solid understanding of the technical aspects relevant to our project to effectively oversee its progression

### Nomination Phase

During the nomination phase, any member of our community is welcome to put themselves forward as a potential community moderator.

Nominees must provide a brief introduction outlining why they believe they would be a suitable candidate for the project. This should include their vision for the project's future and any proposed new features they intend to introduce.

- All nominees will be listed in the order they submit their nominations during the nomination phase. Once the election phase begins, candidates will be arranged based on the number of votes they receive.

<br>

Please participate in the moderator elections by ranking the candidates, and perhaps even by nominating yourself to be a moderator. 

<br>

----

<br>

`;

export default function Election() {
  // const [mdContent, setMdContent] = useState<string>('');

  // useEffect(() => {
  //   const mdUrl =
  //     'https://raw.githubusercontent.com/Zain-ul-din/LGU-Timetable/static_hosting/docs/election.md';
  //   const fetchData = async () => {
  //     const httpClient = new HttpClient(mdUrl, (res) => {
  //       console.log(res);
  //       setMdContent(res.data);
  //     });
  //     httpClient.get();
  //   };

  //   fetchData();
  // }, []);

  return (
    <Flex maxW={'1250px'} mx={'auto'} py={4} px={'1rem'} flexDir={'column'}>
      <MarkDown text={markDownContent} />
      <Flex py={6} flexDir={'column'} gap={4}>
        <MustSignIn text="Sign-in to participate" hideBackBtn>
          <Nominate />
          <Heading>Candidates</Heading>
          <Candidates />
        </MustSignIn>
      </Flex>
    </Flex>
  );
}
