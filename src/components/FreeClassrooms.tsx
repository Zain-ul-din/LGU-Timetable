import { useTalkToServer } from "../Hooks/hooks"
import { serverURL } from "../constants/Constants"
import { useEffect, useState } from "react"
import Loader from "./internals/Loader"
import { daysName } from "../constants/Constants"

export default function FreeClassrooms (): JSX.Element
{
    const [loading, setLoading] = useState <boolean>(true)
    const [data, setData] = useState <any> (null)

    useEffect (()=>{
        let currDate:Date = new Date ()
        let hours:string = `${currDate.getHours ()}`.padStart (2, '0')
        let min: string = currDate.getMinutes () >= 30 ? '30' : '00'
        useTalkToServer (`${serverURL}/freerooms/?day=${daysName[currDate.getDay ()]}&time=${hours}:${min}` )
        .then ((data: any)=> {
            setLoading (false)
            setData (data.data)
        })
    }, [])
    
    return (
        <>
            {loading? <Loader isLoading = {true}/>  : <>comming soon...</>}
            <>
                Apis Response: 
                {data && data.map ((ele: any, idx: number)=>{
                        <h1 key = {idx}>
                            ele.room
                        </h1>
                })}
            </>
        </>
    )
}

