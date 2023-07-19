import styles from '~/styles/freeclassroom.module.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { DAYS_NAME, ROUTING, daysName, timetableHeadTitles } from '~/lib/constant';
import BackBtn from './design/BackBtn';
import {
    Alert,
    Box,
    Button,
    Card,
    Center,
    Flex,
    Heading,
    Icon,
    Input,
    Text,
    useMediaQuery
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { ChevronDownIcon, WarningTwoIcon } from '@chakra-ui/icons';
import DropDown from './design/DropDown';
import { FreeClassRoomStateType, UseStateProps } from '~/types/typedef';
import { BiVerticalTop } from 'react-icons/bi';

interface IRoomsType {
    room: Array<string>;
    lab: Array<string>;
    seminar: Array<string>;
}

export default function FreeClassRooms({
    parentState
}: {
    parentState: UseStateProps<FreeClassRoomStateType>;
}) {
    const [isUnder500] = useMediaQuery('(max-width: 500px)');

    const [rooms, setRooms] = useState<IRoomsType>({
        room: [],
        lab: [],
        seminar: []
    });

    const [state, setState] = parentState;
    const [input, setInput] = useState<string>('');

    useEffect(() => {
        let room_states: IRoomsType = {
            room: [],
            lab: [],
            seminar: []
        };

        state.freeClassRooms
            .filter((room) => room.toLocaleLowerCase().includes(input))
            .forEach((room) => {
                if (
                    room.toLocaleLowerCase().includes('room') &&
                    !room.toLocaleLowerCase().includes('seminar')
                )
                    room_states.room.push(room);
                else if (room.toLocaleLowerCase().includes('lab')) room_states.lab.push(room);
                else if (room.toLocaleLowerCase().includes('seminar'))
                    room_states.seminar.push(room);
            });

        setRooms(room_states);
    }, [state.freeClassRooms, input]);

    return (
        <div>
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
                    <Alert background={'blue.600'} borderRadius={'lg'} marginY={'1rem'}>
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

                    <Center mt={'1rem'}>
                        <Text className="roboto" color={'var(--muted-color)'}>
                            Choose a specific day and time to search for available classrooms during
                            that particular timeframe.
                        </Text>
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
                                {state.customDate
                                    ? DAYS_NAME[state.customDate.getDay()]
                                    : `Select Day`}{' '}
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
                </Box>

                <Center marginY={'1rem'}>
                    <Alert
                        status="success"
                        background={'green.600'}
                        justifyContent={'center'}
                        rounded={'md'}>
                        Free classrooms are no longer in preview. You can now confidently rely on
                        the information generated by the Algorithm for accurate results. To verify
                        the availability of a free classroom at a specific time, simply click on the
                        room icon to view its corresponding table.
                    </Alert>
                </Center>

                {Object.entries(rooms).map(([key, val], idx) => {
                    return (
                        <React.Fragment key={idx}>
                            <Center>
                                <Heading className="roboto">{`Free ${key}s`.toUpperCase()}</Heading>
                            </Center>
                            {val.length == 0 && (
                                <Center marginY={'0.5rem'}>
                                    <Alert status="error" justifyContent={'center'}>
                                        {`No free ${key.toLocaleLowerCase()} Found`}
                                    </Alert>
                                </Center>
                            )}
                            <RoomsRenderer isUnder500={isUnder500} freeRooms={val} />
                        </React.Fragment>
                    );
                })}
            </motion.div>
        </div>
    );
}

const RoomsRenderer = ({
    isUnder500,
    freeRooms
}: {
    isUnder500: boolean;
    freeRooms: Array<string>;
}) => {
    return (
        <>
            <Flex
                gap={'0.5rem'}
                flexWrap={'wrap'}
                justifyContent={'center'}
                alignItems={'center'}
                marginY={'1rem'}
                padding={'0.1rem'}>
                {freeRooms
                    .sort((a, b) => a.length - b.length)
                    .map((room, key) => {
                        return (
                            <Card
                                background={'var(--card-color)'}
                                padding={'1rem'}
                                paddingX={isUnder500 ? '1rem' : '1.5rem'}
                                key={key}
                                border={'1px solid var(--border-color)'}
                                fontWeight={'light'}
                                _hover={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                <Link href={`${ROUTING.rooms}/${room}`}>{room}</Link>
                            </Card>
                        );
                    })}
            </Flex>
        </>
    );
};
