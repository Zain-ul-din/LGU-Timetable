import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Center,
  Flex,
  Text,
  FlexProps,
  HStack,
  Heading,
  Stack,
  useMediaQuery
} from '@chakra-ui/react';
import Link from 'next/link';
import { FIREBASE_ANALYTICS_EVENTS, reportFirebaseAnalytics } from '~/lib/FirebaseAnalysis';

interface EducativeProps extends FlexProps {
  link: string;
  title?: string;
  description: string;
}

const EducativeIcon = () => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    height="40px"
    style={{
      minWidth: '40px',
      minHeight: '40px'
    }}
    className="show-enterprise-nav text-white">
    <path
      d="M83.3333 0H16.6667C7.46115 0 0 7.46115 0 16.6667V83.326C0 92.5315 7.46115 99.9927 16.6593 99.9927H83.326C92.5315 99.9927 100 92.5388 100 83.3333V16.6667C100 7.46115 92.5388 0 83.3333 0ZM22.4861 81.5597L14.871 74.5896C14.3433 74.0985 14.3067 73.2703 14.7977 72.7353L31.479 54.5001C31.9261 54.0164 31.9408 53.2762 31.5157 52.7704L15.9191 34.2348C15.4573 33.6778 15.5233 32.8569 16.0803 32.3879L23.9666 25.7402C24.5236 25.2785 25.3445 25.3445 25.8135 25.9015L48.7101 53.1369C49.1352 53.6426 49.1205 54.3829 48.6734 54.8739L24.333 81.4937C23.842 82.0141 23.0211 82.0507 22.4934 81.567L22.4861 81.5597ZM85.5981 81.1346C85.5981 81.8602 85.0117 82.4465 84.2861 82.4465H48.9226C48.197 82.4465 47.6107 81.8602 47.6107 81.1346V71.416C47.6107 70.6904 48.197 70.1041 48.9226 70.1041H84.2861C85.0117 70.1041 85.5981 70.6904 85.5981 71.416V81.1346Z"
      fill="rgb(73 81 245/1)"></path>
  </svg>
);

export default function Educative({ link, title, description, ...rest }: EducativeProps) {
  const [isUnder500] = useMediaQuery('(max-width: 500px)');

  return (
    <Link
      href={link}
      onClick={() => {
        reportFirebaseAnalytics(FIREBASE_ANALYTICS_EVENTS.educative, {});
      }}
      target="_blank">
      <Center>
        <Flex
          _hover={{
            boxShadow: '0px 0px 50px rgba(255,255,255,0.01)',
            opacity: 0.9
          }}
          width={'100%'}
          py={'2.5'}
          px={2}
          minW={'100%'}
          {...rest}>
          <Flex
            bg={'white'}
            w={'100%'}
            py={3}
            rounded={'md'}
            px={4}
            position={'relative'}
            overflow={'hidden'}>
            <HStack spacing={isUnder500 ? 3 : 5} zIndex={10}>
              <EducativeIcon />
              <Stack spacing={0}>
                <Heading color={'black'} fontSize={'xl'}>
                  {title || 'Educative'}
                  <ExternalLinkIcon
                    fontSize={'md'}
                    ml={1}
                    style={{
                      transform: 'translateY(-1px)'
                    }}
                  />
                </Heading>
                <Text
                  color={'blackAlpha.900'}
                  fontWeight={'bold'}
                  fontSize={isUnder500 ? 'sm' : 'initial'}>
                  {description}
                </Text>
              </Stack>
            </HStack>

            <Flex
              position={'absolute'}
              color={'black'}
              fontSize={isUnder500 ? 'xx-small' : 'x-small'}
              fontWeight={'semibold'}
              right={0}
              bottom={0}
              px={1}
              py={'2px'}
              zIndex={99}
              bg={'gray.100'}
              rounded={'sm'}>
              Affiliate Link
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Link>
  );
}
