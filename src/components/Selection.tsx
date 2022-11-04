import { ChevronDownIcon } from '@chakra-ui/icons'
import { Center, Flex, Text, Button } from '@chakra-ui/react'
import { MenuStyle } from '../style/Style'

export default function Selection (): JSX.Element
{
    return (
        <>
            <Center>
                <Text fontSize={'2xl'} fontWeight = {'light'}>
                    {'Select Your Semester and Section'.toLocaleUpperCase ()}
                </Text>
            </Center>

            <Flex 
                direction={'row'}
                textAlign = {'center'}
                alignContent = {'center'}
                justifyContent = {'center'}
                gap = {2}
                outlineColor = {'InactiveBorder'}
            >
                
                <MenuStyle.Menu>
                    <MenuStyle.MenuButton as = {Button} rightIcon = {<ChevronDownIcon/>}>
                       choose fall
                    </MenuStyle.MenuButton>
                    <MenuStyle.MenuList>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                    </MenuStyle.MenuList>
                </MenuStyle.Menu>

                <MenuStyle.Menu>
                    <MenuStyle.MenuButton as = {Button} rightIcon = {<ChevronDownIcon/>}>
                       choose fall
                    </MenuStyle.MenuButton>
                    <MenuStyle.MenuList>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                    </MenuStyle.MenuList>
                </MenuStyle.Menu>

                <MenuStyle.Menu>
                    <MenuStyle.MenuButton as = {Button} rightIcon = {<ChevronDownIcon/>}>
                       choose fall
                    </MenuStyle.MenuButton>
                    <MenuStyle.MenuList>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                        <MenuStyle.MenuItem>Hello world</MenuStyle.MenuItem>
                    </MenuStyle.MenuList>
                </MenuStyle.Menu>

            </Flex>

        </>
    )
}
