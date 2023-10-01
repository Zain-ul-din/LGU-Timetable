import { Box,  Flex,  Input, Text } from "@chakra-ui/react";
import {  useCallback, useEffect, useMemo, useState } from "react";
import {  SubjectObjectVal, SubjectOjectType, TimetableDataType, TimetableDocType } from "~/types/typedef";
import CourseCard from "./CourseCard";
import TimeClashResolverIntro from "./TimeClashResolverInto";
import CourseCart from "./CourseCart";
import { findCoursesTimeConflicts } from "~/lib/util";

export default function TimetableClashResolver ({
    timetables
} :{
    timetables: Array<TimetableDocType>
}) {
    
    const [subjects, setSubjects] = useState<SubjectOjectType>({})
    const [filter, setFilter] = useState<string>("")
    
    useEffect(()=> setSubjects(constructSubjectOjectFromTimetables(timetables)),[])

    const memoSubjects = useMemo(()=> findCoursesTimeConflicts(subjects),[subjects])

    const visibleSubjectsCount = useMemo<number>(()=> Object
        .keys(subjects).filter(e=> e.toLowerCase().includes(filter.toLowerCase()))
    .length, [subjects,filter]);
    
    const handleCartAdd = useCallback((subjName:string)=>{
        setSubjects(state=>{
            return {...state, [subjName]: {...state[subjName],isInCart: true, conflicts: {}}}
        });
    },[setSubjects]);
    
    const handleCartRemove = useCallback((subjName: string)=>{
        setSubjects(s=>{
            return {...s, [subjName]: {...s[subjName],isInCart: false, conflicts: {} }} 
        });
    }, [setSubjects])
    
    return <>
        <CourseCart 
            removeCartItemHandle={handleCartRemove}
            subjects={subjects}
        />

        <Flex maxW={'1200px'} m={'0 auto'} py={'2'}
            justifyContent={'center'} flexDir={'column'}
            gap={5}
        >
            <TimeClashResolverIntro />

            {/* search input */}
            <Box px={5}>
                <Text fontWeight={'bold'} my={1}>
                    Search Courses: {visibleSubjectsCount} found
                </Text>
                <Input size={'md'}
                    onChange={(e)=> setFilter(e.target.value)}
                    value={filter}
                    placeholder="Enter Course Name"
                />
            </Box>

            {/* courses list */}
            <Flex flexDir={'column'} px={5} gap={3}>
                {Object.entries(memoSubjects)
                .filter(e=> e[0].toLowerCase().includes(filter.toLowerCase()))
                .map(([subjName,subj]:[string,SubjectObjectVal],i)=>{
                    return <CourseCard
                        key={i} 
                        name={subjName}
                        subject = {subj} 
                        onAdd={handleCartAdd}
                        onRemove={handleCartRemove}
                    />
                })}
            </Flex>
            
            {/* flexible space since we have fixed footer in the bottom*/}
            <Flex my={'5rem'}></Flex>
        </Flex>
    </>
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
