import styles from '~/styles/Contribute.module.css';
import Blob from './Blob';
import { Center, Flex, useMediaQuery, Text } from '@chakra-ui/react';
import { APIS_ENDPOINTS, LINKS } from '~/lib/constant';

import Image from 'next/image';
import BackBtn from './design/BackBtn';
import MarkDown from './design/MarkDown';
import { useEffect, useState } from 'react';
import axios from 'axios';

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
                  <BackBtn />
               </Center>
            </Flex>
            <Flex my={'4rem'}></Flex>
         </Flex>
         {/* <Footer fixedBottom={false}/> */}
         {!isUnder800 && <ReadmeMd />}
      </div>
   );
}

import { motion } from 'framer-motion';

const ReadmeMd = () => {
   const [readme, setReadme] = useState<string>('');

   useEffect(() => {
      const fetchReadmeMd = async () => {
         const res = await axios.get(APIS_ENDPOINTS.ReadMeMd);
         if (res.data) setReadme(res.data as string);
      };

      fetchReadmeMd();
   }, []);

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1, delay: 1 }}
      >
         <MarkDown text={readme} />
      </motion.div>
   );
};
