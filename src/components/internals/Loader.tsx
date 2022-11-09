import { Spinner, Center } from "@chakra-ui/react";

export default function Loader ({isLoading}: {isLoading:boolean}): JSX.Element
{
    return (
        <>
            {isLoading && 
            <>
                <Center>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    /> 
                </Center>
            </>}
        </>
    )
}