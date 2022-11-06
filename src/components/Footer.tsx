import { Box, Button, Container, Flex, Stack, Text, Textarea,useColorModeValue, Image, Tooltip } from '@chakra-ui/react';

import SocialButton from './internals/SocialButton';
import { FaUniversity } from 'react-icons/fa'
import { BsGithub } from 'react-icons/bs'
import { BsSuitHeartFill } from 'react-icons/bs'
import React, { useState } from 'react'

import GitHubStarIcon from '../assets/githubstar.png'
import { GITHUB_URLS } from '../constants/Constants'

export default function Footer(): JSX.Element {
	const [reply, setReply]: [string, React.Dispatch<React.SetStateAction<string>>] = useState <string> ('')

  	return (

    	<Box
      		bg={useColorModeValue('gray.50', 'gray.900')}
      		color={useColorModeValue('gray.700', 'gray.200')}
			p = {5}
		>

      		<Flex pl = {5} py = {5} flexDirection = {'row'}>
      		  <Textarea height={'36'} maxHeight={'200px'} placeholder = {'Leave your reply...'} px = {2} value = {reply} onChange = {(e)=> setReply (e.target.value.length <= 250 ? e.target.value : reply)}/>
      		  <Flex maxHeight={'200px'} px = {'1%'} flexDirection = {'column'} alignItems = {'center'}>
      		    	<Image src = {`https://avatars.dicebear.com/api/adventurer-neutral/${ reply.replace(/[\W_]/g,"") == '' ? 'happy' : reply.replace(/[\W_]/g,"")  }.svg?mood=happy`} height = {'100px'} width = {'100px'} rounded = {'base'}/>
      		    	<Button width={'100px'} mt = {'5%'}>Add reply</Button>
      		  </Flex>
      		</Flex>
      
      	<Box
          	borderTopWidth={1}
          	borderStyle={'solid'}
          	borderColor={useColorModeValue('gray.200', 'gray.700')}
		>
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
            <Box color={'red'} pt = {'5px'} px = {'3px'}> {' '} <BsSuitHeartFill/></Box>
          </Flex>

          <Stack direction={'row'} spacing={4}>
            	<SocialButton label={'GitHub Front-End'} href={GITHUB_URLS.frontend}>
				 <Tooltip label = {'Front-End Repository'}><Image src = {GitHubStarIcon} /></Tooltip>
            	</SocialButton>
				
            	<SocialButton label={'GitHub Back-End'} href={GITHUB_URLS.backend}>
					<Tooltip label = 'Back-End Repository' mt = {2} mb = {2}>
						<Flex>
							<BsGithub/>
						</Flex>
					</Tooltip>
            	</SocialButton>
				
            	<SocialButton label={'Unitversity'} href={GITHUB_URLS.organizationURL}>
					<Tooltip label = 'University-Site' mt = {2} mb = {2}>
						<Flex>
							<FaUniversity />
						</Flex>
					</Tooltip>
            	</SocialButton>
          </Stack>

        </Container>
      </Box>
    </Box>
  );
}