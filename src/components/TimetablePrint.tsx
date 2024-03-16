import {
  Flex,
  Text,
  useColorModeValue,
  Badge,
  useColorMode,
  Center,
  Heading,
  Td
} from '@chakra-ui/react';

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
export default function TimeTablePrint({
  headTitles,
  data,
  payload
}: ITimeTableProps): JSX.Element {
  return (
    <>
      <TableContainer p={2} width={'100%'} overflow={'auto'} scale={'0.9'}>
        <Center my={5}>
          <Heading fontSize={'3xl'}>{payload}</Heading>
        </Center>
        <Table
          variant={'simple'}
          size={'sm'}
          color={'black !important'}
          border={'1px solid black'}
          overflow={'visible'}>
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
            <Tr>
              <Th textAlign={'center'} colSpan={headTitles.length + 7} color={'blackAlpha.800'}>
                <a
                  href="https://www.lgutimetable.online"
                  style={{
                    display: 'inline-block',
                    margin: '1rem 0rem',
                    color: 'blue'
                  }}>
                  SOURCE: https://www.lgutimetable.online
                </a>
              </Th>
            </Tr>
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
          <Th border={'1px solid black'} color={'blackAlpha.900'} textAlign={'center'}>
            <Text>TIME</Text>
          </Th>
          {titiles.map((lectureTime: LectureTime, idx: number): JSX.Element => {
            return (
              <Th
                p={2}
                key={idx}
                border={'1px solid black'}
                color={'blackAlpha.900'}
                textAlign={'center'}>
                <Flex textAlign={'center'} flexDirection={'column'} my={'1rem'}>
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
        <Th border={'1px solid black'} color={'blackAlpha.900'} textAlign={'center'}>
          <Text padding={'2rem'}>{day}</Text>
        </Th>

        {!metaData || metaData.length == 0 ? (
          <Th colSpan={colCount} border={'1px solid black'}>
            <Flex justifyContent={'center'} py={2} color={'blackAlpha.900'} marginY={'2rem'}>
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
                py={5}
                border={'0.1px solid'}
                borderRadius={'2xl'}
                borderColor={'gray.900'}>
                <Flex flexDirection={'column'} alignItems={'center'} gap={3} my={2}>
                  {val.subject ? (
                    <>
                      <Text fontSize={'xs'} fontFamily={'monospace'} color={'blackAlpha.900'}>
                        {`${val.startTime.hours}`.padEnd(2, '0') +
                          ':' +
                          `${val.startTime.minutes}`.padEnd(2, '0')}{' '}
                        TO{' '}
                        {`${val.endTime.hours}`.padEnd(2, '0') +
                          ':' +
                          `${val.endTime.minutes}`.padEnd(2, '0')}
                      </Text>
                      <Badge fontSize={'x-small'} p={3}>
                        {val.subject}
                      </Badge>
                      <Text fontSize={'x-small'} color={'blackAlpha.900'}>
                        {val.roomNo}
                      </Text>
                      <Text fontSize={'x-small'} fontWeight={'medium'} color={'blackAlpha.900'}>
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
