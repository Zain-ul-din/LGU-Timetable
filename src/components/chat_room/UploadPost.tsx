import { Box, Button, ButtonProps, Center, Flex, Heading, Input, Text, Textarea } from "@chakra-ui/react";
import { CHAT_CATEGORIES } from "~/lib/constant";
import { useContext, useEffect } from "react";
import { UseStateProps } from "~/types/typedef";
import AppStateProvider, { AppState } from "./hooks/AppStateProvider";
import { Fragment} from "react";
import { useRouter } from "next/router";
import { PushNestedRouterParam } from "./hooks/NestedRouting";

import { EditIcon, ViewIcon } from "@chakra-ui/icons";

export default function UploadPost () {

    const [appState, setAppState] = useContext(AppStateProvider);

    return <>
        {/* <Text>Welcome to Discussions</Text> */}
        {!appState.upload_category ? 
            <CategoriesSelection categoryState={[appState, setAppState]}/>:
            <UploadForm categoryState={[appState, setAppState]}/>
        }
    </>
}

function CategoriesSelection ({ categoryState } : { 
    categoryState: UseStateProps<AppState>
}) 
{
    const router = useRouter();

    return <Flex flexDir={'column'} p = {'1rem'} gap={'1rem'} >
        <Heading fontSize={'2xl'} className="roboto">Select a discussion category</Heading>
        <Flex flexDir={'column'}  border={'1px solid var(--border-color)'} rounded={'lg'}>
            {Object.entries(CHAT_CATEGORIES).map(([key, val], idx)=> {
                if (idx == 0) return <Fragment key={idx}></Fragment>
                return <Category key={idx} name={val} btnProps={{ onClick: ()=> {
                    categoryState[1]({...categoryState[0], upload_category: key});
                    PushNestedRouterParam({...categoryState[0], upload_category: key}, router);
                }}}/>
            })}
        </Flex>
    </Flex>
}

const Category = ({ name, btnProps } : { name: string, btnProps?: ButtonProps })=> {
    return <Flex p ={'1rem'} py={'1rem'} border={'0.1px solid var(--border-color)'}>
        <Text className="roboto">{name}</Text>
        <Button size={'sm'} ml={'auto'} colorScheme="green" {...btnProps}>Get Started</Button>
    </Flex>
};

const UploadForm = ({ categoryState }: { categoryState: UseStateProps<AppState> }) => {

    const [state, setState] = categoryState;
    const router = useRouter();

    const validateCategory= (): boolean=> {
        let categories = Object.keys(CHAT_CATEGORIES);

        return categories.slice(1,categories.length).reduce((acc: boolean, curr: string)=> {
            if (acc == true) return true;
            return curr == state.upload_category;
        }, false);
    }

    useEffect(()=> {
         if (!validateCategory()) {
            setState({...state, upload_category: undefined});
            PushNestedRouterParam({...state, upload_category: undefined}, router);
         }
    }, []);

    return <Flex p = {'1rem'} flexDir={'column'} gap={'0.5rem'} height={'100%'}>
        <Heading className="roboto" fontSize={'2xl'}>Start a new discussion</Heading>
        <Flex bg={'gray.600'}>
            <Box p = {'0.5rem'} border={'1px solid var(--border-color)'} rounded={'md'}>
                <Text fontWeight={"extrabold"} className="roboto">{CHAT_CATEGORIES[state.upload_category as keyof typeof CHAT_CATEGORIES]}</Text>
            </Box>
        </Flex>
        <Flex gap={'0.5rem'} flexDir={'column'} my={'1rem'}>
            <Text fontSize={'sm'}>
                {`If this doesn’t look right you can`} 
                <Text display={'inline-block'} color={'blue.300'} px={'0.3rem'}
                    cursor={'pointer'} onClick={()=> {
                        setState({...state, upload_category: undefined});
                        PushNestedRouterParam({...state, upload_category: undefined}, router);
                    }}
                >
                    choose a different category.
                </Text>
            </Text>
            <Text fontSize={'sm'} color={'var(--muted-color)'}>Fields marked with an asterisk (*) are required.</Text>
        </Flex>

        {/* Main Input */}
        <Text>Discussion title *</Text>
        <Input placeholder="Title" minH={'2.5rem'}/>
        <Flex flexDir={'column'} bg={'var(--card-color)'} rounded={'lg'} gap={'0.5rem'} p = {'0.5rem'}>
            <Flex gap={'0.5rem'}>
                <Button size={'sm'} variant={'outline'}>
                 <EditIcon/>
                </Button>
                <Button size={'sm'} variant={'outline'} isActive={true}>
                 <ViewIcon/>
                </Button>
            </Flex>
            <Textarea placeholder="use markdown here" minH={'10rem'} maxH={'30rem'} />
            <Box ml={'auto'}>
                <Button variant={'outline'} colorScheme="whatsapp" isDisabled={true}>start discussion</Button>
            </Box>
        </Flex>

        <Center>
            
        </Center>            
    </Flex>
}




