import React from 'react'
import { TableStyle } from '../style/Style'

interface ITimeTableProps
{
    headTitles: Array <string>,
    data : any
}

export default function TimeTable (
    { headTitles, data } : ITimeTableProps

): JSX.Element
{
    return (
        <>
            <TableStyle.TableContainer whiteSpace = {'nowrap'}>
                <TableStyle.Table  colorScheme = {'whiteAlpha'} variant = {'striped'} size = {'sm'} align = {'center'}>
                    <TableStyle.TableCaption>LGU STUDENT TIME TABLE</TableStyle.TableCaption>

                    <TableStyle.Tbody>
                        <TimeTableHead titiles={headTitles}/>
                        {Object.entries (data).map ((val: [string, any], idx: number): JSX.Element => {
                            return <TimeTableCell key = {idx} day = {val[0]} metaData = {val [1]}/>
                        })}
                    </TableStyle.Tbody>

                </TableStyle.Table>
            </TableStyle.TableContainer>
        </>
    )
}


function TimeTableHead ( {titiles} : {titiles : Array <string>} ): JSX.Element
{
    return (
        <>
            <TableStyle.Thead>
                {titiles.map ((title: string, idx: number): JSX.Element => 
                    <TableStyle.Th key = {idx}>{title}</TableStyle.Th> 
                )}
            </TableStyle.Thead>
        </>
    )
}


function TimeTableCell ({day, metaData}: {day:string, metaData:any}): JSX.Element
{
    
    return ( 
        <>
            <TableStyle.Tr>
                <TableStyle.Th>{day}</TableStyle.Th>
                {metaData && metaData.map ((val:any, idx: number): JSX.Element => {
                    return (
                        <TableStyle.Th key = {idx} textAlign = {'center'}>
                            <>{val.startTime.hours + ':' + val.startTime.minutes} TO {val.endTime.hours + ':' + val.endTime.minutes}</>
                            <>{val.subject}</>
                            <>{val.roomNo}</>
                            <>{val.teacher}</>
                        </TableStyle.Th>
                    )
                })}
            </TableStyle.Tr>
        </>
    )
}
