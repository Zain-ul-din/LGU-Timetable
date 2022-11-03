import React, { useState } from 'react'
import TimeTable from './TimeTable'
import NavBar from './NavBar'
import Footer from './Footer'

import { tableHeadTiles } from '../constants/Constants'
import { apiData } from '../temp/DummyData'

export default function App(): JSX.Element
{
  return (
    <>  
      <NavBar/>
      <TimeTable data = {apiData} headTitles= {tableHeadTiles}/>
      <Footer/>
    </>
  )
}




