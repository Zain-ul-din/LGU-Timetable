import { Flex, useMediaQuery } from '@chakra-ui/react';

export default function BgGlow() {
   const [isUnder1000] = useMediaQuery('(max-width: 1000px)');

   if (isUnder1000) return <></>;

   return (
      <>
         {/*eslint-disable-next-line @next/next/no-img-element */}
         <img
            src="/images/gradient-left-dark.svg"
            alt="gradient_img_left"
            className="bg-blob"
            style={{
               position: 'fixed',
               top: '0%',
               left: '-10%',
               right: '-50%',
               bottom: '0%',
               zIndex: -10,
               opacity: '80%'
            }}
         />

         {/*eslint-disable-next-line @next/next/no-img-element */}
         <img
            src="/images/gradient-right-dark.svg"
            alt="gradient_img_right"
            className="bg-blob"
            style={{
               position: 'fixed',
               top: '-50%',
               right: '-50%',
               zIndex: -10,
               opacity: '50%'
            }}
         />
      </>
   );
}
