import {
  Box,
  Text,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Flex,
  useToast
} from '@chakra-ui/react';
import { FIREBASE_ANALYTICS_EVENTS, reportFirebaseAnalytics } from '~/lib/FirebaseAnalysis';

export default function RatingFeedBack({
  closeHandler,
  user_uid
}: {
  closeHandler: () => void;
  user_uid: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <RatingFeedBackModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          closeHandler();
        }}
        user_uid={user_uid}
      />
      <>
        <Box
          background={'var(--bg-color)'}
          textAlign={'center'}
          border={'1px solid var(--border-color)'}
          borderRadius={'lg'}
          display={'flex'}
          gap={'0.5rem'}
          padding={'0.5rem'}>
          <Button
            background={'transparent'}
            _hover={{ background: 'transparent' }}
            variant={'outline'}
            onClick={(e) => {
              onOpen();
            }}
            width={'100%'}>
            🙂 Give You Feedback
          </Button>

          <Button
            ml={'auto'}
            colorScheme="red"
            size={'sm'}
            style={{ transform: 'translateY(3px)' }}
            onClick={(e) => {
              reportFirebaseAnalytics(FIREBASE_ANALYTICS_EVENTS.promotion_closed.toString(), {});
              closeHandler();
            }}>
            X
          </Button>
        </Box>
      </>
    </>
  );
}

export const RatingFeedBackModal = ({
  onClose,
  isOpen,
  user_uid
}: {
  user_uid: string;
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [rating, setRating] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const star_ratings = ['worst', 'poor', 'average', 'good', 'excellent'];

  return (
    <Modal onClose={onClose} size={'xs'} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Timetable Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir={'column'} alignItems={'center'} gap={2}>
            <Text fontSize={'md'}>{`How's your timetable experience?`}</Text>
            <StarRatingComponent
              onChange={(val) => {
                setRating(val);
              }}
              starProps={{
                fontSize: '2xl'
              }}
              starCount={5}
            />
            {rating > 0 && <Text fontSize={'xl'}>{STAR_RATING[rating - 1]}</Text>}
          </Flex>
        </ModalBody>

        <ModalFooter>
          {rating > 0 && (
            <Center gap={'1rem'}>
              <Button
                colorScheme="green"
                variant={'outline'}
                onClick={() => {
                  updateDoc(doc(userColsRef, user_uid), {
                    rating
                  })
                    .then(() => {
                      onClose();
                      toast({
                        description: 'Thanks for feedback 👍',
                        position: 'bottom',
                        colorScheme: 'green',
                        duration: 2000
                      });
                    })
                    .catch(() => {
                      onClose();
                    });
                }}
                isLoading={loading}>
                Submit
              </Button>
              <Button onClick={onClose} variant={'outline'} isDisabled={loading}>
                Close
              </Button>
            </Center>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

import { StarIcon } from '@chakra-ui/icons';
import { FlexProps, IconProps } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { userColsRef } from '~/lib/firebase';
import { STAR_RATING } from '~/lib/constant';

const StarRatingComponent = ({
  flexProps,
  onChange,
  starCount,
  starProps
}: {
  flexProps?: FlexProps;
  onChange: (val: number) => void;
  starCount: number;
  starProps?: IconProps;
}) => {
  const [currHover, setCurrHover] = useState<number>(-1);
  const [currIdx, setCurrIdx] = useState<number>(-1);

  useEffect(() => {
    onChange(currIdx + 1);
  }, [currIdx]);

  return (
    <Flex gap={'0.5rem'} my={'0.5rem'} {...flexProps}>
      {new Array(starCount).fill('⭐').map((val, idx) => {
        return (
          <StarIcon
            key={idx}
            onMouseOver={(e) => {
              setCurrHover(idx);
            }}
            onMouseOut={(e) => {
              setCurrHover(-1);
            }}
            cursor={'pointer'}
            color={
              idx <= currIdx && currHover == -1
                ? 'yellow.400'
                : idx <= currHover
                ? 'yellow.300'
                : 'initial'
            }
            onClick={(e) => {
              setCurrIdx(idx);
            }}
            {...starProps}
          />
        );
      })}
    </Flex>
  );
};
