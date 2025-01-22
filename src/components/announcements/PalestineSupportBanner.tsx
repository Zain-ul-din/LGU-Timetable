import { Flex, Text, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
// [![ReadMeSupportPalestine]()](https://github.com/Safouene1/support-palestine-banner)

interface PalestineSupportBannerProps {
  hideMessage?: boolean;
}

// const quranicVerses = [
//   'For those who give in charity, men and women, and loan to Allah a beautiful loan, it shall be increased manifold (to their credit), and they shall have (besides) a liberal reward.',
//   'The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains. And Allah multiplies [His reward] for whom He wills. And Allah is all-Encompassing and Knowing.',
//   'You will never attain righteousness until you spend in charity from that what you love.'
// ];

export default function PalestineSupportBanner(props: PalestineSupportBannerProps) {
  const [isUnder600] = useMediaQuery('(max-width: 600px)');
  // const [verseIndex] = useState(() => (Math.random() * quranicVerses.length) | 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100%',
        padding: '0.5rem 0.5rem',
        background: 'hsl(0, 0%, 11%)'
      }}>
      <a
        href="https://alkhidmat.org/appeal/emergency-appeal-palestine-save-lives-in-gaza-today"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: '0.3rem'
        }}>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
          <img
            src="/images/palestine_flag.png"
            style={{
              borderRadius: '10%'
            }}
          />
          <h1
            style={{
              fontSize: isUnder600 ? '0.7rem' : '1rem'
            }}>
            Lets Rebuild Gaza X
            <span
              style={{
                textDecoration: 'underline',
                // move underline little bit downwards
                textUnderlineOffset: '0.2rem',
                margin: '0 0.4rem'
              }}>
              Al Khidmat Foundation
            </span>
          </h1>
        </div>
        {/* {!props.hideMessage && (
          <div
            style={{
              fontSize: isUnder600 ? '0.8rem' : '0.85rem',
              color: 'var(--muted-text)',
              textAlign: 'center',
              fontStyle: 'italic'
            }}>
            {'"' + quranicVerses[verseIndex] + '"'} -- {'Al-Qur’an'}
          </div>
        )} */}
      </a>
    </motion.div>
  );

  return (
    <Flex
      p={2}
      borderBottom={'1px solid var(--border-color)'}
      bg={'var(--card-color-dark)'}
      position={'relative'}
      justifyContent={'center'}
      flexDir={'column'}
      alignItems={'center'}>
      {!props.hideMessage && (
        <Text>
          <Text
            display={'inline'}
            mr={2}
            fontWeight={'bold'}
            fontSize={'xl'}
            color={'transparent'}
            background={`#007A4D`}
            backgroundClip={'text'}
            as={'span'}>
            Free Palestine
          </Text>
          {`Stand for humanity! Palestine has a right to defend itself. Together, we can put an end to the Gaza genocide. let's unite to`}
          <Text display={'inline'} mx={2} fontWeight={'bold'} color={'#007A4D'}>
            #SAVEGAZA
          </Text>
          and ensure that every life in this region has access to the most basic necessities.
        </Text>
      )}

      <Flex
        position={'absolute'}
        top={-5}
        bg="transparent"
        width={'100%'}
        height={'1'}
        boxShadow={'0px 0px 50px rgba(255,255,255,0.1)'}
        as={'span'}>
        {' '}
      </Flex>
      <Link href={'/announcements/support_palestine'}>
        <Image
          src={'/images/StandWithPalestine.svg'}
          alt="stand with palestine"
          width={200}
          height={100}
        />
      </Link>

      <Link href={`/discussions?active_route=View&discussion_id=sxEYysWe4NpZcaHXaZyN`}>
        <Text mt={3} textDecoration={'underline'} color={'blue.200'} fontSize={'sm'}>
          How can i help Palestine?
        </Text>
      </Link>
    </Flex>
  );
}
