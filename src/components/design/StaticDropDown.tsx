import { Flex, Menu, MenuButton, MenuItem, MenuList, ColorProps } from '@chakra-ui/react';

export interface Option {
   label: string | React.ReactNode;
   color?: ColorProps;
   onClick?: () => void;
}

export interface StaticDropDownProps {
   options: Option[];
   children: React.ReactNode;
}

export default function StaticDropDown(props: StaticDropDownProps) {
   return (
      <Menu>
         <MenuButton as={Flex} bg={'transparent'} cursor={'pointer'}>
            {props.children}
         </MenuButton>
         <MenuList>
            {props.options.map((option, index) => (
               <MenuItem
                  key={index}
                  onClick={option.onClick}
                  textColor={option.color?.textColor || 'initial'}
               >
                  {option.label}
               </MenuItem>
            ))}
         </MenuList>
      </Menu>
   );
}
