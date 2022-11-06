import { Flex, Text } from '@chakra-ui/react'
import { TableStyle } from '../style/Style'
import { getColSpan } from '../helper/util'

import type { LectureTime } from '../types/typedef'
import { IApisResponse } from '../types/typedef'

interface ITimeTableProps
{
    headTitles: Array <LectureTime>,
    data : IApisResponse,
}

/**
 * Renders Times table
 * @param   {ITimeTableProps} 
 * @returns  JSX.Element 
*/
export default function TimeTable (
    { headTitles, data } : ITimeTableProps
): JSX.Element
{

    return (
        <>
            <TableStyle.TableContainer my = {5} p = {2} overflowX = {'scroll'} >
                <TableStyle.Table variant= {'striped'} size={'sm'} p = {1}>
                    
                    {/* Head */}
                    <TimeTableHead titiles={headTitles}/>

                    {/* Content */}
                    <TableStyle.Tbody>
                        {Object.entries (data).map ((val: [string, any[] | null], idx: number): JSX.Element => 
                            <TimeTableCell 
                                key = {idx}
                                colCount = {headTitles.length}
                                day = {val [0]}
                                metaData = {val [1]} 
                            />
                        )}
                    </TableStyle.Tbody>

                </TableStyle.Table>
            </TableStyle.TableContainer>
        </>
    )
}

/**
 * Times table head
 * @param {titiles: Array<LectureTime>} 
 * @returns JSX.Element
 */
function TimeTableHead ( {titiles} : {titiles : Array <LectureTime>} ): JSX.Element
{
    return (
        <>
            <TableStyle.Thead>
                <TableStyle.Tr>
                    <TableStyle.Th>TIME</TableStyle.Th>
                    {titiles.map ((lectureTime: LectureTime, idx: number): JSX.Element => {
                        return (
                            <TableStyle.Th key = {idx}>
                                <Flex textAlign={'center'} flexDirection = {'column'}>
                                    <Text>{lectureTime.startTime}</Text>
                                    <Text>{'-'}</Text>
                                    <Text>{lectureTime.endTime}</Text>
                                </Flex>
                            </TableStyle.Th>
                        )
                    })}
                </TableStyle.Tr>
            </TableStyle.Thead>
        </>
    )
}

/**
 * Renders Time-table cells
 * @param {day, metaData} 
 * @returns JSX.Element
 */
function TimeTableCell ({day, colCount, metaData}: {day:string, colCount:number , metaData:any}): JSX.Element
{
    return ( 
        <>
            <TableStyle.Tr >
                <TableStyle.Th>{day}</TableStyle.Th>
                
                {   !metaData ? 
                    <TableStyle.Th colSpan= {colCount}>
                        <Flex justifyContent={'center'} py = {2}>
                            All Slots are free
                        </Flex>
                    </TableStyle.Th> 
                    : <></>
                }
                
                {metaData && metaData.map ((val:any, idx: number): JSX.Element => {
                    const colSpan: number = getColSpan ({hour: parseInt (val.startTime.hours) , min: parseInt (val.startTime.minutes) }, {hour: parseInt (val.endTime.hours) , min: parseInt (val.endTime.minutes) })
                    return (
                        <TableStyle.Th key = {idx} colSpan = {colSpan} p = {1}>
                            <Flex flexDirection={'column'} alignItems = {'center'}>
                                <Text fontSize={'x-small'}>{val.startTime.hours + ':' + val.startTime.minutes} TO {val.endTime.hours + ':' + val.endTime.minutes}</Text>
                                <Text fontSize={'x-small'}>{val.subject}</Text>
                                <Text fontSize={'x-small'}>{val.roomNo}</Text>
                                <Text fontSize={'x-small'}>{val.teacher}</Text>
                            </Flex>
                        </TableStyle.Th>
                    )
                })}
            </TableStyle.Tr>
        </>
    )
}

