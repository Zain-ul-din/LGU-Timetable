import { useEffect, useState } from 'react';
import PastPaper from './PastPaper';
import { HStack, useToast, Text, Flex, Stack, Button, useDisclosure } from '@chakra-ui/react';
import { CloseIcon, InfoIcon } from '@chakra-ui/icons';
import OneTap from '../OneTap';
import { BiLeftArrow, BiRightArrow, BiRightArrowAlt } from 'react-icons/bi';
import { ROUTING } from '~/lib/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PastPaperToast() {
  const toast = useToast();
  const [show, setShow] = useState<boolean>(true);
  const router = useRouter();
  const toastId = 'past-paper-toast';

  useEffect(() => {
    if (router.pathname === ROUTING.past_papers || !show) return;
    setShow(false);

    toast({
      id: toastId,
      title: '📃 Past Papers',
      description: 'View Past Papers',
      duration: 1000 * 30,
      position: 'bottom-right',
      size: 'sm',
      colorScheme: 'gray',
      render: () => {
        return (
          <Flex
            bg={'var(--bg-color)'}
            border={'2px solid var(--card-color-dark)'}
            p={2}
            rounded={'md'}>
            <HStack w={'full'}>
              <Button
                size={'sm'}
                variant={'ghost'}
                onClick={() => {
                  toast.close(toastId);
                }}>
                <CloseIcon fontSize={'sm'} />
              </Button>
              <Stack w={'full'} spacing={1}>
                <HStack>
                  <InfoIcon />
                  <Text>📃 Past Papers</Text>
                </HStack>
                <HStack>
                  <Text fontSize={'sm'}>Browse Past Papers</Text>
                </HStack>
              </Stack>
              <Link href={ROUTING.past_papers}>
                <Button ml={'auto'} size={'sm'}>
                  <BiRightArrowAlt />
                </Button>
              </Link>
            </HStack>
          </Flex>
        );
      },
      isClosable: true
    });
  });
  return <></>;
}
