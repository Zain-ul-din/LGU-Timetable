import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export const AppStyleProvider = ChakraProvider

const colors = {
    gray: {
        900: '#0f172a',
        800: '#0f172a',
        700: '#334155',
        600: '#475569',
        500: '#64748b',
        400: '#94a3b8',
        300: '#cbd5e1',
        200: '#e2e8f0',
        100: '#f1f5f9',
        50:  '#f8fafc'
    }
}

export const appTheme: Record <string,any> = extendTheme({ colors })

import { 
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, 
    Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider, 
    Tabs, TabList, TabPanels, Tab, TabPanel , Fade, ScaleFade, Slide, SlideFade
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

export const TabStyle = 
{
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
}

export const Transitions =
{
    Fade,
    ScaleFade,
    Slide,
    SlideFade
}

// credit: https://chakra-ui.com/

