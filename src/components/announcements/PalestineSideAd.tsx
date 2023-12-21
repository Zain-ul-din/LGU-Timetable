/* eslint-disable @next/next/no-img-element */
import { CopyIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import useTyperEffect from "~/hooks/useTyperEffect";

const palestineSideDescription = `We built a website that explains part of the Palestine side in English (because there's just a lot of misinformation from the Israeli side and Western media):
It would be amazing if you could share it to increase awareness of what actually happens`

export default function PalestineSideAd ({
    url
}: { url: string }) {

    const { displayText, isTypingComplete } = useTyperEffect({
        text: palestineSideDescription,
        speed: 30,
    });

    const router = useRouter()

    return <Flex width={'100%'} py={'2.5'} px={2}
        justifyContent={'center'} minW={'100%'}
        className="glow" 
    >
        
        <Flex 
            p={3} border={'1px solid var(--border-color)'}
            rounded={'md'}
            flexDir={'column'}
            gap={3}
            w='100%'
            position={'relative'}
        >
            <Flex pos='absolute' bg={'inherit'} width={'100%'} height={'100%'}
                zIndex={-99} rounded={'md'} top={0} right={0} left={0}
                boxShadow={'0px 0px 50px rgba(255,255,255,0.02)'}
            >
                {''}
            </Flex>
            <Text fontSize={'lg'} fontWeight={'bold'}>
                Support Palestine
                <img 
                    src='/images/StandWithPalestine.svg' 
                    alt="support_palestine_banner"
                    style={{
                        display: 'inline',
                        paddingLeft: '0.4rem',
                        transform: 'translateY(4px)'
                    }}
                />
            </Text>
            <Text>
                {displayText}
                {!isTypingComplete ? 
                <BlinkCursor />:<>
                <span style={{ paddingLeft: '0.5rem;',color: 'red'}}> ♥.</span> Alhamdulillah!</>}
            </Text>
            <Flex gap={2}>
                <Button size={'sm'}
                    bgGradient={'linear(to-l, #7928CA, #FF0080)'}
                    _hover={{
                        bgGradient: 'linear(to-l, #7928CA, #FF0080)'
                    }}
                    onClick={()=> {
                        router.push(url);
                    }}
                >
                    Check Out Palestine Side
                </Button>
                <Button size={'sm'} variant={'outline'}
                    onClick={()=> {
                        navigator.share({
                            title: 'The Palestine Side',
                            text: palestineSideDescription,
                            url: 'https://www.palestineside.site/'
                        })
                    }}
                >
                    <CopyIcon /> Share
                </Button>
            </Flex>
        </Flex>
    </Flex>
}


const BlinkCursor = ()=> {
    return <Flex height={'1rem'}
        display={'inline-block'}
        alignItems={'center'}
        style={{
            transform: 'translateY(0.3rem)'
        }}
        mx={'2px'}
    >
        <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ 
                repeat: Infinity, duration: 1,
                repeatDelay: 0.1, 
                ease: 'linear'
            }}
            style={{
                background: 'white',
                width: '0.7rem',
                height: '0.7rem',
                borderRadius: '50%',
                transformOrigin: '50% 50%'
            }}
            >
            {' '}
        </motion.div>
    </Flex> 
}
