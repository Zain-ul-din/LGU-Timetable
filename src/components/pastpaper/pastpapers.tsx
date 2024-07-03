import { Button, Flex, HStack, Input, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react';

import React, { useMemo, useState } from 'react';
import UploadModal from './UploadModal';
import PastPaper from './PastPaper';
import { usePastPaperPagination } from '~/lib/pastpaper';
import {
  deletePastPaper,
  pastPaperDownVote,
  pastPaperMarkAsSpam,
  pastPaperUpVote
} from '~/lib/pastpaper/crud';
import { PastPaperDocType } from '~/lib/pastpaper/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firebase } from '~/lib/firebase';

export default function PastPapers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pastPapers, { validate, loading }] = usePastPaperPagination();
  const [selectedPaper, setSelectedPaper] = useState<PastPaperDocType | null>(null);
  const [input, setInput] = useState<string>('');

  const filterPapers = useMemo(() => {
    return pastPapers.filter((p) => {
      return p.subject_name.toLowerCase().includes(input.toLowerCase());
    });
  }, [input, pastPapers]);

  const [user] = useAuthState(firebase.firebaseAuth);

  return (
    <>
      <Flex maxWidth={'1400px'} mx={'auto'} flexDir={'column'} position={'relative'}>
        {/* header */}
        <Stack
          w={'100%'}
          maxW={'1250px'}
          bg={'var(--bg-color)'}
          top={0}
          position={'sticky'}
          zIndex={999}
          p={3}
          rounded={'md'}
          mx={'auto'}
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          transition="all 0.3s ease-in-out">
          <HStack>
            <Input
              placeholder="Search Past Paper"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <Button
              variant={'outline'}
              colorScheme={'purple'}
              onClick={() => {
                onOpen();
                setSelectedPaper(null);
              }}>
              Upload
            </Button>
          </HStack>
          <Flex pl={2}>
            <details>
              <summary>⚠ Disclaimer</summary>
              <i>{`Past papers are just to help you understand the exam format. They don't guarantee passing or high scores, as final exams may not include exactly their content.`}</i>
            </details>
          </Flex>
        </Stack>

        {/* past papers */}
        <Flex gap={2} flexWrap={'wrap'} rounded={'sm'} p={2} justifyContent={'center'} m={3}>
          {loading && <Spinner />}
          {filterPapers.length === 0 && !loading && (
            <>
              <Text fontSize={'xl'} color="var(--muted-text)">
                📃 Not Results found. Be the first to upload it.
              </Text>
            </>
          )}
          {filterPapers.map((model, idx) => {
            return (
              <PastPaper
                key={idx}
                model={model}
                onDelete={() => {
                  deletePastPaper(model.uid);
                }}
                onDownVote={async () => {
                  if (!user) return;
                  await pastPaperDownVote(model.uid, user.uid);
                  validate(model.uid);
                }}
                onUpVote={async () => {
                  if (!user) return;
                  await pastPaperUpVote(model.uid, user.uid);
                  validate(model.uid);
                }}
                onEdit={() => {
                  setSelectedPaper(model);
                  onOpen();
                }}
                markAsSpam={() => {
                  pastPaperMarkAsSpam(model.uid, !model.spam);
                  validate(model.uid);
                }}
              />
            );
          })}
        </Flex>
        {/* past paper upload modal */}
        <UploadModal isOpen={isOpen} onClose={onClose} defaultData={selectedPaper} />
      </Flex>
    </>
  );
}
