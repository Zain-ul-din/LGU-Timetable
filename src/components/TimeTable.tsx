import React from 'react'
import { TableStyle } from '../style/Style'

interface ITimeTableProps
{
    headTitles: Array <string>
}

export default function TimeTable (
    { headTitles } : ITimeTableProps
): JSX.Element
{
    return (
        <>
            <TableStyle.TableContainer whiteSpace = {'nowrap'}>
                <TableStyle.Table  colorScheme = {'whiteAlpha'} variant = {'striped'} size = {'sm'} align = {'center'}>
                    <TableStyle.TableCaption>LGU STUDENT TIME TABLE</TableStyle.TableCaption>

                    <TableStyle.Tbody>
                        <TimeTableHead titiles={headTitles}/>
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
