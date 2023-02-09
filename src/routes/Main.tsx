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
import PortalRedirect from "../components/PortalRedirect"

import { tableHeadTiles } from "../constants/Constants"


export default function Main ({ metaData }: { metaData: any }): JSX.Element
{
    const timeTableData = useContext (TimeTableContext)
    
    return (
        <>
            {/* <PortalRedirect /> */}
            <NavBar />
            {!timeTableData?.timeTableData.data && <Hero />}
            {metaData == null ? 
                <Loader isLoading = {true}/> : 
                <Selection metaData={metaData}/>}
            
            {timeTableData?.timeTableData.loadingState ? <Loader isLoading = {true}/> : 
            <>
                {timeTableData?.timeTableData.data &&
                    <TimeTable data = {timeTableData.timeTableData.data} headTitles = {tableHeadTiles}/>}
            </>}

            <Footer />
        </>
    )
}


