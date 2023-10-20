import { Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function SupportPalestine () 
{
    return <Flex justifyContent={'center'} alignItems={'center'} flexDir={'column'} p={4} gap={10}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>#Free Palestine</Text>
        <Link href={'https://github.com/Zain-ul-din/The-Palestinian-Side/issues/1'}>
            <img 
                src={'/images/palestine_banner.svg'}
                alt="Stand With Palestine Card"
                style={{ borderRadius: '0.5rem'}}
            />
        </Link>

        <Link href={'https://github.com/Zain-ul-din/The-Palestinian-Side/issues/1'}>
            <img 
                src={'/images/palestine-banner-support.svg'}
                alt="Stand With Palestine Card"
                style={{ borderRadius: '0.5rem'}}
            />
        </Link>

        <Link href={'https://www.lgutimetable.live/discussions?active_route=View&discussion_id=sxEYysWe4NpZcaHXaZyN'}>
            <Button variant={'outline'}>
                Contribute
            </Button>
        </Link>
    </Flex>
}
