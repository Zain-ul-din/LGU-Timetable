import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { JSXElementConstructor, ReactElement } from "react";

export interface DropDownProps {
    options: string[];
    onChange: (selected: string) => void;
    children: React.ReactNode
}

export default function DropDown (props: DropDownProps) {
    return <Menu>
        <MenuButton  as={Flex} bg={'transparent'} cursor={'pointer'} >
          {props.children}
        </MenuButton>
        <MenuList>
          {props.options.map((option, index) => <MenuItem key={index} onClick={() => props.onChange(option)}>{option}</MenuItem>)}
        </MenuList>
    </Menu>
}
