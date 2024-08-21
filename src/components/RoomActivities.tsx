import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  Flex,
  FlexProps,
  Heading,
  Input,
  Text,
  Link,
  Stack,
  useMediaQuery,
  Grid,
  Divider,
  Tooltip
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { RoomActivitiesStateType, UseStateProps } from '~/types/typedef';
import styles from '~/styles/freeclassroom.module.css';
import BackBtn from './design/BackBtn';
import { ChevronDownIcon } from '@chakra-ui/icons';
import DropDown from './design/DropDown';
import { DAYS_NAME, ROUTING, timetableHeadTitles } from '~/lib/constant';
import { hashStr } from '~/lib/cipher';

type RoomMetaData = {
  room: string;
  program?: string;
};

interface IRoomsType {
  'NB Rooms': Array<RoomMetaData>;
  'OB Rooms': Array<RoomMetaData>;
  Labs: Array<RoomMetaData>;
  Seminars: Array<RoomMetaData>;
  Others: Array<RoomMetaData>;
}

export default function RoomActivities({
  parentState,
  departments
}: {
  parentState: UseStateProps<RoomActivitiesStateType>;
  departments: string[];
}) {
  const [isUnder500] = useMediaQuery('(max-width: 500px)');

  const [rooms, setRooms] = useState<IRoomsType>({
    'NB Rooms': [],
    'OB Rooms': [],
    Labs: [],
    Seminars: [],
    Others: []
  });

  const [state, setState] = parentState;
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    let room_states: IRoomsType = {
      'NB Rooms': [],
      'OB Rooms': [],
      Labs: [],
      Seminars: [],
      Others: []
    };

    state.rooms
      .filter((room) => room.room.toLocaleLowerCase().includes(input))
      .forEach((entry) => {
        const roomName = entry.room.toLocaleLowerCase().trim();

        if (roomName.includes('room') && !roomName.includes('seminar')) {
          if (roomName.endsWith('nb')) {
            room_states['NB Rooms'].push(entry);
          } else {
            room_states['OB Rooms'].push(entry);
          }
        } else if (roomName.includes('lab')) {
          room_states['Labs'].push(entry);
        } else if (roomName.includes('seminar')) {
          room_states['Seminars'].push(entry);
        } else {
          room_states['Others'].push(entry);
        }
      });

    setRooms(room_states);
  }, [state.rooms, input]);

  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        <Box maxWidth={'10rem'}>
          <Box>
            <BackBtn />
          </Box>
        </Box>
        <Box marginY={'2rem'}>
          <Alert background={'green.600'} borderRadius={'lg'} marginY={'1rem'}>
            {`Queried at ${state.time.toString()} - Real time calculation`}
          </Alert>
          <Center>
            <Input
              placeholder="Search Room"
              width={'40rem'}
              htmlSize={4}
              _placeholder={{ color: 'inherit' }}
              value={input}
              onChange={(e) => setInput(e.target.value.toLocaleLowerCase())}
            />
          </Center>

          <Center mt={'0.5rem'} gap={'0.5rem'}>
            <DropDown
              onChange={(d) => {
                const dayIdx = DAYS_NAME.indexOf(d);
                setState((prevState) => {
                  let customDate = prevState.customDate || new Date();
                  while (customDate.getDay() != dayIdx)
                    customDate.setDate(customDate.getDate() + 1);
                  return { ...prevState, customDate, loading: true };
                });
              }}
              options={DAYS_NAME}>
              <Button gap={'0.2rem'} fontSize={'sm'}>
                {state.customDate ? DAYS_NAME[state.customDate.getDay()] : `Select Day`}{' '}
                <ChevronDownIcon />
              </Button>
            </DropDown>

            <DropDown
              onChange={(t) => {
                const [hours, min] = t.split(':');
                setState((prevState) => {
                  let customDate = prevState.customDate || new Date();
                  // set hours and min here
                  customDate.setHours(parseInt(hours));
                  customDate.setMinutes(parseInt(min));
                  return {
                    ...prevState,
                    customDate,
                    loading: true
                  };
                });
              }}
              options={Array.from(
                new Set(
                  timetableHeadTitles
                    .map((t) => [t.startTime, t.endTime])
                    .reduce((acc, curr) => {
                      return [...acc, ...curr.map((c) => c)];
                    }, [])
                )
              )}>
              <Button gap={'0.2rem'} fontSize={'sm'}>
                {state.customDate
                  ? `${state.customDate.getHours()}:${state.customDate
                      .getMinutes()
                      .toString()
                      .padEnd(2, '0')}`
                  : 'Select Time'}{' '}
                <ChevronDownIcon />
              </Button>
            </DropDown>

            <Button
              isDisabled={state.customDate == null}
              fontSize={'sm'}
              onClick={() => {
                setState((prevState) => {
                  let customDate = null;
                  return { ...prevState, customDate };
                });
              }}>
              Reset
            </Button>
          </Center>

          {/* Colors */}

          {/* {departments.map((dep, idx) => (
            <Flex key={idx}>{dep}</Flex>
          ))} */}
        </Box>
        {Object.entries(rooms).map(([key, val]: [string, RoomMetaData[]], idx) => {
          return (
            <Fragment key={idx}>
              <Center>
                <Heading className="roboto">{`${key}`.toUpperCase()}</Heading>
              </Center>
              <RoomsRenderer isUnder500={isUnder500} classRooms={val} />
              {/* <RoomsRenderer isUnder500={isUnder500} freeRooms={val} /> */}
            </Fragment>
          );
        })}
      </motion.div>
    </>
  );
}

