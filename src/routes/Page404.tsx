import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Page404 () {
    return (
        <Box    
            textAlign="center" py={10} px={6} 
            display = {'flex'} height = {'100vh'} 
            justifyContent = {'center'}
            alignItems = {'center'}
            flexDirection = {'column'}
        >
          <Heading
            display="inline-block"
            as="h1"
            size="4xl"
            bgGradient="linear(to-r, red.400, red.600)"
            backgroundClip="text">
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2} color = {'red.600'}>
            Page Not Found
          </Text>
          <Text color={'gray.400'} mb={6} fontFamily = {'monospace'}>
            The page you're looking for does not seem to exist
          </Text>

            <Link to={'/'}>
                <Button
                    colorScheme="teal"
                    bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                    color="white"
                    variant="solid">
                    Go to Home
                </Button>
            </Link>  
        </Box>
    );
}