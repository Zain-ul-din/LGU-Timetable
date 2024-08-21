import { ChakraProvider, ThemeConfig, extendTheme } from '@chakra-ui/react';

export const AppStyleProvider = ChakraProvider;

const colors = {
  gray: {
    900: 'var(--bg-color)',
    800: 'var(--bg-color)',
    700: 'var(--bg-color)',
    600: 'var(--bg-color)',
    500: 'var(--border-color)',
    400: 'white',
    300: '#cbd5e1',
    200: '#e2e8f0',
    100: '#f1f5f9',
    50: '#f8fafc'
  },
  whiteAlpha: {
    300: 'var(--border-color)'
  },
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colorMode: 'dark'
};

export const appTheme: Record<string, any> = extendTheme({ colors });

export const themeConfig: ThemeConfig = {
  initialColorMode: 'dark', // 'dark' | 'light'
  useSystemColorMode: false
};

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Fade,
  ScaleFade,
  Slide,
  SlideFade
} from '@chakra-ui/react';

export const TableStyle = {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
};

export const MenuStyle = {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider
};

export const TabStyle = {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
};

export const Transitions = {
  Fade,
  ScaleFade,
  Slide,
  SlideFade
};

// credit: https://chakra-ui.com/
