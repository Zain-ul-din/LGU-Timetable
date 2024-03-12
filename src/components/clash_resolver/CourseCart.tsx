import {
  Alert,
  Button,
  Drawer,
  DrawerBody,
  Text,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  Center,
  Stack
} from '@chakra-ui/react';
import { SubjectObjectVal, SubjectOjectType } from '~/types/typedef';
import SubjectCard from './CourseCard';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { useMemo } from 'react';
import { BiExit } from 'react-icons/bi';
import Link from 'next/link';

export default function CourseCart({
  subjects,
  removeCartItemHandle,
  focusInputCb
}: {
  subjects: SubjectOjectType;
  removeCartItemHandle: (subj: string) => void;
  focusInputCb: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEmpty = useMemo(
    () => Object.values(subjects).filter((s) => s.isInCart).length == 0,
    [subjects]
  );

  return (
    <>
      <Flex
        w={'100%'}
        position={'fixed'}
        bottom={0}
        py={'1rem'}
        borderTop={'1px solid'}
        borderColor={'var(--border-color)'}
        justifyContent={'center'}
        bg={'var(--bg-color)'}
        zIndex={2}
        alignContent={'center'}
        flexDir={'column'}
        alignItems={'center'}>
        <Flex flexDir={'column'} gap={2}>
          <Button variant={'outline'} size={'sm'} position={'relative'} onClick={onOpen}>
            View Your Courses
            <ArrowUpIcon />
            {!isEmpty && (
              <Flex
                position={'absolute'}
                width={'8px'}
                height={'8px'}
                bg={'red'}
                rounded={'full'}
                top={-1}
                right={-1}>
                {' '}
              </Flex>
            )}
          </Button>
          <Link href={`/discussions?active_route=View&discussion_id=4NgpCTfJ2cX8Tkzdbs3C`}>
            <Text
              fontSize={'sm'}
              color={'blue.200'}
              textDecoration={'underline'}
              _hover={{
                cursor: 'pointer',
                color: 'blue.300'
              }}>
              {"Don't know how to use? View this post"}
            </Text>
          </Link>
        </Flex>
      </Flex>

      {/* Drawer */}
      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen} size={'xl'} allowPinchZoom>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Your Courses
            <Button colorScheme="red" size={'sm'} float={'right'} onClick={onClose}>
              <BiExit />
            </Button>
          </DrawerHeader>
          <DrawerBody maxH={'80vh'} overflowY={'auto'}>
            <Flex mb={'5rem'} flexDir={'column'} justifyContent={'center'}>
              {isEmpty && (
                <Stack>
                  <Text>No, Course added so far</Text>
                  <Button
                    variant={'outline'}
                    onClick={() => {
                      onClose();
                      focusInputCb();
                    }}>
                    Click here to add new course
                  </Button>
                </Stack>
              )}
              {Object.entries(subjects)
                .filter((e) => e[1].isInCart)
                .map(([subjName, subj]: [string, SubjectObjectVal], i) => {
                  return (
                    <SubjectCard
                      key={i}
                      name={subjName}
                      subject={subj}
                      onRemove={removeCartItemHandle}
                    />
                  );
                })}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
