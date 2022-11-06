import React, { useEffect, useState } from 'react'
import TimeTable from './TimeTable'
import NavBar from './NavBar'
import Selection from './Selection'
import Footer from './Footer'


import { tableHeadTiles } from '../constants/Constants'
import { ApiData } from '../temp/DummyData'
import { zoomOutOnMob } from '../style/Style'

/*
  TEMO IMPORTS
*/

import DirtyTables from '../temp/DirtyTables'


export default function App(): JSX.Element
{
  
  useEffect (()=> { zoomOutOnMob () })

  
  

  return (
    <>  
      <NavBar/>
      <Selection />
      {/* <DirtyTables /> */}
      <TimeTable data = {ApiData ()} headTitles = {tableHeadTiles}/>
      <Footer/>
    </>
  )
}




