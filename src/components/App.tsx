import React, { useEffect, useState } from 'react'
import TimeTable from './TimeTable'
import NavBar from './NavBar'
import Selection from './Selection'
import Footer from './Footer'
import Loader from './internals/Loader'

import { tableHeadTiles } from '../constants/Constants'
import { ApiData } from '../temp/DummyData'
import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'
import { useTalkToServer } from '../Hooks/hooks'


import type { TimetableInput } from '../types/typedef'

/*
TEMO IMPORTS
*/
import { Text } from '@chakra-ui/react'



export default function App(): JSX.Element
{

  const [timeTableInput, setTimeTableInput] = useState <TimetableInput> ({
    fall: null,
    semester: null,
    section: null
  })
  
  const [metaData, setMetaData]:[any, React.Dispatch<React.SetStateAction<any>>] 
              = useState <any>(null)

  useEffect (()=>{
      useTalkToServer ('https://lgu-timetable-api.deta.dev' + "/metadata")
      .then ((val: any)=> {
        setMetaData(val)
      })
  }, [])
   
  console.log (metaData)

  return (
    <>  
     <TimeTableInputContext.Provider value={{timeTableInput, setTimeTableInput}}>
        <NavBar/>
        {metaData == null ? <Loader isLoading = {true}/> : <Selection metaData={metaData}/>}
        <Text color={'red.400'} textAlign = {'center'}>{`Under Construction`.toLocaleUpperCase ()}</Text>
        
        <TimeTable data = {ApiData ()} headTitles = {tableHeadTiles}/>
        <Footer/>
      </TimeTableInputContext.Provider>
    </>
  )
}






