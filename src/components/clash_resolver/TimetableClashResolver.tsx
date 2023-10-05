import { Box,  Button,  Center,  Flex,  Heading,  Input, Skeleton, Spinner, Text } from "@chakra-ui/react";
import {  useCallback, useEffect, useMemo, useState } from "react";
import {  SubjectObjectVal, SubjectOjectType, TimetableDataType, TimetableDocType } from "~/types/typedef";
import CourseCard from "./CourseCard";
import TimeClashResolverIntro from "./TimeClashResolverInto";
import CourseCart from "./CourseCart";
import { findCoursesTimeConflicts } from "~/lib/util";
import { HttpClient } from "~/lib/httpclient";
import { APIS_ENDPOINTS } from "~/lib/constant";
import Loader from "../design/Loader";
import { BiLoader } from "react-icons/bi";
import AdminLayout from "../admin/layout";
import axios from "axios";

export default function TimetableClashResolver () {
    
    const [loading, setLoading] = useState<boolean>(true)
    const [subjects, setSubjects] = useState<SubjectOjectType>({})
    const [filter, setFilter] = useState<string>("")
    

    useEffect(()=> {
        const getSubjects =async () => {
            const httpClient = new HttpClient<SubjectOjectType>(
                APIS_ENDPOINTS.Util_Cache, (res)=> {
                    setLoading(false)
                    setSubjects(res.data)
                }
            );
            
            httpClient.get()
        }

        getSubjects()
    }, [])

    const [subjectLoading, setSubjectLoading] = useState<boolean>(false)
    
    const visibleSubjectsCount = useMemo<number>(()=> Object
        .keys(subjects).filter(e=> e.toLowerCase().includes(filter.toLowerCase()))
    .length, [subjects,filter]);
    
    const handleCartAdd = useCallback((subjName:string)=>{
        setSubjectLoading(true)
        setSubjects(state=>{
            return {...state, [subjName]: {...state[subjName],isInCart: true, conflicts: {}}}
        });
    },[setSubjects]);
    
    const handleCartRemove = useCallback((subjName: string)=>{
        setSubjectLoading(true)
        setSubjects(s=>{
            return {...s, [subjName]: {...s[subjName],isInCart: false, conflicts: {} }} 
        });
    }, [setSubjects])

    useEffect(()=> {
        if(!subjectLoading) return;
        
        const stateAsync = async ()=> {
            await (new Promise(resolve=> {
                setSubjects(newState => findCoursesTimeConflicts(newState))
                resolve(true)
            })).then((val)=>{
                setSubjectLoading(newState=> false)
            })
        }

        stateAsync()
    }, [subjectLoading, subjects, setSubjects])
    

    return <>
        
        <CourseCart 
            removeCartItemHandle={handleCartRemove}
            subjects={subjects}
        />

        

        {subjectLoading && <LoadingOverlay />}

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

            {loading && 
            <Loader>
                Please wait fetching subjects data
            </Loader>}
            
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
            
            {/* Admin Stuff */}
            {/* <AdminLayout>
                <Center p={4}>
                    <Button my={2} variant={'outline'}
                        onClick={async ()=> {
                            setLoading(true)
                            axios.post(`${APIS_ENDPOINTS.Util_Cache}?key=${process.env.NEXT_PUBLIC_REDIS_URL}`)
                            .then(()=> setLoading(false))
                        }}
                        isLoading={loading}
                    >
                        Update Cache
                    </Button>
                </Center>
            </AdminLayout>*/}
            
            {/* flexible space since we have fixed footer in the bottom*/}
            <Flex my={'5rem'}></Flex>
        </Flex>
    </>
}

const LoadingOverlay = ()=> {
    return <Flex
        position={'fixed'}
        top={2} right={2} bottom={0} left={2}
        bg={'var(--bg-dark)'}
        zIndex={9999}
        justifyContent={'center'}
        alignContent={'center'}
        alignItems={'center'}
    >
        <Flex p={5} bg={'black'} rounded={'md'} gap={2} alignItems={'center'}
            border={'2px solid'} borderColor={'var(--border-color)'}
        >
            <Loader 
                style={{
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap:'0.5rem',
                    justifyContent: 'center'
                }}
            >
                <BiLoader className="spinner"/>
                Wait, Updating Subjects
            </Loader>
        </Flex>
        {' '}
    </Flex>
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
