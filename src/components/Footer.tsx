/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  Image,
  Tooltip,
  Card,
  useMediaQuery,
  Center,
  Heading,
  Divider
} from '@chakra-ui/react';

import SocialButton from './design/SocialButton';
import { BsGithub } from 'react-icons/bs';
import { BsSuitHeartFill } from 'react-icons/bs';
import React, { useState, useContext, useEffect } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';

import { LINKS } from '~/lib/constant';

export default function Footer({ fixedBottom }: { fixedBottom: boolean }): JSX.Element {
  // const [reply, setReply]: [string, React.Dispatch<React.SetStateAction<string>>] = useState <string> ('')
  // const userCredentials = useContext (UserCredentialsContext)

  const [isUnder600] = useMediaQuery('(max-width:600px)');

  return (
    <Flex
      width={'100%'}
      marginTop={'2rem'}
      flexDirection={'column'}
      padding={0}
      position={fixedBottom ? 'fixed' : 'initial'}
      bottom={0}>
      <Box
        bg={'var(--card-color)'}
        borderTop={'1px solid var(--border-color)'}
        color={'white'}
        position={'relative'}
        width={'100%'}>
        <Flex
          position={'absolute'}
          bottom={0}
          left={'50%'}
          width={'200px'}
          height={'200px'}
          filter={'blur(200px)'}
          rounded={'50%'}
          transform={'translateX(-50%)'}
          bg={'rgba(255,255,255,0.1)'}>
          {' '}
        </Flex>
        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          flexBasis={'100%'}
          maxWidth={'900px'}
          mx={'auto'}
          width={'100%'}>
          <Container
            as={Stack}
            maxW={'6xl'}
            padding={0}
            py={4}
            pt={8}
            px={0.1}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            {/* <Link href={'https://www.orbisdev.co/'}> */}
            <Flex
              // color={'orange.400'}
              fontWeight={'medium'}
              color={'orange.300'}
              flexDirection={'row'}
              align={'center'}
              fontSize={'md'}
              gap={1}>
              <Text>© OPEN SOURCE MADE WITH </Text>
              {/* <Text>Backed By - OrbisDev</Text> */}
              {/* <ExternalLinkIcon /> */}
              <Box>
                {' '}
                <BsSuitHeartFill />
              </Box>
            </Flex>
            {/* </Link> */}

            <Stack direction={'row'} spacing={4}>
              <SocialButton label={'GitHub Front-End'} href={LINKS.GIT_HUB_REPO_LINK}>
                <Tooltip label={'Front-End Repository'}>
                  <Image src={'/images/githubstar.png'} alt="github-logo" />
                </Tooltip>
              </SocialButton>

              <SocialButton label={'GitHub Back-End'} href={LINKS.BACK_END_REPO_LINK}>
                <Tooltip label="Back-End Repository" mt={2} mb={2}>
                  <Flex>
                    <BsGithub />
                  </Flex>
                </Tooltip>
              </SocialButton>
            </Stack>
          </Container>
          <FooterLinks />
          <Center mb={8} mt={8}>
            <Heading fontWeight={'light'} className="roboto" fontSize={'2xl'}>
              Github Contributors
            </Heading>
          </Center>
          <Flex
            pb={6}
            background={'inherit'}
            gap={isUnder600 ? '0.5rem' : '1.5rem'}
            flexDirection={'row'}
            flexWrap={'wrap'}
            justifyContent={'center'}
            marginBottom={'1rem'}
            px={4}>
            {
              <GithubContributors
                urls={GITHUB_REPOS.map(
                  (repo) =>
                    `https://api.github.com/repos/${repo.owner}/${repo.repo_name}/contributors`
                )}
              />
            }
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

import { ROUTING } from '~/lib/constant';

const FooterLinks = () => {
  const [isUnder600] = useMediaQuery('(max-width: 600px)');

  return (
    <>
      <Flex
        gap={isUnder600 ? '1.5rem' : '4rem'}
        columnGap={'1rem'}
        rowGap={'1rem'}
        maxWidth={'1200px'}
        margin={'1rem auto'}
        justifyContent={'center'}
        paddingX={'0.5rem'}
        paddingY={'.5rem'}
        flexWrap={'wrap'}>
        {Object.entries(ROUTING).map(([val, link], idx) => {
          return (
            <Link key={idx} href={link}>
              <Text
                fontFamily={'revert'}
                fontSize={'sm'}
                fontWeight={'hairline'}
                className="roboto"
                color={'whiteAlpha.900'}
                _hover={{ textDecoration: 'underline' }}>
                {val.toUpperCase()}
              </Text>
            </Link>
          );
        })}
      </Flex>
    </>
  );
};

import { GITHUB_REPOS } from '~/lib/constant';
import axios from 'axios';

const githubApiResponseSample = {
  login: 'Zain-ul-din',
  id: 78583049,
  node_id: 'MDQ6VXNlcjc4NTgzMDQ5',
  avatar_url: 'https://avatars.githubusercontent.com/u/78583049?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/Zain-ul-din',
  html_url: 'https://github.com/Zain-ul-din',
  followers_url: 'https://api.github.com/users/Zain-ul-din/followers',
  following_url: 'https://api.github.com/users/Zain-ul-din/following{/other_user}',
  gists_url: 'https://api.github.com/users/Zain-ul-din/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/Zain-ul-din/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/Zain-ul-din/subscriptions',
  organizations_url: 'https://api.github.com/users/Zain-ul-din/orgs',
  repos_url: 'https://api.github.com/users/Zain-ul-din/repos',
  events_url: 'https://api.github.com/users/Zain-ul-din/events{/privacy}',
  received_events_url: 'https://api.github.com/users/Zain-ul-din/received_events',
  type: 'User',
  site_admin: false,
  contributions: 14
};

type GithubApiResponse = typeof githubApiResponseSample;

import Link from 'next/link';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const GithubContributors = ({ urls }: { urls: string[] }) => {
  const [contributors, setContributors] = useState<Array<GithubApiResponse>>([]);

  useEffect(() => {
    Promise.all(
      urls.map((url) => {
        return axios.get(url);
      })
    )
      .then((responses) => responses.map((res) => res.data))
      .then((res) => res.reduce((acc, curr) => acc.concat(curr)))
      .then((contributors) =>
        (contributors as GithubApiResponse[]).reduce((acc, curr) => {
          return acc.filter((c) => c.url == curr.url).length > 0 ? acc : acc.concat(curr);
        }, [] as GithubApiResponse[])
      )
      // keep me at first 😉
      .then((contributors) =>
        contributors.map((contributor) => {
          return contributor.url === githubApiResponseSample.url
            ? { ...contributor, contributions: Infinity }
            : contributor;
        })
      )
      .then((distContributors) => setContributors(distContributors));
  }, [urls]);

  return (
    <>
      {contributors
        .filter((ele) => ele.contributions > 1)
        .sort((x, y) => {
          if (x.contributions < y.contributions) return 1;
          if (x.contributions > y.contributions) return -1;
          return 0;
        })
        .map((user, idx) => {
          return (
            <a key={idx} href={user.html_url} target="_blank">
              <Card
                key={idx}
                width={'100%'}
                flexDirection={'column'}
                background={'transparent'}
                margin={0}
                position={'relative'}
                display={'flex'}
                boxShadow={'none'}
                justifyContent={'center'}
                gap={1}>
                <img
                  src={user.avatar_url}
                  alt={`${user.login}-avatar`}
                  width={50}
                  height={50}
                  style={{ margin: '0 auto', borderRadius: '50%', border: '1px solid transparent' }}
                />

                {user.contributions > 400 && (
                  <Flex
                    position="absolute"
                    className="rotate-anim"
                    w={'50px'}
                    height={'50px'}
                    background={
                      'linear-gradient(90deg, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);'
                    }
                    filter={'blur(5px)'}
                    rounded={'50%'}
                    boxShadow={'0px 0px 20px rgba(255,255,255,0.05)'}
                    zIndex={'-10'}
                    top={'0'}
                    left={'13px'}>
                    {' '}
                  </Flex>
                )}
                <Text textAlign={'center'} fontWeight={'hairline'}>
                  {user.login}
                </Text>
              </Card>
            </a>
          );
        })}
    </>
  );
};
