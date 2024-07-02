/* eslint-disable @next/next/no-img-element */
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';
import { firebase } from '~/lib/firebase';
import { PastPaperDocType } from '~/lib/pastpaper/types';
import { fromFirebaseTimeStamp } from '~/lib/util';

export default function PastPaper({
  model,
  onDelete,
  onDownVote,
  onUpVote
}: {
  model: PastPaperDocType;
  onDownVote: () => void;
  onUpVote: () => void;
  onDelete: () => void;
}) {
  const [isUnder500] = useMediaQuery('(max-width: 500px)');
  const [user] = useAuthState(firebase.firebaseAuth);
  const [canEdit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return setEdit(false);
    const isAuthorizedUser = user.uid === model.uploader_uid;
    const isAdmin = user.uid === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    setEdit(isAuthorizedUser || isAdmin);
  }, [user, model]);

  const { onOpen, isOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        p={3}
        w={isUnder500 ? '100%' : 'initial'}
        justifyContent={'center'}
        mb={4}
        border={'1px solid var(--border-color)'}>
        <Stack spacing={3}>
          <Center flexDir={'column'} gap={2} position={'relative'}>
            <Text fontSize={'sm'} textAlign={'center'} maxW={'250px'} noOfLines={2}>
              {model.subject_name}
            </Text>
            <Tag position={'absolute'} variant={'solid'} colorScheme="gray" bottom={2} right={2}>
              {model.exam_type}
            </Tag>
            <img
              src={model.photo_url}
              alt="past_paper"
              width={'250'}
              height={'300'}
              style={{
                objectFit: 'cover',
                borderRadius: '0.2rem',
                minWidth: '250px',
                maxWidth: '250px',
                maxHeight: '350px',
                minHeight: '350px'
              }}
              loading="lazy"
            />
          </Center>

          <Divider />

          <Flex alignItems={'center'} gap={2}>
            <HStack>
              <Avatar size={'sm'} src={model.visibility ? model.uploader.photoURL || '' : ''} />
              <Stack spacing={-1}>
                <Text noOfLines={1} maxWidth={'250px'}>
                  {model.uploader.displayName}
                </Text>
                {/* <Text fontSize={'xs'}>Exam: {model.exam_type}</Text> */}

                {/* <Text fontSize={'xs'}>Repo: 200</Text> */}
              </Stack>
            </HStack>

            <Flex ml={'auto'} gap={2}>
              <Button
                variant={'outline'}
                colorScheme="red"
                size={'sm'}
                onClick={() => {
                  onUpVote();
                }}>
                <BiDownArrow />
                {model.up_votes?.length || 0}
              </Button>
              <Button
                variant={'outline'}
                colorScheme="green"
                size={'sm'}
                onClick={() => {
                  onDownVote();
                }}>
                <BiUpArrow />
                {model.down_votes?.length || 0}
              </Button>
            </Flex>
          </Flex>

          <Flex alignItems={'center'}>
            <Text
              fontWeight={'normal'}
              fontSize={'xs'}
              textAlign={'center'}
              maxW={'250px'}
              noOfLines={2}
              fontStyle={'italic'}
              color={'var(--muted-text)'}>
              Uploaded at {fromFirebaseTimeStamp(model.upload_at as any).toDateString()}
            </Text>

            {canEdit && (
              <Flex gap={2} ml={'auto'}>
                <Button size={'sm'} isDisabled={true}>
                  <EditIcon />
                </Button>
                <Button colorScheme="red" size={'sm'} onClick={onOpen}>
                  <DeleteIcon />
                </Button>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent m={4}>
                    <ModalHeader>Are you sure to delete?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Center py={6}>
                        <HStack spacing={12}>
                          <Button
                            colorScheme="red"
                            onClick={() => {
                              onDelete();
                              onClose();
                            }}>
                            Confirm
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </HStack>
                      </Center>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Flex>
            )}
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}
