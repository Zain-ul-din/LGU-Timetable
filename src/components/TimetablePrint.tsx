import { Flex, Text, useColorModeValue, Badge, useColorMode, Center, Heading } from '@chakra-ui/react';

import { getColSpan, fillColumn } from '~/lib/util';

import type { LectureTime, IApisResponse } from '~/types/typedef';
import { daysName } from '~/lib/constant';

import { TableContainer, Table, Thead, Th, Tr, Tbody, Tfoot } from '@chakra-ui/react';
import React, { useEffect } from 'react';

interface ITimeTableProps {
   headTitles: Array<LectureTime>;
   data: IApisResponse;
   payload: string;
}

/**
 * Renders Times table print
 * @param   {ITimeTableProps}
 * @returns  JSX.Element
 */
export default function TimeTablePrint({ headTitles, data, payload }: ITimeTableProps): JSX.Element {
   return (
      <>
         <TableContainer my={2} p={2} width={'150%'} overflow={'auto'} scale={'0.9'}>
            <Center my={1}>
               <Heading>{payload}</Heading>
            </Center>
            <Table
               variant={'simple'}
               size={'sm'}
               p={1}
               color={'black !important'}
               border={'1px solid black'}
               overflow={'visible'}
            >
               {/* Head */}
               <TimeTableHead titiles={headTitles} />

               {/* Content */}
               <Tbody>
                  {daysName.map((day: string, idx: number): JSX.Element => {
                     const val: any = data[day as keyof Object];
                     return (
                        <TimeTableCell
                           key={idx}
                           colCount={headTitles.length}
                           day={day}
                           metaData={fillColumn(val as any[])}
                        />
                     );
                  })}
               </Tbody>
               <Tfoot>
                  <Th
                     height={'3rem'}
                     textAlign={'center'}
                     colSpan={headTitles.length + 7}
                     color={'blackAlpha.800'}
                  >
                     https://www.lgutimetable.live
                  </Th>
               </Tfoot>
            </Table>
         </TableContainer>
      </>
   );
}

/**
 * Times table head
 * @param {titiles: Array<LectureTime>}
 * @returns JSX.Element
 */
function TimeTableHead({ titiles }: { titiles: Array<LectureTime> }): JSX.Element {
   return (
      <>
         <Thead>
            <Tr>
               <Th border={'1px solid black'} color={'blackAlpha.900'}>
                  TIME
               </Th>
               {titiles.map((lectureTime: LectureTime, idx: number): JSX.Element => {
                  return (
                     <Th key={idx} border={'1px solid black'} color={'blackAlpha.900'}>
                        <Flex textAlign={'center'} flexDirection={'column'}>
                           <Text>{lectureTime.startTime}</Text>
                           <Text>{'-'}</Text>
                           <Text>{lectureTime.endTime}</Text>
                        </Flex>
                     </Th>
                  );
               })}
            </Tr>
         </Thead>
      </>
   );
}

/**
 * Renders Time-table cells
 * @param {day, metaData}
 * @returns JSX.Element
 */
function TimeTableCell({
   day,
   colCount,
   metaData
}: {
   day: string;
   colCount: number;
   metaData: any;
}): JSX.Element {
   return (
      <>
         <Tr>
            <Th border={'1px solid black'} color={'blackAlpha.900'}>
               {day}
            </Th>

            {!metaData || metaData.length == 0 ? (
               <Th colSpan={colCount} border={'1px solid black'}>
                  <Flex justifyContent={'center'} py={2} color={'blackAlpha.900'}>
                     All Slots are free
                  </Flex>
               </Th>
            ) : (
               <></>
            )}

            {metaData &&
               metaData.map((val: any, idx: number): JSX.Element => {
                  const colSpan: number = getColSpan(
                     {
                        hour: parseInt(val.startTime.hours),
                        min: parseInt(val.startTime.minutes)
                     },
                     {
                        hour: parseInt(val.endTime.hours),
                        min: parseInt(val.endTime.minutes)
                     }
                  );

                  return (
                     <Th
                        key={idx}
                        colSpan={colSpan}
                        py={2}
                        border={'0.1px solid'}
                        borderRadius={'2xl'}
                        borderColor={'gray.900'}
                     >
                        <Flex flexDirection={'column'} alignItems={'center'}>
                           {val.subject ? (
                              <>
                                 <Text
                                    fontSize={'xs'}
                                    fontFamily={'monospace'}
                                    color={'blackAlpha.900'}
                                 >
                                    {`${val.startTime.hours}`.padEnd(2, '0') +
                                       ':' +
                                       `${val.startTime.minutes}`.padEnd(2, '0')}{' '}
                                    TO{' '}
                                    {`${val.endTime.hours}`.padEnd(2, '0') +
                                       ':' +
                                       `${val.endTime.minutes}`.padEnd(2, '0')}
                                 </Text>
                                 <Badge fontSize={'x-small'}>{val.subject}</Badge>
                                 <Text fontSize={'x-small'} color={'blackAlpha.900'}>
                                    {val.roomNo}
                                 </Text>
                                 <Text fontSize={'x-small'} color={'blackAlpha.900'}>
                                    {val.teacher}
                                 </Text>
                              </>
                           ) : (
                              <>
                                 <b style={{ color: 'black' }}>X</b>
                              </>
                           )}
                        </Flex>
                     </Th>
                  );
               })}
         </Tr>
      </>
   );
}
