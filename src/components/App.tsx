import React, { useEffect, useState } from 'react'
import TimeTable from './TimeTable'
import NavBar from './NavBar'
import Hero from './Hero'
import Selection from './Selection'
import Footer from './Footer'
import Loader from './internals/Loader'


import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'
import { TimeTableContext } from '../Hooks/TimeTableContext'
import { useTalkToServer } from '../Hooks/hooks'
import { serverURL } from '../constants/Constants'

import { tableHeadTiles } from '../constants/Constants'
import type { TimetableInput, TimeTableData } from '../types/typedef'


export default function App(): JSX.Element
{

  const [timeTableInput, setTimeTableInput] = useState <TimetableInput> ({
    fall: null,
    semester: null,
    section: null
  })
  
  const [timeTableData, setTimeTableData] = useState <TimeTableData>({
    data: null,
    loadingState: false
  })

  const [metaData, setMetaData]:[any, React.Dispatch<React.SetStateAction<any>>] 
              = useState <any>(null)

  useEffect (()=>{
      useTalkToServer (serverURL + "/metadata").then ((val: any)=> setMetaData(val))
  }, [])
  
  return (
    <>  
     <TimeTableInputContext.Provider value={{timeTableInput, setTimeTableInput}}>
       <TimeTableContext.Provider  value={{timeTableData, setTimeTableData}}>
        <NavBar/>
        {!timeTableData.data && <Hero />}
        {metaData == null ? <Loader isLoading = {true}/> : <Selection metaData={metaData}/>}
        {timeTableData.loadingState ? 
          <Loader isLoading = {true}/> : 
          <>
            {timeTableData.data && <TimeTable data = {timeTableData.data} headTitles = {tableHeadTiles}/>}
        </>}
        <Footer/>
       </TimeTableContext.Provider>
      </TimeTableInputContext.Provider>
    </>
  )
}







