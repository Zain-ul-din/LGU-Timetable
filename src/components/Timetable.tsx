import { TimetableData, TimetableInput } from '~/types/typedef';
import styles from '~/styles/Timetable.module.css';
import Loader from './design/Loader';
import React, { useEffect, useRef } from 'react';

import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  useDisclosure,
  Collapse,
  useMediaQuery,
  Button,
  Center,
  Box,
  Text,
  useColorMode,
  useToast,
  Flex,
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
  AccordionIcon
} from '@chakra-ui/react';

import { FaFileImage } from 'react-icons/fa';
import TimeTablePrint from './TimetablePrint';
import ReactToPrint from 'react-to-print';

import { APIS_ENDPOINTS, ROUTING, timetableHeadTitles } from '~/lib/constant';

const day_sorter = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7
};

interface IProps {
  timetableData: {
    id: string;
    payload: {
      program: string;
      section: string;
      semester: string;
    };
    updatedAt: string;
    timetable: any;
  };
  metaData: string;
}

import Image from 'next/image';

export default function Timetable({ metaData, timetableData }: IProps) {
  let printTableRef = useRef<any>();

  const toast = useToast();
  const [_, setLocalHistory] = useTimetableHistory();

  useEffect(() => {
    const payload = {
      fall: timetableData.payload.program,
      semester: timetableData.payload.semester,
      section: timetableData.payload.section
    };

    setLocalHistory({
      payload,
      created_at: new Date().toISOString(),
      hash: hashStr(JSON.stringify(payload))
    });
  }, [timetableData, setLocalHistory]);

  return (
    <>
      <div className={`roboto ${styles.timetable_container}`}>
        <Box mt={'0.5rem'}>
          <BackBtn />
        </Box>

        {/* support palestine */}
        <PalestineSideAd url="/discussions?active_route=View&discussion_id=mIPtC9zPO8GaH7Pltx87" />

        {/* timetable header */}
        <TimetableHeader
          metadataStr={metaData}
          loading={!timetableData}
          printTableRef={printTableRef}
          updatedAt={new Date(timetableData.updatedAt as string)}
        />

        <div>
          {!timetableData ? (
            <Loader>Loading...</Loader>
          ) : (
            <>
              <div ref={printTableRef} className="print_timetable">
                <TimeTablePrint
                  headTitles={timetableHeadTitles}
                  data={timetableData.timetable}
                  payload={`${metaData} (Updated At: ${new Date(
                    timetableData.updatedAt
                  ).toDateString()})`}
                />
              </div>

              {/* chart render */}
              <Accordion mx={2} my={4} mb={8}>
                <AccordionItem>
                  <AccordionButton>
                    <Box mr={2}>Show Chart</Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <TimetableChart
                      timetable={Object.entries(timetableData.timetable).sort(([lhs], [rhs]) => {
                        let day1 = lhs.toLowerCase();
                        let day2 = rhs.toLowerCase();
                        return day_sorter[day1 as keyof object] - day_sorter[day2 as keyof object];
                      })}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              {Object.entries(timetableData.timetable)
                .sort(([lhs], [rhs]) => {
                  let day1 = lhs.toLowerCase();
                  let day2 = rhs.toLowerCase();
                  return day_sorter[day1 as keyof object] - day_sorter[day2 as keyof object];
                })
                .map(([day, data], idx) => {
                  return (
                    <React.Fragment key={idx}>
                      {(data as Array<TimetableData>).length > 0 && (
                        <Card
                          data={(data as Array<TimetableData>).sort((lhs, rhs) => {
                            return (
                              lhs.startTime.hours * 60 +
                              lhs.startTime.minutes -
                              (rhs.startTime.hours * 60 + rhs.startTime.minutes)
                            );
                          })}
                          day={day}
                          idx={idx}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const TimetableHeader = ({
  metadataStr,
  loading,
  printTableRef,
  updatedAt
}: {
  metadataStr: string;
  loading: boolean;
  printTableRef: React.MutableRefObject<any>;
  updatedAt: Date;
}) => {
  const { setColorMode } = useColorMode();
  const [isMobile] = useMediaQuery('(max-width: 500px)');
  const router = useRouter();

  if (loading) return <span>{`${metadataStr}`}</span>;

  return (
    <>
      <Flex
        width={'100%'}
        py={'2.5'}
        px={2}
        justifyContent={'center'}
        minW={'100%'}
        className="glow">
        <Flex
          alignItems={isMobile ? 'center' : 'initial'}
          w={'full'}
          padding={'0.5rem'}
          gap={'1rem'}
          bg={'var(--card-color)'}
          border={'1px solid var(--border-color)'}
          rounded={'md'}
          flexDir={'column'}>
          <Flex flexWrap={'wrap'} gap={2}>
            <Text fontSize={'md'}>{metadataStr}</Text>
            <Text
              px={2}
              fontFamily={'heading'}
              bg={'yellow.400'}
              color={'blackAlpha.900'}
              rounded={'md'}
              fontWeight={'bold'}>
              UPDATED AT:
              <Box
                fontFamily={'heading'}
                color={'gray.900'}
                fontWeight={'bold'}
                display={'inline'}>{` ${new Date(updatedAt).toDateString()}`}</Box>
            </Text>
          </Flex>
          <Flex
            flexWrap={'wrap'}
            w={'100%'}
            gap={'0.5rem'}
            justifyContent={isMobile ? 'center' : 'initial'}>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={(e) => {
                navigator.share({
                  title: 'LGU Timetable',
                  text: `LGU Timetable - ${metadataStr}`,
                  url: window.location.href
                });
              }}>
              Share 🚀
            </Button>
            <Button
              variant={'outline'}
              size={'sm'}
              onClick={(e) => {
                reportFirebaseAnalytics(
                  FIREBASE_ANALYTICS_EVENTS.link_share_on_whatsapp.toString(),
                  {}
                );
                window.location.href = `https://api.whatsapp.com/send/?text=${encodeURI(
                  window.location.href
                )}&type=custom_url&app_absent=0`;
              }}>
              Share on {` `}
              <Image
                src={'/images/whatsapp.png'}
                alt="hello_world"
                width={18}
                height={18}
                style={{
                  marginLeft: '0.2rem'
                }}
              />
            </Button>
            <ReactToPrint
              trigger={() => {
                return (
                  <Button size={'sm'} variant={'outline'}>
                    Print Timetable 🖨
                  </Button>
                );
              }}
              content={() => printTableRef.current}
              onBeforePrint={() => {
                setColorMode('light');
                reportFirebaseAnalytics(FIREBASE_ANALYTICS_EVENTS.print_time_table.toString(), {});
              }}
              onAfterPrint={() => setColorMode('dark')}
            />
            {/* <Link
              href={`${APIS_ENDPOINTS.SCREEN_SHOTS_PATH}/${metadataStr}.png`}
              target="_blank"
              download>
              <Button variant={'outline'} size={'sm'}>
                Download Screen Shot
                <FaFileImage
                  style={{
                    marginLeft: '0.2rem'
                  }}
                />
              </Button>
            </Link> */}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

import { motion } from 'framer-motion';
import { FIREBASE_ANALYTICS_EVENTS, reportFirebaseAnalytics } from '~/lib/FirebaseAnalysis';
import Link from 'next/link';
import BackBtn from './design/BackBtn';
import TimetableChart from './charts/TimetableChart';
import PalestineSideAd from './announcements/PalestineSideAd';
import { useRouter } from 'next/router';
import { hashStr } from '~/lib/cipher';
import useTimetableHistory from '~/hooks/useTimetableHistory';

const Card = ({ day, data, idx }: { idx: number; day: string; data: Array<any> }) => {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.1, duration: 0.2 }}
      className={styles.card}>
      <h1 style={{ cursor: 'pointer' }} onClick={onToggle}>
        {day.toLocaleUpperCase()} <code> ({data.length + ' lectures'})</code>
      </h1>
      <Collapse in={isOpen} animateOpacity>
        <div className={styles.card_content}>
          <TimetableRenderer data={data} />
        </div>
      </Collapse>
    </motion.div>
  );
};

const TimetableRenderer = ({ data }: { data: Array<any> }) => {
  const [isUnder700] = useMediaQuery('(max-width: 700px)');

  const table_headings = [
    'Subject',
    'Timing',
    data[0].room ? 'Instructor' : 'Room',
    data[0].class ? 'Class' : 'Instructor'
  ];

  return (
    <TableContainer border={'1px solid var(--border-color)'} borderRadius={'md'}>
      <Table variant="unstyled" size={'sm'} colorScheme={'blackAlpha'}>
        <Thead height={'3rem'}>
          <Tr>
            {table_headings.map((heading, idx) => {
              return (
                <Th fontSize={isUnder700 ? 'x-small' : '1xl'} key={idx}>
                  {heading}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody height={isUnder700 ? '5rem' : '3rem'}>
          {data.map((curr, idx) => {
            return (
              <Tr borderTop={'1px solid var(--border-color)'} height={'3rem'} key={idx}>
                <Td
                  textAlign={isUnder700 ? 'center' : 'initial'}
                  whiteSpace={isUnder700 ? 'pre-wrap' : 'nowrap'}
                  padding={isUnder700 ? '1rem 1.5px 1rem 1.5px' : ''}
                  fontSize={isUnder700 ? 'small' : 'inherit'}>
                  {curr.subject}
                </Td>
                <Td
                  textAlign={isUnder700 ? 'center' : 'initial'}
                  whiteSpace={isUnder700 ? 'pre-wrap' : 'inherit'}
                  padding={isUnder700 ? '1.5px' : ''}
                  fontSize={isUnder700 ? 'small' : 'inherit'}>{`${curr.startTime.hours
                  .toString()
                  .padStart(2, '0')}:${curr.startTime.minutes.toString().padEnd(2, '0')} ${
                  isUnder700 ? '\n - \n' : ' - '
                } ${curr.endTime.hours.toString().padStart(2, '0')}:${curr.endTime.minutes
                  .toString()
                  .padEnd(2, '0')}`}</Td>
                <Td
                  textAlign={isUnder700 ? 'center' : 'initial'}
                  whiteSpace={isUnder700 ? 'pre-wrap' : 'inherit'}
                  padding={isUnder700 ? '1.5px' : ''}
                  fontSize={isUnder700 ? 'small' : 'inherit'}
                  color={'blue.200'}
                  cursor={'pointer'}
                  _hover={{ textDecoration: 'underline' }}>
                  <Link
                    href={
                      curr.room
                        ? `${ROUTING.teachers}/${hashStr(curr.teacher)}`
                        : `${ROUTING.rooms}/${hashStr(curr.roomNo)}`
                    }>
                    {curr.room ? curr.teacher : curr.roomNo}
                  </Link>
                </Td>
                <Td
                  textAlign={isUnder700 ? 'center' : 'initial'}
                  whiteSpace={isUnder700 ? 'pre-wrap' : 'inherit'}
                  padding={isUnder700 ? '1.5px' : ''}
                  fontSize={isUnder700 ? 'small' : 'inherit'}
                  color={'blue.200'}
                  cursor={'pointer'}
                  _hover={{ textDecoration: 'underline' }}>
                  <Link
                    href={
                      curr.class
                        ? `${ROUTING.timetable}/${hashStr(curr.class)}`
                        : `${ROUTING.teachers}/${hashStr(curr.teacher)}`
                    }>
                    {curr.class ? curr.class : curr.teacher}
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
