import { Button, Text, ButtonProps, Box, useStyleConfig } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

export default function PremiumButton(props: ButtonProps) {
  const gradientAnimation = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  `;

  return (
    <Button
      variant="outline"
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '-1',
        backgroundImage: 'linear-gradient(to right, #d2a8ff, #f778ba, #ff7b72)',
        backgroundSize: '200% 100%',
        animation: `${gradientAnimation} 5s linear infinite`
      }}
      {...props}>
      <Text color={'var(--bg-color)'} fontWeight={'900'} className="roboto" fontSize={'1rem'}>
        {props.children}
      </Text>
    </Button>
  );
}
