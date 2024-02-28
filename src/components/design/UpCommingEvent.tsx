import { Text, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTimeRemaining } from '~/lib/util';
import Confetti from 'react-confetti';

const UpComingEvent = () => {
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeRemaining>>();
  const [windowSize, setWindowSize] = useState({
    x: 0,
    y: 0
  });
  useEffect(() => {
    setWindowSize({
      x: window.innerWidth,
      y: window.innerHeight
    });
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(new Date(2023, 7, 14)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Up Coming Event */}
      <Flex
        ml={'auto'}
        p={3}
        bg={'green.500'}
        w={'100%'}
        alignItems={'center'}
        justifyContent={'center'}>
        <Confetti
          width={windowSize.x}
          height={windowSize.y}
          tweenDuration={10000}
          recycle={false}
          numberOfPieces={500}
          run={new Date().getDate() == 14}
        />
        <Text fontSize={'md'} color={'blackAlpha.900'} fontWeight={'semibold'}>
          {new Date().getDate() == 14 && 'HAPPY '}INDEPENDENCE DAY! 🎉
        </Text>
        {new Date().getDate() != 14 && timeLeft && (
          <Text ml={'auto'} color={'blackAlpha.900'} fontWeight={'semibold'}>
            {`TIME LEFT: ${timeLeft.days}:${timeLeft.hours}:${timeLeft.minutes}:${timeLeft.seconds}`}
          </Text>
        )}
      </Flex>
    </>
  );
};

export default UpComingEvent;
