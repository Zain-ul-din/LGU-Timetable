import { TimetableInput } from '~/types/typedef';
import styles from '~/styles/Timetable.module.css';
import Loader from './design/Loader';
import React, { useRef } from 'react';

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
   useToast
} from '@chakra-ui/react';
import { CopyIcon, ArrowBackIcon } from '@chakra-ui/icons';

import Btn from './design/Button';

import TimeTablePrint from './TimetablePrint';
import ReactToPrint from 'react-to-print';

import { ROUTING, timetableHeadTiles } from '~/lib/constant';

const day_sorter = {
   monday: 1,
   tuesday: 2,
   wednesday: 3,
   thursday: 4,
   friday: 5,
   saturday: 6,
   sunday: 7
};

interface IProps  {
   timetableData: any;
   metaData: string;
}

import Image from 'next/image';

export default function Timetable({ metaData, timetableData }: IProps) {
   let printTableRef = useRef<any>();

   const { setColorMode } = useColorMode();
   const toast = useToast();

   return (
      <>
         <div className={`roboto ${styles.timetable_container}`}>
            <Link href={ROUTING.timetable}>
               <BackBtn />
            </Link>
            <span>{`${metaData}`}</span>
            <div>
               {!timetableData ? (
                  <Loader>Loading...</Loader>
               ) : (
                  <>
                     <Center>
                        <ReactToPrint
                           trigger={() => {
                              return (
                                 <Button
                                    colorScheme="whatsapp"
                                    fontSize={'2xl'}
                                    marginY={'1rem'}
                                    textAlign={'center'}
                                 >
                                    Print Timetable
                                 </Button>
                              );
                           }}
                           content={() => printTableRef.current}
                           onBeforePrint={() => {
                              setColorMode('light');
                              reportFirebaseAnalytics(
                                 FIREBASE_ANALYTICS_EVENTS.print_time_table.toString(),
                                 {}
                              );
                           }}
                           onAfterPrint={() => setColorMode('dark')}
                        />

                        <Btn
                           style={{ margin: '0rem 1rem 0rem 1rem', padding: '0.4rem' }}
                           onClick={(e) => {
                              navigator.clipboard.writeText(window.location.href);
                              toast({
                                 title: 'link copied',
                                 position: 'top',
                                 status: 'success',
                                 duration: 1000
                              });
                           }}
                        >
                           Share{' '}
                           <b
                              style={{
                                 margin: '0rem 0.3rem 0rem 0.3rem',
                                 transform: 'translateY(-2px)'
                              }}
                           >
                              <CopyIcon />
                           </b>
                        </Btn>
                     </Center>

                     <Center>
                        <Button
                           marginY={'1rem'}
                           colorScheme={`gray`}
                           onClick={(e) => {
                              reportFirebaseAnalytics(
                                 FIREBASE_ANALYTICS_EVENTS.link_share_on_whatsapp.toString(),
                                 {}
                              );
                              window.location.href = `https://api.whatsapp.com/send/?text=${encodeURI(
                                 window.location.href
                              )}&type=custom_url&app_absent=0`;
                           }}
                        >
                           Share on WhatsApp {` `}
                           <Image
                              src={'/images/whatsapp.png'}
                              alt="hello_world"
                              width={35}
                              height={35}
                           />
                        </Button>
                     </Center>

                     <div
                        ref={printTableRef}
                        className="print_timetable"
                        style={{ width: '100%', height: '100%', overflow: 'auto' }}
                     >
                        <TimeTablePrint
                           headTitles={timetableHeadTiles}
                           data={timetableData.timetable}
                           payload={`${metaData}`}
                        />
                     </div>

                     <Center>
                        <div>
                           <Text fontFamily={'heading'}>
                              UPDATED AT:
                              <Box
                                 fontFamily={'heading'}
                                 color={'gray.50'}
                                 display={'inline'}
                              >{` ${new Date(timetableData.updatedAt).toDateString()}`}</Box>
                           </Text>
                        </div>
                     </Center>
                     {Object.entries(timetableData.timetable)
                        .sort(([lhs], [rhs]) => {
                           let day1 = lhs.toLowerCase();
                           let day2 = rhs.toLowerCase();
                           return (
                              day_sorter[day1 as keyof object] - day_sorter[day2 as keyof object]
                           );
                        })
                        .map(([day, data], idx) => {
                           return (
                              <React.Fragment key={idx}>
                                 {(data as Array<any>).length > 0 && (
                                    <Card data={data as Array<any>} day={day} idx={idx} />
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

import { motion } from 'framer-motion';
import { FIREBASE_ANALYTICS_EVENTS, reportFirebaseAnalytics } from '~/lib/FirebaseAnalysis';
import Link from 'next/link';
import BackBtn from './design/BackBtn';

const Card = ({ day, data, idx }: { idx: number; day: string; data: Array<any> }) => {
   const { isOpen, onToggle } = useDisclosure({
      defaultIsOpen: true
   });

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: idx * 0.1, duration: 0.2 }}
         className={styles.card}
      >
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

const table_headings = ['Subject', 'Timing', 'Room', 'Instructor'];

const TimetableRenderer = ({ data }: { data: Array<any> }) => {
   const [isUnder700] = useMediaQuery('(max-width: 700px)');

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
                           fontSize={isUnder700 ? 'small' : 'inherit'}
                        >
                           {curr.subject}
                        </Td>
                        <Td
                           textAlign={isUnder700 ? 'center' : 'initial'}
                           whiteSpace={isUnder700 ? 'pre-wrap' : 'inherit'}
                           padding={isUnder700 ? '1.5px' : ''}
                           fontSize={isUnder700 ? 'small' : 'inherit'}
                        >{`${curr.startTime.hours
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
                        >
                           {curr.roomNo}
                        </Td>
                        <Td
                           textAlign={isUnder700 ? 'center' : 'initial'}
                           whiteSpace={isUnder700 ? 'pre-wrap' : 'inherit'}
                           padding={isUnder700 ? '1.5px' : ''}
                           fontSize={isUnder700 ? 'small' : 'inherit'}
                        >
                           {curr.teacher}
                        </Td>
                     </Tr>
                  );
               })}
            </Tbody>
         </Table>
      </TableContainer>
   );
};
