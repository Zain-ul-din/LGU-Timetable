import React, { useEffect, useState } from 'react'
import Main from '../routes/Main'

import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'
import { TimeTableContext } from '../Hooks/TimeTableContext'
import { useTalkToServer } from '../Hooks/hooks'
import { useGetCredentials } from '../Hooks/hooks'
import { serverURL } from '../constants/Constants'

import type { TimetableInput, TimeTableData } from '../types/typedef'

export default function App(): JSX.Element
{

  useEffect (()=>{
      useTalkToServer (serverURL + "/metadata").then ((val: any)=> setMetaData(val))
  }, [])

  
  const [timeTableInput, setTimeTableInput] = useState <TimetableInput> ({
    fall: null,
    semester: null,
    section: null
  })
  
  const [timeTableData, setTimeTableData] = useState <TimeTableData>({
    data: null,
    loadingState: false
  })
  
  const [metaData, setMetaData]:[any, React.Dispatch<React.SetStateAction<any>>] = useState <any>(null)
  
  useGetCredentials (null)
  
  return (
    <>  
      <TimeTableInputContext.Provider value={{timeTableInput, setTimeTableInput}}>
        <TimeTableContext.Provider  value={{timeTableData, setTimeTableData}}>
          <Main metaData = {metaData} />
        </TimeTableContext.Provider>
      </TimeTableInputContext.Provider>
    </>
  )
}







