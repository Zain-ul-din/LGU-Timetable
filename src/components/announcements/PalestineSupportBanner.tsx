import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

// [![ReadMeSupportPalestine]()](https://github.com/Safouene1/support-palestine-banner)

interface PalestineSupportBannerProps 
{
    hideMessage?: boolean
}

export default function PalestineSupportBanner (props: PalestineSupportBannerProps)
{
    return <Flex p={2} borderBottom={'1px solid var(--border-color)'} bg={'var(--card-color-dark)'} position={'relative'}
        justifyContent={'center'} flexDir={'column'} alignItems={'center'}
    >
        {!props.hideMessage && 
        <Text>
            <Text display={'inline'} mr={2} fontWeight={'bold'} 
                fontSize={'xl'} color={'transparent'}
                background= {`#007A4D`}
                backgroundClip= {'text'}
            >
                Free Palestine 
            </Text>
            {`Stand for humanity! Palestine has a right to defend itself. Together, we can put an end to the Gaza genocide. let's unite to`}
            <Text display={'inline'} mx={2} fontWeight={'bold'} color={'#007A4D'}>
                #SAVEGAZA
            </Text>
            and ensure that every life in this region has access to the most basic necessities.
        </Text>}
        <Flex position={'absolute'} top={-5}  bg='transparent' width={'100%'} height={'1'}
            boxShadow={'0px 0px 50px rgba(255,255,255,0.1)'}
        >
            {' '}
        </Flex>
        <Image src={'/images/StandWithPalestine.svg'} alt="stand with palestine" width={200} height={100} />
    </Flex>
}

