import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export const AppStyleProvider = ChakraProvider

const colors = {
    brand: {
        900: '#1a365d',
        800: '#153e75',
        700: '#2a69ac',
    }
}

export const appTheme: Record <string,any> = extendTheme({ colors })

import { 
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, 
    Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider, 
} from '@chakra-ui/react'

export const TableStyle =
{
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
}

export const MenuStyle = 
{
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
}

export function zoomOutOnMob(): void {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    
    if (width <= 500)
    {
        //@ts-ignore
        document.body.style.zoom = "100%";
    }
}

// credit: https://chakra-ui.com/

