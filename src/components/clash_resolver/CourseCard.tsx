import { AddIcon, DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { memo, useEffect } from "react";
import { ROUTING } from "~/lib/constant";
import { LectureTimeObjectType, SubjectObjectVal } from "~/types/typedef";

const CourseCard = (
    { name, onAdd, onRemove, subject }:
    { 
        name: string, 
        subject: SubjectObjectVal, 
        onAdd?: (subjName: string) => void, 
        onRemove: (subjName: string) => void
    }
)=> {
    

    useEffect(()=> {
        console.log("re-render due to onAdd")
    }, [onAdd])
    
    useEffect(()=> {
        console.log("re-render due to onRemove")
    }, [onRemove])
    
    useEffect(()=> {
        console.log("re-render due to subject")
    }, [subject])

    useEffect(()=> {
        console.log("re-render due to name")
    }, [name])
    

    return <Flex bg={'gray.700'} p={2} rounded={'md'} flexDir={'column'} gap={2} border={'1px solid var(--border-color)'}>
        <Flex gap={4}>
            <Link href={ROUTING.timetable+"/"+subject.url_id} target="_blank">
                <Text  _hover={{
                    textDecoration: 'underline'
                }}>
                <LinkIcon fontSize={'sm'} style={{
                    transform: 'translateY(-1px)'
                }}/> {name} 
                </Text>
            </Link>
            {!subject.isInCart  ?
                <>{onAdd && <Button size={'xs'} onClick={()=> onAdd(name)} colorScheme="green"
                    isDisabled={Object.entries(subject.conflicts).length>0}
                >
                    <AddIcon />
                </Button>}</>
            :
            <Button size={'xs'} onClick={()=> onRemove(name)} colorScheme="red">
                <DeleteIcon />
            </Button>}
        </Flex>
        
        <Flex>
            {Object.entries(subject.conflicts).length == 0 ? 
            <Alert status="success" variant={'top-accent'}>
                <AlertIcon />
                No conflicts found
            </Alert>:
            <>
                <Flex flexDir={'column'} gap={5}>
                    {Object.entries(subject.conflicts).map(([subjName, lectures], i)=>{
                        return <Flex key={i} bg={'red.400'} p={1} rounded={'md'}
                            flexDir={'column'}
                        >
                            CONFLICT WITH: 
                            <Box fontWeight={'bold'}>{subjName}</Box>
                             {' '}
                            At:
                            {lectures.map((l,i)=>{
                                return <Flex key={i} bg={'red.700'} p={0.5} px={2} fontWeight={'extrabold'}>
                                    - {l.day} 
                                    <Text display={'inline-block'} mx={2}>
                                        <TimeRenderer 
                                            time={l.time}
                                        />
                                    </Text>
                                </Flex>
                            })}
                        </Flex>
                    })}
                </Flex>
            </>}
        </Flex>
    </Flex>
}

const TimeRenderer = ({ time }: { time: LectureTimeObjectType }) => {
    return <>
        {time.startTime.hours.toString().padStart(2,'0')}:{time.startTime.minutes.toString().padStart(2,'0')}
        {' - '}
        {time.endTime.hours.toString().padStart(2,'0')}:{time.endTime.minutes.toString().padStart(2,'0')}
    </>
}

const CourseCardMemo = memo(CourseCard, (acc, curr)=> {
    if(JSON.stringify(acc.subject) == JSON.stringify(curr.subject))
        return true;
    return false;
});

export default CourseCardMemo;


