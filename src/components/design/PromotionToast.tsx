import { Box, Button } from '@chakra-ui/react';
import { FIREBASE_ANALYTICS_EVENTS, reportFirebaseAnalytics } from '~/lib/FirebaseAnalysis';
import Image from 'next/image';

export default function PromotionToast({ closeHandler }: { closeHandler: () => void }) {
  return (
    <>
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
            onClick={(e) => {
              reportFirebaseAnalytics(
                FIREBASE_ANALYTICS_EVENTS.link_share_on_whatsapp.toString(),
                {}
              );
              window.location.href = `https://api.whatsapp.com/send/?text=${encodeURI(
                window.location.href
              )}&type=custom_url&app_absent=0`;
            }}>
            Show some ❤️ by sharing this website! {` `}
            <Image src={'/images/whatsapp.png'} alt="hello_world" width={35} height={35} />
          </Button>

          <Button
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
