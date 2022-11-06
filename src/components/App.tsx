import React, { useEffect, useState } from 'react'
import TimeTable from './TimeTable'
import NavBar from './NavBar'
import Selection from './Selection'
import Footer from './Footer'


import { tableHeadTiles } from '../constants/Constants'
import { ApiData } from '../temp/DummyData'

import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'

import type { TimetableInput } from '../types/typedef'

/*
  TEMO IMPORTS
*/

import DirtyTables from '../temp/DirtyTables'


export default function App(): JSX.Element
{

  const [timeTableInput, setTimeTableInput] = useState <TimetableInput> ({
    fall: null,
    semester: null,
    section: null
  })
  
  return (
    <>  
     <TimeTableInputContext.Provider value={{timeTableInput, setTimeTableInput}}>
        <NavBar/>
        <Selection />
        {/* <DirtyTables /> */}
        <TimeTable data = {ApiData ()} headTitles = {tableHeadTiles}/>
        <Footer/>
      </TimeTableInputContext.Provider>
    </>
  )
}




