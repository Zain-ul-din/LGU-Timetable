import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

export default function DarkTheme() {
    const { setColorMode } = useColorMode();
    useEffect(() => {
        setColorMode('dark');
    }, []);

    return <></>;
}
