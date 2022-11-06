import { useContext, useState } from 'react'
import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Center, Flex, Text, Button, useColorModeValue } from '@chakra-ui/react'
import { MenuStyle, TabStyle, Transitions } from '../style/Style'

const tabTitles = [
    'Fall', 'Semester', 'Section'
]

export default function Selection (): JSX.Element
{
    const useInput = useContext (TimeTableInputContext)
    const [currTabIdx, setCurrTabIdx] = useState <number> (0)

    return (
        <>
        <Flex 
            outline={1} 
            justifyContent = {'center'} 
            alignItems = {'center'}
            p = {5} 
            border={'0.1px solid'}
            borderRadius = {'lg'}
            m = {2}
            shadow = {'inner'}
            borderWidth={"1px"}
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            flexDir = {'column'}
        >

            <Text fontSize={{base : '1xl', md : '2xl', lg : '3xl' }} fontWeight = {'light'}>
                {`Select ${tabTitles[currTabIdx]}`.toLocaleUpperCase ()}
            </Text>
            
            <TabStyle.Tabs index={currTabIdx} onChange = {setCurrTabIdx}>
                <TabStyle.TabList>
                    <TabStyle.Tab>
                        Fall
                    </TabStyle.Tab>
                    <TabStyle.Tab isDisabled = {useInput?.timeTableInput.section == null}>
                        Semester
                    </TabStyle.Tab>
                    <TabStyle.Tab isDisabled = {useInput?.timeTableInput.section == null}>
                        Section
                    </TabStyle.Tab>
                </TabStyle.TabList>
                
                {/* Panels */}
                <TabStyle.TabPanels justifyContent={'center'}>
                    
                    <TabStyle.TabPanel>
                        <p onClick={(e)=> { setCurrTabIdx (1) }}>Hello World</p>
                    </TabStyle.TabPanel>

                    <TabStyle.TabPanel>
                        <Transitions.SlideFade in = {currTabIdx == 1}>
                            <p onClick={(e)=> { setCurrTabIdx (2) }}>Hello World@</p>
                        </Transitions.SlideFade>
                    </TabStyle.TabPanel>

                    <TabStyle.TabPanel>
                        <Transitions.SlideFade in = {currTabIdx == 2}>
                            <p>Hello World!</p>
                        </Transitions.SlideFade>
                    </TabStyle.TabPanel>

                </TabStyle.TabPanels>
            </TabStyle.Tabs>
        </Flex>    
        </>
    )
}

{/* <MenuStyle.Menu>
    <MenuStyle.MenuButton as = {Button} rightIcon = {<ChevronDownIcon/>}>
       choose fall
    </MenuStyle.MenuButton>
    <MenuStyle.MenuList>
        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
    </MenuStyle.MenuList>
</MenuStyle.Menu> */}