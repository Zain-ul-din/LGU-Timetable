import { Flex, Image, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';
import { FIREBASE_ANALYTICS_EVENTS, reportFirebaseAnalytics } from '~/lib/FirebaseAnalysis';

interface FreeToAdvertiseProps {
  link: string;
}

export default function FreeForAdvertisement({ link }: FreeToAdvertiseProps) {
  const [isSmallScreen] = useMediaQuery('(max-width: 650px)');

  const imgSrc = isSmallScreen ? '/images/sample-ad-sm.png' : '/images/sample-ad-lg.png';

  return (
    <Link
      href={link}
      target="_blank"
      referrerPolicy="no-referrer"
      onClick={() => {
        reportFirebaseAnalytics(FIREBASE_ANALYTICS_EVENTS.freeForAdvertisement, {});
      }}>
      <Flex p={2} w={'full'} justify="center">
        <Image
          src={`${imgSrc}`}
          alt="sample ad image"
          height="auto"
          w={'full'}
          maxH={isSmallScreen ? '280px' : '220px'}
          objectFit={isSmallScreen ? 'unset' : 'contain'}
        />
      </Flex>
    </Link>
  );
}
