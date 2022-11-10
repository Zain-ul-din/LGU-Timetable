import { useContext, useState } from 'react'
import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'
import { TimeTableContext } from '../Hooks/TimeTableContext'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Flex, Text, Button, useColorModeValue } from '@chakra-ui/react'
import { MenuStyle, TabStyle, Transitions } from '../style/Style'

import { serverURL } from '../constants/Constants'
import { useTalkToServer } from '../Hooks/hooks'

const tabTitles = [
    'Fall', 'Program', 'Section'
]


export default function Selection ({ metaData }: { metaData:any }): JSX.Element
{
    const userInput = useContext (TimeTableInputContext)
    const timeTableHook = useContext(TimeTableContext)
    const [currTabIdx, setCurrTabIdx] = useState <number> (0)

    return (
        <>
        <Transitions.SlideFade in = {true}>
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
                    <TabStyle.Tab isDisabled = {userInput?.timeTableInput.fall == null}>
                        Program
                    </TabStyle.Tab>
                    <TabStyle.Tab isDisabled = {userInput?.timeTableInput.semester == null}>
                        Section
                    </TabStyle.Tab>
                </TabStyle.TabList>
                
                {/* Panels */}
                <TabStyle.TabPanels justifyContent={'center'}>
                    
                    <TabStyle.TabPanel textAlign={'center'}>
                        <DropDown 
                            defautlSelectedItem = {'choose fall'}
                            menuItems={Object.keys (metaData)} 
                            onClick = {(selectedItem:string, setSelectedItem:React.Dispatch<React.SetStateAction<string>>)=>{
                                userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {semester: null}))
                                userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {fall: selectedItem}))
                                setSelectedItem (selectedItem)
                                setCurrTabIdx (1)
                            }}
                        />
                    </TabStyle.TabPanel>

                    <TabStyle.TabPanel textAlign={'center'}>
                        <Transitions.SlideFade in = {currTabIdx == 1}>
                            { userInput?.timeTableInput.fall  != null &&
                            <DropDown 
                                defautlSelectedItem = {'choose program'}
                                menuItems={Object.keys (metaData [userInput?.timeTableInput.fall])} 
                                onClick = {(selectedItem:string, setSelectedItem:React.Dispatch<React.SetStateAction<string>>)=>{
                                    userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {section: null}))
                                    userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {semester: selectedItem}))
                                    setSelectedItem (selectedItem)
                                    setCurrTabIdx (2)
                                }}
                            />} 
                        </Transitions.SlideFade>
                    </TabStyle.TabPanel>

                    <TabStyle.TabPanel textAlign={'center'}>
                        <Transitions.SlideFade in = {currTabIdx == 2}>
                            {userInput?.timeTableInput.fall != null && userInput?.timeTableInput.semester  != null &&
                            <DropDown 
                                defautlSelectedItem = {'choose section'}
                                menuItems = {metaData [userInput?.timeTableInput.fall] [userInput.timeTableInput.semester]} 
                                onClick = {(selectedItem:string, setSelectedItem:React.Dispatch<React.SetStateAction<string>>)=>{
                                    userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {section: selectedItem}))
                                    setSelectedItem (selectedItem)
                                    // send web request
                                    let input = userInput.timeTableInput
                                    console.log ('loading...')
                                    timeTableHook?.setTimeTableData (Object.create ({data: null, loadingState: true}))
                                    useTalkToServer (serverURL + `/timetable?semester=${input.fall?.at(0)}&degree=${input.semester}&section=${input.section}`).then ((data)=>{
                                        console.log (data)
                                        timeTableHook?.setTimeTableData (Object.create({data, loadingState: false}))
                                    })
                                }}
                            />}
                        </Transitions.SlideFade>
                    </TabStyle.TabPanel>

                </TabStyle.TabPanels>
            </TabStyle.Tabs>
        </Flex>   
        </Transitions.SlideFade> 
        </>
    )
}


type onClickCallBack = (selectedItem:string, setSelectedItem:React.Dispatch<React.SetStateAction<string>>) => void

function DropDown (
    {defautlSelectedItem ,menuItems, onClick}
    :
    {defautlSelectedItem:string, menuItems: Array<string> | null, onClick: onClickCallBack }
): JSX.Element
{
    const [selectedItem, setSelectedItem]: 
        [string, React.Dispatch<React.SetStateAction<string>>] = useState <string> (defautlSelectedItem)
    
    return (
        <Transitions.SlideFade in = {true}>
        <MenuStyle.Menu>
            <MenuStyle.MenuButton as = {Button} rightIcon = {<ChevronDownIcon/>}>
               {selectedItem}
            </MenuStyle.MenuButton>
            <MenuStyle.MenuList onChange={(e)=> {console.log (e.target)}}>
                {menuItems && menuItems?.map ( (item: string, idx: number): JSX.Element => 
                    <MenuStyle.MenuItem onClick={(e)=> onClick (item, setSelectedItem) } key = {idx}>
                        {item}
                    </MenuStyle.MenuItem>
                )}
            </MenuStyle.MenuList>
        </MenuStyle.Menu>
        </Transitions.SlideFade>
    )
}


