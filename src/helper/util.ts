import { TimeType } from "../types/typedef";

/**
 * Get Table ColSpan base on startTime - endTime diff
 * -> 30min: 1 colSpan
 * @param startTime 
 * @param endTime 
 * @returns table colSpan base on time diff
 */
export function getColSpan (startTime: TimeType, endTime: TimeType): number
{
    var startTimeToMin: number = (startTime.hour * 60) + startTime.min
    var endTimeToMin: number   = (endTime.hour * 60) + endTime.min

    // invalid time
    if (startTimeToMin < endTimeToMin) 
    {
        return 3;
    }
    
    var timeDiffToMin = endTimeToMin - startTimeToMin

    let colSpan = 0
    const halfHour:number = 30

    while (timeDiffToMin >= halfHour)
    {
        timeDiffToMin -= halfHour
        colSpan += 1
    }

    return colSpan;
}
