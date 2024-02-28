import { Flex, Menu, MenuButton, MenuItem, MenuList, ColorProps } from '@chakra-ui/react';

export interface DropDownProps {
  options: string[];
  onChange: (selected: string) => void;
  children: React.ReactNode;
}

export default function DropDown(props: DropDownProps) {
  return (
    <Menu>
      <MenuButton as={Flex} bg={'transparent'} cursor={'pointer'}>
        {props.children}
      </MenuButton>
      <MenuList>
        {props.options.map((option, index) => (
          <MenuItem key={index} onClick={() => props.onChange(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
