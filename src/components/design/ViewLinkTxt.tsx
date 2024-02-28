import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

export default function ViewLinkTxt({ children, href }: { href: string; children: ReactNode }) {
  const router = useRouter();

  return (
    <Text
      textDecoration={'underline'}
      textDecorationColor={'#FF0080'}
      textDecorationThickness={'1px'}
      _hover={{
        cursor: 'pointer'
      }}
      onClick={() => {
        router.push(href);
      }}>
      View
      <Text
        position={'relative'}
        textDecoration={'none'}
        display={'inline-block'}
        mx={2}
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text">
        {children}
      </Text>
    </Text>
  );
}
