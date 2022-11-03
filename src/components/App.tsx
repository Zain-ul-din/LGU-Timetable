import React, { useState } from 'react'
import TimeTable from './TimeTable'
import { tableHeadTiles } from '../constants/Constants'
import { apiData } from '../temp/DummyData'

export default function App(): JSX.Element
{
  return (
    <>  
      Hello LGU Students
      <TimeTable data = {apiData} headTitles= {tableHeadTiles}/>
    </>
  )
}



