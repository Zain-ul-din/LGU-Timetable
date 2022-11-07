import { useContext, useReducer, useState } from 'react'
import { TimeTableInputContext } from '../Hooks/TimeTableInputContext'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Center, Flex, Text, Button, useColorModeValue } from '@chakra-ui/react'
import { MenuStyle, TabStyle, Transitions } from '../style/Style'

// temp imports
import { metaData } from '../temp/DummyData'

const tabTitles = [
    'Fall', 'Semester', 'Section'
]

export default function Selection (): JSX.Element
{
    const userInput = useContext (TimeTableInputContext)
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
                    <TabStyle.Tab isDisabled = {userInput?.timeTableInput.fall == null}>
                        Semester
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
                                userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {fall: selectedItem}))
                                setSelectedItem (selectedItem)
                                setCurrTabIdx (1)
                            }}
                        />
                    </TabStyle.TabPanel>

                    <TabStyle.TabPanel textAlign={'center'}>
                        <Transitions.SlideFade in = {currTabIdx == 1}>
                            { userInput?.timeTableInput.fall  == null ? <></> :
                            <DropDown 
                                defautlSelectedItem = {'choose semester'}
                                menuItems={Object.keys (metaData [userInput?.timeTableInput.fall])} 
                                onClick = {(selectedItem:string, setSelectedItem:React.Dispatch<React.SetStateAction<string>>)=>{
                                    userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {semester: selectedItem}))
                                    setSelectedItem (selectedItem)
                                    setCurrTabIdx (2)
                                }}
                            />}
                        </Transitions.SlideFade>
                    </TabStyle.TabPanel>

                    <TabStyle.TabPanel textAlign={'center'}>
                        <Transitions.SlideFade in = {currTabIdx == 2}>
                            {userInput?.timeTableInput.fall == null || userInput?.timeTableInput.semester  == null ? <></> :
                            <DropDown 
                                defautlSelectedItem = {'choose semester'}
                                menuItems = {metaData [userInput?.timeTableInput.fall] [userInput.timeTableInput.semester]} 
                                onClick = {(selectedItem:string, setSelectedItem:React.Dispatch<React.SetStateAction<string>>)=>{
                                    userInput?.setTimeTableInput (Object.assign (userInput.timeTableInput, {sectiion: selectedItem}))
                                    setSelectedItem (selectedItem)
                                }}
                            />}
                        </Transitions.SlideFade>
                    </TabStyle.TabPanel>

                </TabStyle.TabPanels>
            </TabStyle.Tabs>
        </Flex>    
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
    )
}

