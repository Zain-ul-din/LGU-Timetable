/* eslint-disable @next/next/no-img-element */
import { CloseIcon, DeleteIcon, EditIcon, WarningIcon } from '@chakra-ui/icons';
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
import AdminLayout from '../admin/layout';

export default function PastPaper({
  model,
  onDelete,
  onDownVote,
  onUpVote,
  onEdit,
  markAsSpam
}: {
  model: PastPaperDocType;
  onDownVote: () => void;
  onUpVote: () => void;
  onDelete: () => void;
  onEdit: () => void;
  markAsSpam: () => void;
}) {
  const [isUnder500] = useMediaQuery('(max-width: 500px)');
  const [user] = useAuthState(firebase.firebaseAuth);
  const [canEdit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return setEdit(false);
    const isAuthorizedUser = user.uid === model.uploader_uid;
    const isAdmin = user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    // check if can edit post any more
    const upVotesCount = (model.up_votes || []).length;
    const downVotesCount = (model.down_votes || []).length;
    const totalVotes = upVotesCount + downVotesCount;
    const downVotesPercentage = (downVotesCount / totalVotes) * 100;
    const isEditLocked = upVotesCount > 5 && downVotesPercentage < 50;
    const isEditByUser = !isEditLocked && isAuthorizedUser;
    setEdit(isEditByUser || isAdmin);
  }, [user, model]);

  const { onOpen, isOpen, onClose } = useDisclosure();
  const [showImg, setShowImg] = useState<boolean>(false);

  useEffect(() => {
    if (showImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showImg]);

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

            <img
              src={model.photo_url}
              alt="past_paper"
              width={'250'}
              height={'300'}
              onClick={() => {
                setShowImg(true);
              }}
              style={{
                objectFit: 'cover',
                borderRadius: '0.2rem',
                minWidth: '250px',
                maxWidth: '250px',
                maxHeight: '350px',
                minHeight: '350px',
                cursor: 'zoom-in',
                filter: model.spam ? 'blur(5px)' : ''
              }}
              loading="lazy"
            />

            <Tag position={'absolute'} variant={'solid'} colorScheme="gray" bottom={2} right={2}>
              {model.exam_type}
            </Tag>
            {model.spam && (
              <Text position={'absolute'} textAlign={'center'} color={'red.600'}>
                This post mark as spam by community see on our own risk.
                {user && (
                  <>
                    {user.uid === model.uploader_uid && (
                      <> Consider uploading material with correct data.</>
                    )}
                  </>
                )}
              </Text>
            )}
          </Center>

          {showImg && (
            <Flex
              p={2}
              position={'fixed'}
              m={0}
              backdropBlur={'xl'}
              top={0}
              bottom={0}
              left={0}
              overflowY={'auto'}
              height={'full'}
              right={0}
              flexDir={'column'}
              bg={'#111111e8'}
              zIndex={999999}>
              <Flex h={'full'} w={'full'} position={'relative'}>
                <Button
                  right={0}
                  size={'sm'}
                  top={0}
                  position={'absolute'}
                  colorScheme="purple"
                  onClick={() => {
                    setShowImg(false);
                  }}>
                  <CloseIcon />
                </Button>
                <img
                  src={model.photo_url}
                  alt="past_paper"
                  width={'100%'}
                  height={'auto'}
                  onClick={() => {
                    setShowImg(true);
                  }}
                  style={{
                    objectFit: 'contain',
                    borderRadius: '0.2rem'
                  }}
                  loading="lazy"
                />
              </Flex>
            </Flex>
          )}

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
                {model.up_votes ? model.up_votes.length : 0}
              </Button>
              <Button
                variant={'outline'}
                colorScheme="green"
                size={'sm'}
                onClick={() => {
                  onDownVote();
                }}>
                <BiUpArrow />
                {model.down_votes ? model.down_votes.length : 0}
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
                <Button size={'sm'} onClick={onEdit} isDisabled={false}>
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
          <AdminLayout fallBack={<></>}>
            <Button
              colorScheme={model.spam ? 'green' : 'red'}
              leftIcon={<WarningIcon />}
              onClick={(e) => {
                markAsSpam();
              }}>
              {model.spam ? 'Mark as not spam' : 'Mark as spam'}
            </Button>
          </AdminLayout>
        </Stack>
      </Flex>
    </>
  );
}
