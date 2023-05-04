import { Box, Flex, Heading, Icon, Input, Text } from "@chakra-ui/react"

import { LinkIcon, TimeIcon } from "@chakra-ui/icons"
import { useState } from "react"

import Fuse from "fuse.js"
import { motion } from "framer-motion"

import { ROUTING } from "~/lib/constant"
import Link from "next/link"
import { useRouter } from "next/router"

export default function TeacherTimetableSelection (
    { teachers } : { teachers: Array<string> }
)
{
    const router = useRouter()
    const [filterTeachers, setFilterTeachers] = useState<Array<string>>(teachers.sort())
    const [searchQuery, setSearchQuery] = useState<string>('');

    const fuse = new Fuse(teachers, {
        threshold: 0.3
    })

    return <>
        <Flex
            justifyContent={'center'} 
            padding={'2rem'}
            maxWidth={'1200px'} 
            margin={'0 auto'} 
            flexDirection={'column'} 
            marginBottom={'36'}
            gap={'1rem'}
        >
            <Heading as = {'h1'}>
                <Icon mr = {3} style={{transform: 'TranslateY(-6px)'}}>
                    <TimeIcon/>
                </Icon>
                <Box
                    bgClip='text'
                    display={'inline'}
                    className="gradient-heading"
                >
                    Teachers Timetable 
                </Box>
            </Heading>
            
            <div>
            <Text fontFamily={'monospace'} my ={2}
            >Type to search teacher name</Text>
            <Input placeholder="Enter teacher name" className="roboto" value={searchQuery} onChange={(e)=> {
                setSearchQuery(e.target.value)
                const results = fuse.search(e.target.value);
                setFilterTeachers(results.map(val => val.item))

                if (e.target.value == "")
                    setFilterTeachers(teachers.sort())
            }}/>
            </div>
            {filterTeachers
            .map((val, key)=>{
                return <Flex
                    onClick={(e)=> router.push(`${ROUTING.teachers}/${val}`)}
                    className="roboto"
                    key = {key} 
                    bg= {'var(--card-color)'} py = {'0.5rem'} px= {'1rem'}
                    border = {'1px solid var(--border-color)'}
                    _hover={{bg: 'var(--card-dark-color)'}}
                    rounded={'sm'}
                    cursor={'pointer'}
                >
                        <motion.div
                            initial = {{opacity: 0}}
                            animate = {{ opacity: 1}}
                            transition={{duration: Math.random() * 0.5, delay: ((Math.random() * 1.5) % 1) }}
                            >
                            <Icon style={{ transform: 'TranslateY(-2px)'}} mx = {'6px'}>
                             <LinkIcon/>
                            </Icon> {val} 
                        </motion.div>
                </Flex>
            })}
        </Flex>
    </>
}
