import { Box,  Flex,  Input, Text } from "@chakra-ui/react";
import {  useCallback, useEffect, useState } from "react";
import {  SubjectObjectVal, SubjectOjectType, TimetableDataType, TimetableDocType } from "~/types/typedef";
import CourseCard from "./CourseCard";
import TimeClashResolverIntro from "./TimeClashResolverInto";
import CourseCart from "./CourseCart";

export default function TimetableClashResolver ({
    timetables
} :{
    timetables: Array<TimetableDocType>
}) {
    
    const [subjects, setSubjects] = useState<SubjectOjectType>({})
    const [filter, setFilter] = useState<string>("")
    
    useEffect(()=> {
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

        setSubjects(subjects)
    }, [])
    
    
    const handleCartAdd = useCallback((subjName:string)=>{
        setSubjects(state=>{
            const newState = {...state, [subjName]: {...state[subjName],isInCart: true, conflicts: undefined}};

            return Object
            .entries(newState)
            .reduce((acc, curr)=> {
                return {
                    ...acc, 
                    [curr[0]]: {
                        ...curr[1],
                        // conflicts at same time
                        conflicts: curr[1].isInCart ? {} : Object.fromEntries( 
                            Object.entries(
                                Object
                                .entries(newState)
                                .filter(v=>v[1].isInCart)
                                .reduce((prev,val)=>{
                                    return {...prev, [val[0]]: val[1].lectures.filter(lhs=>{
                                            return curr[1].lectures.filter(rhs=>{
                                                return lhs.day === rhs.day &&
                                                JSON.stringify(lhs.time) === JSON.stringify(rhs.time)
                                            }).length > 0
                                        })
                                    }
                                }, {})
                            ).filter(v=> (v[1] as Array<any>).length > 0)
                        )
                    } 
                }
            }, {})
        });
    },[setSubjects]);
    
    const handleCartRemove = useCallback((subjName: string)=>{
        setSubjects(s=>{
            const newState = {...s, [subjName]: {...s[subjName],isInCart: false, conflicts: {} }} 
            return Object
            .entries(newState)
            .reduce((acc, curr)=> {
                return {
                    ...acc, 
                    [curr[0]]: {
                        ...curr[1],
                        conflicts: curr[1].isInCart ? {} : Object.fromEntries( 
                            Object.entries(
                                Object
                                .entries(newState)
                                .filter(v=>v[1].isInCart)
                                .reduce((prev,val)=>{
                                    return {...prev, [val[0]]: val[1].lectures.filter(lhs=>{
                                            return curr[1].lectures.filter(rhs=>{
                                                return lhs.day === rhs.day &&
                                                JSON.stringify(lhs.time) === JSON.stringify(rhs.time)
                                            }).length > 0
                                        })
                                    }
                                }, {})
                            ).filter(v=> (v[1] as Array<any>).length > 0)
                        )
                    } 
                }
            }, {})
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
                    Search Courses: {Object.keys(subjects).filter(e=> e.toLowerCase().includes(filter.toLowerCase()))
                    .length} found
                </Text>
                <Input size={'md'}
                    onChange={(e)=> setFilter(e.target.value)}
                    value={filter}
                    placeholder="Enter Course Name"
                />
            </Box>

            {/* courses list */}
            <Flex flexDir={'column'} px={5} gap={3}>
                {Object.entries(subjects)
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