const RoomsRenderer = ({
  isUnder500,
  classRooms
}: {
  isUnder500: boolean;
  classRooms: Array<RoomMetaData>;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardPerRow, setCardPerRow] = useState<number>(8);

  useEffect(() => {
    const onWindowResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const EACH_CARD_SIZE = 120;
      const newCardPerRow = Math.floor(containerWidth / EACH_CARD_SIZE);
      setCardPerRow(newCardPerRow || 1);
    };

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [containerRef]);

  return (
    <>
      <Grid
        ref={containerRef}
        gap={'0.5rem'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={'center'}
        marginY={'1rem'}
        templateColumns={`repeat(${cardPerRow}, 1fr)`}
        padding={'0.1rem'}>
        {classRooms
          .sort((a, b) => a.room.length - b.room.length)
          .map((room, key) => {
            return <RoomCard key={key} room={room} paddingX={isUnder500 ? '0.3rem' : '0.5rem'} />;
          })}
      </Grid>
    </>
  );
};

interface RoomCardProps extends FlexProps {
  room: RoomMetaData;
}

const RoomCard = ({ room, ...rest }: RoomCardProps) => {
  const isFree = room.program == undefined;
  return (
    <Flex
      background={'var(--card-color)'}
      padding={'0.5rem'}
      border={'1.5px solid var(--border-color)'}
      fontWeight={'light'}
      opacity={isFree ? 0.4 : 1}
      flexDir={'column'}
      minHeight={'100px'}
      height={'100%'}
      {...rest}>
      <Flex flexDir={'column'} gap={3} h={'100%'}>
        <Link
          href={`${ROUTING.rooms}/${hashStr(room.room)}`}
          _hover={{ cursor: 'pointer', textDecoration: 'underline' }}
          target="_blank">
          <Text fontSize={'xs'} textAlign={'center'}>
            {room.room}
          </Text>
        </Link>
        <Divider flex={1} h={'100%'} />
        <Tooltip label={room.program || 'Free'}>
          <Text fontSize={'xs'} fontWeight={'normal'} textAlign={'center'} mt={'auto'} isTruncated>
            {room.program || 'Free'}
          </Text>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
