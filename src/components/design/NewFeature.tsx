import {
  Drawer,
  Text,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
  Button,
  Center
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { ROUTING } from '~/lib/constant';
import ViewLinkTxt from './ViewLinkTxt';

type ROUTING_KEY_TYPE = keyof typeof ROUTING;

interface NewFeaturePropsType {
  name: string;
  description: string;
  timeOut?: number;
  link: (typeof ROUTING)[ROUTING_KEY_TYPE];
}

export default function NewFeature({ name, description, link, timeOut }: NewFeaturePropsType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [isReachedBottom, setIsReachedBottom] = useState<boolean>(false);
  const fixedFooterRef = useRef<any>(null);

  useEffect(() => {
    window.addEventListener('scroll', (event) => {
      if (!fixedFooterRef.current) return;
      const bottomOffSet =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      const fixedFooterHeight = (fixedFooterRef.current as HTMLDivElement).clientHeight || 0;
      const tolerance = 10;
      setIsReachedBottom(Math.floor(bottomOffSet) <= Math.floor(fixedFooterHeight + tolerance));
    });

    if (localStorage.getItem('new_feature_promotion') == name) return;

    const timeOutId = setTimeout(
      () => {
        onOpen();
        localStorage.setItem('new_feature_promotion', name);
      },
      timeOut ? timeOut : 5000
    );

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  return (
    <>
      <Flex
        ref={(ele) => (fixedFooterRef.current = ele)}
        display={isReachedBottom ? 'none' : 'initial'}
        position={'fixed'}
        bottom={0}
        justifyContent={'center'}
        alignItems={'center'}
        width={'100%'}
        p={2}
        borderTop={'1px solid'}
        borderColor={'var(--border-color)'}
        bg={'var(--bg-color)'}
        zIndex={2}>
        <Center>
          <ViewLinkTxt href={link}>{name}</ViewLinkTxt>
        </Center>

        {/* Glow */}
        {/* <Flex position={'absolute'} width={'100%'} height={'100%'} bg ={'transparent'}
            boxShadow={'0px 0px 20px rgba(255,255,255,0.1)'} zIndex={-2}
        >
            {' '}
        </Flex> */}
      </Flex>

      <Drawer placement={'bottom'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="2xl"
              fontWeight="extrabold">
              {name}
            </Text>
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDir={'column'} p={2} py={5} fontWeight={'light'}>
              <Text>{description}</Text>
            </Flex>
            <Flex gap={3}>
              <Button
                onClick={() => {
                  onClose();
                  router.push(link);
                }}
                bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                _hover={{
                  bgGradient: 'linear(to-l, #7928CA, #FF0080)',
                  transform: 'scale(1.05)'
                }}>
                Get Started
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}>
                May be later
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
