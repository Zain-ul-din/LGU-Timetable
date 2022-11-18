import React from "react"
import { useContext } from "react"
import { TimeTableContext } from "../Hooks/TimeTableContext"

import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Selection from "../components/Selection"
import Loader from "../components/internals/Loader"
import TimeTable from "../components/TimeTable"

import { tableHeadTiles } from "../constants/Constants"

interface MainPropsType
{
    showHeroComponent: boolean,
    isLoading: boolean
}

export function Main (
    {showHeroComponent, isLoading}: MainPropsType 
): JSX.Element
{
    const timeTableData = useContext (TimeTableContext)

    return (
        <>
            <NavBar />
            {showHeroComponent && <Hero />}
            {metaData == null ? <Loader isLoading = {true}/> : <Selection metaData={metaData}/>}
            {timeTableData?.timeTableData.loadingState ? <Loader isLoading = {true}/> : 
            <>
                {timeTableData?.timeTableData.data && <TimeTable data = {timeTableData.timeTableData.data} headTitles = {tableHeadTiles}/>}
            </>}
            <Footer />
        </>
    )
}
