import axios from 'axios';
import styles from '~/styles/developer.module.css';
import Button from './design/Button';
import { useToast } from '@chakra-ui/react';

import { IApiSchema } from '~/lib/redis';
import { Nunito } from 'next/font/google';

import { Button as Btn } from '@chakra-ui/react';
import { AddIcon, CopyIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

import { useContext, useEffect } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';

const nunito = Nunito({ subsets: ['latin'], weight: '400' });

interface IApiResponse extends IApiSchema {
  entityId: string;
}

export default function Developer({ children }: { children: React.ReactNode }) {
  const user = useContext(UserCredentialsContext);

  return (
    <div className={styles.developer + ' ' + nunito.className}>
      <h1>APIS For Developers</h1>
      <p>
        {`Welcome to LGU timetable site! I'm  excited to provide you with APIs that allow you to access and utilize our comprehensive timetable data. To get started, simply sign up for an API key and provide a brief description of how you plan to use our APIs.
 you will have access to our complete university timetable data and more. Our APIs are designed to be easy to use and integrate into your own applications and websites.
    If you have any questions or issues with our APIs, please feel free to contact us at any time. We are committed to providing you with the best possible experience.`}
      </p>
      <motion.div
        className={styles.api}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <h1>API KEYS</h1>
        <p>
          Your secret API keys are listed below. Please note that we do not display your secret API
          keys again after you generate them.
          <i>Do not share your API key with others.</i> You will get <b>200</b> request per day with
          each secret key and secret key will expire after <b>1 month</b>.
        </p>
      </motion.div>

      {!user?.user && (
        <>
          <Center>
            <NotLoggedIn text={'Sign in with Google to Get API keys'} />
          </Center>
        </>
      )}

      {user?.user && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5 }}>
            <DashBoardTable user={user.user as User} />
          </motion.div>
        </>
      )}

      {children}
    </div>
  );
}

import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Center,
  Alert,
  Text
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { apiAnalysisCol } from '~/lib/firebase';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

import { NotLoggedIn } from './Header';

const DashBoardTable = ({ user }: { user: User }) => {
  const [keys, setKeys] = useState<Array<IApiResponse>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLimitedExceed, setIsLimitedExceed] = useState<boolean>(false);

  const toast = useToast();

  const fetchApis = async () => {
    setLoading(true);
    const res = await axios.get(`/api/keys?q=${user.uid}`);
    setKeys(res.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    fetchApis();
  }, []);

  useEffect(() => {
    setIsLimitedExceed(keys.length >= 3);
  }, [keys]);

  return (
    <>
      {!isLimitedExceed ? (
        <>
          <Btn
            isLoading={loading}
            className={styles.api_btn}
            onClick={async (e) => {
              const payload: IApiSchema = {
                createdAt: new Date(),
                dailyQuota: new Date(),
                requestAllowed: 200,
                requestMade: 0,
                userId: user.uid
              };
              setLoading(true);
              const res = await axios.post('/api/apikey', payload);

              setLoading(false);

              fetchApis();
              toast({
                title: 'Succeeded',
                description: 'Api key has been generated',
                status: 'success',
                position: 'top'
              });
              setDoc(doc(apiAnalysisCol), {
                createdAt: serverTimestamp(),
                currBucket: keys,
                email: user.email
              });
            }}
            colorScheme="linkedin">
            <AddIcon /> {` Generate New API KEY`}
          </Btn>
          {loading && (
            <Alert
              background={'var(--card-color)'}
              marginY={'0.5rem'}
              borderRadius={'md'}
              border={'1px solid var(--border-color)'}>
              Wait! It may take some time to generate an API key.
            </Alert>
          )}
        </>
      ) : (
        <>
          <Alert background={'yellow.700'} marginY={'0.5rem'} borderRadius={'md'}>
            Api Keys limit has been exceed. Only 3 API keys are Allowed.
          </Alert>
        </>
      )}
      <TableContainer border={'1px solid var(--border-color)'} borderRadius={'md'}>
        <Table variant="unstyled" size={'sm'} colorScheme={'blackAlpha'}>
          <TableCaption color={'red.300'}>Secret Api keys</TableCaption>
          <Thead height={'3rem'}>
            <Tr>
              <Th fontSize={'1xl'}>Secret Key</Th>
              <Th fontSize={'1xl'}>Created At</Th>
              <Th fontSize={'1xl'}>Expire At</Th>
              <Th fontSize={'1xl'}>Request Made</Th>
            </Tr>
          </Thead>
          <Tbody height={'3rem'}>
            {keys.length > 0 && (
              <>
                {keys.map((key: IApiResponse, idx) => {
                  const nextMonthDate = new Date(
                    new Date(key.createdAt).getFullYear(),
                    new Date(key.createdAt).getMonth() + 1,
                    new Date(key.createdAt).getDate()
                  );

                  return (
                    <Tr borderTop={'1px solid var(--border-color)'} height={'3rem'} key={idx}>
                      <Td
                        cursor={'pointer'}
                        _hover={{ color: 'blue.400' }}
                        onClick={(e) => {
                          navigator.clipboard.writeText(key.entityId);
                          toast({
                            title: 'Secret Copied',
                            status: 'info',
                            position: 'top'
                          });
                        }}>
                        {key.entityId.slice(0, 4)}...
                        {key.entityId.slice(key.entityId.length - 4, key.entityId.length - 1)}
                        <CopyIcon transform={'translateY(-1.5px)'} marginX={'0.2rem'} />
                      </Td>
                      <Td>{new Date(key.createdAt).toDateString()}</Td>
                      <Td>{nextMonthDate.toDateString()}</Td>
                      <Td>
                        {key.requestMade} / {key.requestAllowed}
                      </Td>
                      <Td color={'red.300'}>
                        <Button
                          onClick={async (e) => {
                            if (loading) return;
                            const res = await axios.delete(`/api/keys?q=${key.entityId}`);
                            toast({
                              title: 'Succeeded',
                              description: res.data,
                              status: 'success',
                              position: 'top'
                            });
                            fetchApis();
                          }}
                          disabled={loading}
                          style={{ color: 'inherit' }}>
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
