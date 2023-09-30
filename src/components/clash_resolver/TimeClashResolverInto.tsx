import { Alert, AlertIcon, Heading, Text } from "@chakra-ui/react";
import { FcOvertime } from "react-icons/fc";

export default function TimeClashResolverIntro ()
{
    return <> 
        <Heading alignItems={'center'} p ={2} textAlign={'center'}>
        <FcOvertime style={{
                display: 'inline-block',
                transform: 'translateY(3px)',
                marginRight: '0.3rem'
            }}/>
            Introducing Timetable Clash Resolver
        </Heading>
        <Text py={0} px={5} textAlign={'center'} color={'whiteAlpha.700'}>
            Welcome to our Timetable Clash Resolution Tool, designed exclusively for students like you, navigating the maze of course selection at our university. We understand that creating the perfect timetable can be a daunting task, especially when faced with clashes in schedules. Fret not! Our user-friendly tool is here to ensure that you can craft your ideal timetable without any time conflicts
        </Text>
        
        <Alert status="warning" justifyContent={'center'}>
            <AlertIcon /> 
            This tool is not an official university website. Verify all course details on the official site before finalizing your selection.
        </Alert>
    </>
}