import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { docsCol } from '~/lib/firebase';
import { updateDoc, doc, setDoc } from 'firebase/firestore';
import { useContext, useRef, useState } from 'react';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { admin_mail } from '~/lib/constant';
import React from 'react';

import { LINKS } from '~/lib/constant';
import Loader from './design/Loader';
import { IApiDoc } from '~/types/typedef';

import DocMarkDown from './design/MarkDown';
import Link from 'next/link';

export default function APIDocs({ staticDocs }: { staticDocs: Array<IApiDoc> }) {
  const [docs, setDocs] = useState<Array<IApiDoc>>(staticDocs);

  const user = useContext(UserCredentialsContext);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Flex width={'100%'} justifyContent={'center'} marginY={'2rem'} flexDirection={'column'}>
      <Center>
        <Heading className="roboto" colorScheme="gray" marginY={'1rem'}>
          API Documentation
        </Heading>
      </Center>

      {loading && <Loader>Loading Docs...</Loader>}
      {user?.user && <>{user.user.email == admin_mail && <AdminUploads docs={docs} />}</>}

      {docs.map((doc, key) => {
        return (
          <React.Fragment key={key}>
            {doc.id == 'index' && <DocMarkDown text={doc.docData} />}
          </React.Fragment>
        );
      })}

      <Accordion allowToggle>
        {docs.map((doc, key) => {
          return (
            <React.Fragment key={key}>
              {doc.id.startsWith('#') && (
                <DocAccordion title={<DocMarkDown text={doc.id} />}>
                  <DocMarkDown text={doc.docData} />
                </DocAccordion>
              )}
            </React.Fragment>
          );
        })}
      </Accordion>

      {docs.map((doc, key) => {
        return (
          <React.Fragment key={key}>
            {!doc.id.startsWith('#') && doc.id != 'index' && <DocMarkDown text={doc.docData} />}
          </React.Fragment>
        );
      })}

      <Center>
        <Text
          color={'blue.300'}
          _hover={{ textDecoration: 'underline' }}
          marginY={'3rem'}
          fontSize={'xl'}>
          <a href={`${LINKS.API_QA_LINK}`} target="_blank">
            Have any question or new idea? ask here!
          </a>
        </Text>
      </Center>
    </Flex>
  );
}

const DocAccordion = ({
  title,
  children
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  const ref = useRef<any>();
  const [openState, setOpenState] = useState<boolean>(false);

  return (
    <AccordionItem margin={'0.5rem'} ref={ref}>
      <h2>
        <AccordionButton
          onClick={() => {
            if (!openState) {
              setTimeout(() => {
                ref.current.scrollIntoView({
                  behavior: 'smooth'
                });
              }, 500);
            }

            setOpenState(!openState);
          }}>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AddIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};

const AdminUploads = ({ docs }: { docs: Array<IApiDoc> }) => {
  const [input, setInput] = useState<IApiDoc>();
  const toast = useToast();

  return (
    <Flex
      background={'var(--card-color)'}
      flexDirection={'column'}
      border={'1px solid var(--border-color)'}
      padding={'1rem'}
      marginY={'2rem'}>
      <Heading color={'cyan.700'} marginY={'1rem'}>
        Admin
      </Heading>
      <span>
        <Link
          href={'/developer/members'}
          style={{
            display: 'inline-block'
          }}>
          <Button size={'sm'} variant={'outline'}>
            View Developer Members
          </Button>
        </Link>
      </span>
      <Flex marginY={'1rem'} flexDirection={'column'}>
        {docs.map((doc, idx) => {
          return (
            <li
              key={idx}
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                setInput(doc);
              }}>
              {doc.id}
            </li>
          );
        })}
      </Flex>
      {input?.id != undefined && (
        <>
          <DocMarkDown text={input.docData} />
          <Flex margin={1} />
          <Textarea
            height={'40vh'}
            placeholder="Add new Doc"
            value={input?.docData}
            onChange={(e) => {
              setInput({ docData: e.target.value, id: input.id });
            }}
          />
          <Center marginY={'2rem'} gap={'1rem'}>
            <Button
              colorScheme="green"
              onClick={(e) => {
                // update doc
                const docRef = doc(docsCol, input.id);
                updateDoc(docRef, {
                  doc: input.docData
                });
                toast({
                  title: 'updated',
                  description: input.id + ' has been updated',
                  status: 'success'
                });
                setInput(undefined);
              }}>
              Update
            </Button>
            <Button colorScheme="red" onClick={(e) => setInput(undefined)}>
              Cancel
            </Button>
          </Center>{' '}
        </>
      )}

      {!input && <CreateNewDoc docs={docs} />}
    </Flex>
  );
};

const CreateNewDoc = ({ docs }: { docs: Array<IApiDoc> }) => {
  const [input, setInput] = useState<IApiDoc>({
    id: '',
    docData: ''
  });

  const toast = useToast();

  return (
    <>
      <Textarea
        height={'10vh'}
        placeholder={'Enter Unique Title'}
        marginY={'1.5rem'}
        value={input?.id}
        onChange={(e) => {
          setInput({ docData: input.docData, id: e.target.value });
        }}
      />
      <DocMarkDown text={input.docData} />
      <Textarea
        height={'40vh'}
        placeholder="Add new Doc"
        value={input?.docData}
        onChange={(e) => {
          setInput({ docData: e.target.value, id: input.id.replace('/', '-') });
        }}
      />
      <Center marginY={'2rem'}>
        {docs.filter((doc) => doc.id == input.id).length > 0 ? (
          <Text color={'red.400'}>Oh No! Document id already exists</Text>
        ) : (
          <Button
            colorScheme="green"
            onClick={(e) => {
              const newDoc = doc(docsCol, input.id);
              setDoc(newDoc, {
                doc: input.docData
              });
              toast({
                title: 'new doc uploaded',
                status: 'success',
                position: 'bottom'
              });
            }}>
            Upload
          </Button>
        )}
      </Center>{' '}
    </>
  );
};
