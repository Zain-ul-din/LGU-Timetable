import { Center, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import Header from "./Header";
import { WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";

export default function ChatRoom ()
{   
    return <Flex 
        width={'100%'} 
        height={'85vh'} 
        maxWidth={'1400px'} 
        m={'0 auto'}
        rounded={'xl'}
        border={'1px solid var(--border-color)'}
        p={'0.2rem'}
    >
        <Flex width={'100%'} bg={'gray.600'} flexDir={'column'} rounded={'xl'}>
            <Header />
            <Flex justifyContent={'center'} p={'1rem'}>
                    <Heading color={'yellow.400'} className="roboto">
                        <WarningTwoIcon/> Under Construction
                    </Heading>
            </Flex>
        </Flex>
    </Flex>
}


