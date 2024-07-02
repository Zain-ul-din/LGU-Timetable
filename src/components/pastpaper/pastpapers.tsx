import { Button, Flex, HStack, Input, useDisclosure } from '@chakra-ui/react';

import React, { useEffect } from 'react';
import UploadModal from './UploadModal';
import PastPaper from './PastPaper';
import { usePastPaperPagination } from '~/lib/pastpaper';
import { deletePastPaper, pastPaperDownVote, pastPaperUpVote } from '~/lib/pastpaper/crud';

export default function PastPapers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pastPapers, { validate }] = usePastPaperPagination();

  return (
    <>
      <Flex maxWidth={'1400px'} mx={'auto'} flexDir={'column'} position={'relative'}>
        {/* header */}
        <HStack
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
          <Input placeholder="Search Past Paper" />
          <Button variant={'outline'} colorScheme={'purple'} onClick={onOpen}>
            Upload
          </Button>
        </HStack>
        {/* past papers */}
        <Flex gap={2} flexWrap={'wrap'} rounded={'sm'} p={2} justifyContent={'center'} m={3}>
          {pastPapers.map((model, idx) => {
            return (
              <PastPaper
                key={idx}
                model={model}
                onDelete={() => {
                  deletePastPaper(model.uid);
                }}
                onDownVote={async () => {
                  pastPaperDownVote(model.uid, '');
                  validate(model.uid);
                }}
                onUpVote={async () => {
                  pastPaperUpVote(model.uid, '');
                  validate(model.uid);
                }}
              />
            );
          })}
        </Flex>

        {/* past paper upload modal */}
        <UploadModal
          isOpen={isOpen}
          onClose={onClose}
          staticData={{
            bscs: ['hello world']
          }}
        />
      </Flex>
    </>
  );
}
