import { useTalkToServer } from "../Hooks/hooks"
import { serverURL } from "../constants/Constants"
import { useEffect, useState } from "react"
import Loader from "./internals/Loader"

export default function FreeClassrooms ()
{
    const [loading, setLoading] = useState (true)

    useEffect (()=>{
        let currDate:Date = new Date ()
        let hours:string = `${currDate.getHours ()}`.padStart (2, '0')
        let min: string = currDate.getMinutes () >= 30 ? '30' : '00'

        useTalkToServer (`${serverURL}/freerooms/?day=${currDate.getDay ()}&time=${hours}:${min}` )
        .then (data=> console.log (data))

        setLoading (false)
    }, [])

    return (
        <>
            {loading? <Loader isLoading = {true}/>  : <> </>}
        </>
    )
}

