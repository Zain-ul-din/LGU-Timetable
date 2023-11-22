import styles from '~/styles/Contribute.module.css';
import Blob from './Blob';
import { Center, Flex, useMediaQuery, Text } from '@chakra-ui/react';
import { LINKS, ROUTING } from '~/lib/constant';
import Footer from './Footer';

import Image from 'next/image';
import BackBtn from './design/BackBtn';
import Link from 'next/link';

export default function Contribute() {
   const [isUnder800] = useMediaQuery('(max-width: 800px)');

   return (
      <div className={styles.wrapper}>
         {!isUnder800 && <Blob />}
         <Flex maxWidth={'1200px'} margin={'0 auto'} flexDirection={'column'}>
            <Center>
               <Text
                  fontSize={isUnder800 ? '3xl' : '5xl'}
                  fontWeight={'hairline'}
                  paddingX={'0.1rem'}
                  textAlign={'center'}
               >
                  Welcome to Contribution
               </Text>
            </Center>
            <Center>
               <Text paddingX={'1rem'} textAlign={'center'}>
                  {`We're thrilled that you're interested in contributing to our project. Even the smallest contribution can make a valuable impact on this project.`}
               </Text>
            </Center>
            <Center marginY={'2rem'}>
               <a href={LINKS.GIT_HUB_REPO_LINK} target="_blank">
                  <Image
                     src="/images/githubstar.png"
                     alt="github-stars"
                     width={250}
                     height={250}
                     className={styles.github_img}
                     loading="lazy"
                  />
               </a>
            </Center>
            <Flex flexDirection={'column'} gap={'0.2rem'}>
               <Center>
                  <Text
                     color={'blue.400'}
                     fontSize={'xl'}
                     fontFamily={'monospace'}
                     cursor={'pointer'}
                     _hover={{ textDecoration: 'underline' }}
                  >
                     <a href={LINKS.SHARE_IDEAS_LINK} target="_blank">
                        Have new idea? share here.
                     </a>
                  </Text>
               </Center>
               <Center>
                  <Text
                     color={'blue.400'}
                     fontSize={'xl'}
                     fontFamily={'monospace'}
                     as={'a'}
                     cursor={'pointer'}
                     _hover={{ textDecoration: 'underline' }}
                  >
                     <a href={LINKS.BUG_REPORT_LINK} target="_blank">
                        Report Bug here
                     </a>
                  </Text>
               </Center>
               <Center>
                  <Text
                     color={'blue.400'}
                     fontSize={'xl'}
                     fontFamily={'monospace'}
                     as={'a'}
                     cursor={'pointer'}
                     _hover={{ textDecoration: 'underline' }}
                  >
                     <a href={LINKS.API_QA_LINK} target="_blank">
                        Ask questions here!
                     </a>
                  </Text>
               </Center>

               <Center marginY={'1rem'}>
                  <Link href={ROUTING.home}>
                     <BackBtn />
                  </Link>
               </Center>
            </Flex>
         </Flex>
         {/* <Footer fixedBottom={false}/> */}
      </div>
   );
}
