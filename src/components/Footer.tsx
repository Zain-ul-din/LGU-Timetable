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
            marginTop={'4rem'}
            flexDirection={'column'}
            padding={0}
            position={fixedBottom ? 'fixed' : 'initial'}
            bottom={0}>
            <Box
                bg={'var(--card-color)'}
                borderTop={'1px solid var(--border-color)'}
                color={'white'}
                width={'100%'}>
                {/* <Flex pl = {5} py = {5} flexDirection = {'row'}>
      		  <Textarea height={'36'} maxHeight={'200px'} placeholder = {'Leave your reply...'} px = {2} value = {reply} onChange = {(e)=> setReply (e.target.value.length <= 250 ? e.target.value : reply)}/>
      		  <Flex maxHeight={'200px'} px = {'1%'} flexDirection = {'column'} alignItems = {'center'}>
      		    	<Image src = {`https://avatars.dicebear.com/api/adventurer-neutral/${reply.replace(/[\W_]/g,"") == '' ? 'happy' : reply.replace(/[\W_]/g,"")}.svg?mood=happy`} height = {'100px'} width = {'100px'} rounded = {'base'} alt="emjoi"/>
      		    	<Tooltip label = 'login to add reply'>
						<Button width={'100px'} mt = {'5%'} isDisabled = {userCredentials?.user == null}>
							Add reply
						</Button>
					</Tooltip>
      		  </Flex>
      		</Flex> */}
                <Box
                    borderTopWidth={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    flexBasis={'100%'}
                    width={'100%'}>
                    <Container
                        as={Stack}
                        maxW={'6xl'}
                        py={4}
                        direction={{ base: 'column', md: 'row' }}
                        spacing={4}
                        justify={{ base: 'center', md: 'space-between' }}
                        align={{ base: 'center', md: 'center' }}>
                        <Flex flexDirection={'row'}>
                            <Text>© OPEN SOURCE MADE WITH </Text>
                            <Box color={'red'} pt={'5px'} px={'3px'}>
                                {' '}
                                <BsSuitHeartFill />
                            </Box>
                        </Flex>

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
                    <Center marginY={'1rem'}>
                        <Heading fontWeight={'thin'} className="roboto">
                            Github Contributors
                        </Heading>
                    </Center>
                    <Flex
                        background={'inherit'}
                        gap={isUnder600 ? '0.5rem' : '2.5rem'}
                        flexDirection={'row'}
                        flexWrap={'wrap'}
                        justifyContent={'center'}
                        marginBottom={'1rem'}>
                        {GITHUB_REPOS.map((repo, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <GithubContributors
                                        url={`https://api.github.com/repos/${repo.owner}/${repo.repo_name}/contributors`}
                                    />
                                </React.Fragment>
                            );
                        })}
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
                maxWidth={'1200px'}
                margin={'1rem auto'}
                justifyContent={'center'}
                paddingX={'2rem'}
                paddingBottom={'1rem'}
                flexWrap={'wrap'}
                borderBottom={'1px solid var(--border-color)'}>
                {Object.entries(ROUTING).map(([val, link], idx) => {
                    return (
                        <Link key={idx} href={link}>
                            <Text
                                fontSize={'1xl'}
                                fontWeight={'hairline'}
                                className="roboto"
                                color={'blue.300'}
                                _hover={{ textDecoration: 'underline' }}>
                                {val.toUpperCase()}
                            </Text>
                            <Divider />
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

import NextImage from 'next/image';
import Link from 'next/link';


const GithubContributors = ({ url }: { url: string }) => {
    const [contributors, setContributors] = useState<Array<GithubApiResponse>>([]);

    const [isUnder600] = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        axios.get(url).then((res) => setContributors(res.data));
    }, [url]);
    
    return (
        <>
            {contributors
                .filter((ele) => ele.contributions > 1)
                .map((user, idx) => {
                    return (
                        <a key={idx} href={user.html_url} target="_blank">
                            <Card
                                key={idx}
                                width={'100%'}
                                flexDirection={'column'}
                                background={'inherit'}
                                padding={isUnder600 ? '0.5rem' : '1rem'}
                                margin={0}
                                display={'flex'}
                                justifyContent={'center'}
                                borderBottom={'1px solid var(--border-color)'}>
                                <img
                                    src={user.avatar_url}
                                    alt={`${user.login}-avatar`}
                                    width={80}
                                    height={80}
                                    style={{ margin: '0 auto', borderRadius: '0.2rem' }}
                                />
                                <Text textAlign={'center'}>{user.login}</Text>
                            </Card>
                        </a>
                    );
                })}
        </>
    );
};
