import { getDocs } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { timeTableCol } from "~/lib/firebase";
import { SubjectOjectType, TimetableDataType, TimetableDocType } from "~/types/typedef";

var cache: SubjectOjectType = {}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    
    console.log(req.method)

    if(req.method == "POST") {
        try {
            const { key } = req.query
            if(key == process.env.NEXT_PUBLIC_REDIS_URL)
                updateCache();
            console.log("post success")
            res.status(200).send({ updated: true })
        } catch(err) {
            console.log("post fail")
            res.status(500).send("not allowed: server side protected route")
        }
        return;
    }

    if(req.method !== "GET") {
        res.status(404).send({ status: 404})
        return;
    }

    if(Object.entries(cache).length == 0) {
        await updateCache()
    }
    
    res.status(200).send(cache)
}

/**
 * Updates cache
 */
async function updateCache () {
    console.log("At Util Cache, Going to Cache values from firebase")
    const timetableDocSpanShot = await getDocs(timeTableCol);

    const timetables: Array<TimetableDocType> = timetableDocSpanShot.docs.map((timetable) =>
        ({id: timetable.id, ...timetable.data()})
    ) as Array<TimetableDocType>;
    cache = constructSubjectOjectFromTimetables(timetables)
}

/**
 * Construct Object of type SubjectOject from timetables
 * @param timetables 
 * @returns 
 */
const constructSubjectOjectFromTimetables = (
    timetables: Array<TimetableDocType>
) => {
    const subjects: SubjectOjectType = {}
    timetables.forEach(timetable=> {
        (Object.entries(timetable.timetable))
        .forEach(([day,lectures]:[string, Array<TimetableDataType>])=>{
            lectures.forEach(lecture=> {
                var key = lecture.subject+ " " + (timetable.id as string);
                if (subjects[key] == undefined) subjects[key] = {
                    isInCart: false,
                    conflicts: {},
                    lectures: [],
                    url_id: timetable.id as string
                }
                
                subjects[key].lectures.push({
                    day,
                    time: {
                        endTime: lecture.endTime,
                        startTime: lecture.startTime 
                    } as any
                });
            })
        })
    });
    return subjects
}
