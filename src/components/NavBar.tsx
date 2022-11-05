import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

/**
 * Renders Header
 * @returns JSX.Element
 */
export default function NavBar (): JSX.Element {

   	const { colorMode, toggleColorMode } = useColorMode();

  	return (
    	<>
      		<Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} mb = {5}>
        		<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          			
				{/* LOGO */}
				<Box fontFamily={'sans-serif'} fontSize = {'1xl'}>
          		  LGU TIME TABLE
          		</Box>

          		<Flex alignItems={'center'}>
            		<Stack direction={'row'} spacing={7}>
              			
						<Button onClick={toggleColorMode}>
              			  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              			</Button>

						{/* Drop down Menu */}
            			<Menu>
                			<MenuButton
                			  as={Button}
                			  rounded={'full'}
                			  variant={'link'}
                			  cursor={'pointer'}
                			  minW={0}
							>
                			  	<Avatar 
							  		size={'sm'} 
							  		src={'https://avatars.dicebear.com/api/male/username.svg'}
                			  	/>
							</MenuButton>

							{/* Menu Options */}
                			<MenuList alignItems={'center'}>
								<br />

								<Center>
                					<Avatar
                					  size={'2xl'}
                					  src={'https://avatars.dicebear.com/api/male/username.svg'}
                					/>
                				</Center><br />

								<Center>
            						<p>Anonymous</p>
          						</Center><br />
								<MenuDivider />

          						<MenuItem>About US</MenuItem>
          						<MenuItem>Contribute</MenuItem>
          						<MenuItem>Logout</MenuItem>

        					</MenuList>
        				</Menu>

        			</Stack>
    	    	</Flex>
    		</Flex>
       </Box>
    </>
  );
}
