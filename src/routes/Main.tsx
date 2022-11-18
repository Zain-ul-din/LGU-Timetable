import React from "react"
import { useContext } from "react"

import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Selection from "../components/Selection"

interface MainPropsType
{
    showHeroComponent: boolean
}

export function Main (
    {showHeroComponent}: MainPropsType 
): JSX.Element
{

    return (
        <>
            <NavBar />
            {showHeroComponent && <Hero />}
            {metaData == null ? <Loader isLoading = {true}/> : <Selection metaData={metaData}/>}
            {timeTableData.loadingState ? 
              <Loader isLoading = {true}/> : 
              <>
                {timeTableData.data && <TimeTable data = {timeTableData.data} headTitles = {tableHeadTiles}/>}
            </>}
            <Footer />
        </>
    )
}
