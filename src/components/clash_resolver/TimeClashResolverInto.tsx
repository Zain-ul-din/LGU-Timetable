import { CopyIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiErrorCircle } from "react-icons/bi";
import { FcOvertime } from "react-icons/fc";
import { LINKS } from "~/lib/constant";

export default function TimeClashResolverIntro ()
{
    const router = useRouter()

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
        
        <Flex justifyContent={'center'} flexDir={'column'} alignContent={'center'} alignItems={'center'}>
            
            <Flex alignItems={'center'} flexDir={'column'}>
                <Heading>
                    USAGE
                </Heading>
                <Flex gap={2} py={3} flexWrap={'wrap'} justifyContent={'center'} px={4}>
                    <Text>
                        1. Search and Add Subject to cart
                    </Text>
                    <Text>
                        2. Resolve conflicts if any
                    </Text>
                    <Text>
                        3. Reverify from official site
                    </Text>
                </Flex>
            </Flex>
            
            <Button 
            onClick={()=>{
                navigator.share({
                    title: 'LGU Timetable',
                    text: `LGU Timetable Clash Resolver`,
                    url: window.location.href
                })
            }}>
                Share Link <CopyIcon />
            </Button>
            <Button
                my={2}
                size={'sm'}
                onClick={()=> {
                    router.push(LINKS.QA_REDIRECT_LINK)
                }}
                colorScheme="red"
                variant={'ghost'}
            >
                <BiErrorCircle style={{
                    marginRight: '0.1rem',
                    fontSize: '1rem',
                    transform: 'translateY(1px)'
                }}/>
                Report Bug here
            </Button>
        </Flex>

        <Alert status="warning" justifyContent={'center'}>
            <AlertIcon /> 
            This tool is not an official university website. Verify all course details on the official site before finalizing your selection.
        </Alert>
    </>
}
