/*
  Entry point
*/

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from '../routes/Main'
import FreeClasses from '../routes/FreeClasses';
import Admin from '../routes/Admin'
import Page404 from '../routes/Page404'

import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'
import { TimeTableContext } from '../Hooks/TimeTableContext'
import { UserCredentialsContext } from '../Hooks/UserCredentialsContext'
import { useUserCredentials } from '../Hooks/hooks'
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
  const [user, setUser] = useUserCredentials ()
  
  useGetCredentials (null)
  
  return (
    <>  
      <TimeTableInputContext.Provider value={{timeTableInput, setTimeTableInput}}>
        <TimeTableContext.Provider  value={{timeTableData, setTimeTableData}}>
          <UserCredentialsContext.Provider value={{user, setUser}}>
            
            {/* Router setup */}
            <BrowserRouter>
              <Routes>
                <Route index element={<Main metaData={metaData}/>} />
                <Route path='/freeclassrooms' element={<FreeClasses/>} />
                <Route path='/admin' element = {<Admin/>} />
                <Route path='*' element = {<Page404/>} />
              </Routes>
            </BrowserRouter>

            {/* <Main metaData = {metaData} /> */}
          </UserCredentialsContext.Provider>
        </TimeTableContext.Provider>
      </TimeTableInputContext.Provider>
    </>
  )
}









