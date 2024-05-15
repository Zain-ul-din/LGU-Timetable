/* eslint-disable @next/next/no-img-element */
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

export default function PastPaper() {
  const [isUnder500] = useMediaQuery('(max-width: 500px)');

  return (
    <>
      <Flex
        p={3}
        w={isUnder500 ? '100%' : 'initial'}
        justifyContent={'center'}
        mb={4}
        border={'1px solid var(--border-color)'}>
        <Stack spacing={3}>
          <Center flexDir={'column'} gap={2}>
            <Text fontSize={'lg'} textAlign={'center'} maxW={'250px'} noOfLines={2}>
              Object Oriented Programming
            </Text>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/ecommerce-50bbb.appspot.com/o/past_paper_images%2F5191d8e0-044e-4091-a763-cd1482da0fec?alt=media&token=0769eab1-6a3f-40b4-abc4-29986e6f4e15"
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
              <Avatar size={'sm'} />
              <Stack spacing={-1}>
                <Text noOfLines={1} maxWidth={'250px'}>
                  Lorem ipsum
                </Text>
                <Text fontSize={'xs'}>Repo: 200</Text>
              </Stack>
            </HStack>

            <Flex ml={'auto'} gap={2}>
              <Button variant={'outline'} colorScheme="red" size={'sm'}>
                <BiDownArrow />
                200
              </Button>
              <Button variant={'outline'} colorScheme="green" size={'sm'}>
                <BiUpArrow />
                100
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
              Uploaded at {new Date().toDateString()}
            </Text>

            <Flex gap={2} ml={'auto'}>
              <Button size={'sm'}>
                <EditIcon />
              </Button>
              <Button colorScheme="red" size={'sm'}>
                <DeleteIcon />
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </>
  );
}
