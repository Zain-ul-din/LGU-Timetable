/*
    Main Page
*/
import { useContext } from "react"
import { TimeTableContext } from "../Hooks/TimeTableContext"

import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Selection from "../components/Selection"
import Loader from "../components/internals/Loader"
import TimeTable from "../components/TimeTable"

import { tableHeadTiles } from "../constants/Constants"


export function Main ({ metaData }: { metaData: any }): JSX.Element
{
    const timeTableData = useContext (TimeTableContext)

    return (
        <>
            <NavBar />
            {!timeTableData?.timeTableData.data && <Hero />}
            
            {metaData == null ? <Loader isLoading = {true}/> : <Selection metaData={metaData}/>}
            
            {/* Timetable */}
            {timeTableData?.timeTableData.loadingState ? <Loader isLoading = {true}/> : 
            <>
                {timeTableData?.timeTableData.data && <TimeTable data = {timeTableData.timeTableData.data} headTitles = {tableHeadTiles}/>}
            </>}

            <Footer />
        </>
    )
}
