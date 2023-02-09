import { Flex, Center, Button } from "@chakra-ui/react";

export default function PortalRedirect () 
{

    return (
        <Flex width={'100%'} p={2} justifyContent={'center'} direction={'column'} borderBottom={'1px solid'} borderColor={"blackAlpha.500"}>
            <Center>
                <a href="https://student.lgu.edu.pk/DashBoard/Index" target="_blank" rel="noreferrer">
                    <Button colorScheme="facebook" marginY={3}>
                        Redirect to LGU-Portal
                    </Button>
                </a>
            </Center>
            <Center>
                <h1 style={{textAlign: 'center'}}>This link redirect you to LGU-portal without entering credentials with the help of web cookies</h1>
            </Center>
        </Flex>
    )
}
