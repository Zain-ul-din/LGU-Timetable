import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { ROUTING } from '~/lib/constant';
import { fromFirebaseTimeStamp } from '~/lib/util';
import { UserDataDocType } from '~/types/typedef';

const UserCard = ({ user }: { user: UserDataDocType }) => {
  return (
    <>
      <Link href={ROUTING.admin + '/' + user.email}>
        <Flex
          flexDirection={'column'}
          gap={'0.5rem'}
          justifyContent={'center'}
          alignItems={'center'}
          maxWidth={'150px'}
          minW={'150px'}
          overflowX={'auto'}
          cursor={'pointer'}>
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={user.photoURL as string}
            alt={user.displayName + ' photo_url'}
            width={100}
            height={100}
            style={{
              borderRadius: '0.3rem',
              boxShadow: '2px 2px 10px rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            loading="lazy"
          />

          <Flex flexDirection={'column'}>
            <Text textAlign={'center'}>{user.displayName}</Text>
          </Flex>
          <Flex flexDirection={'column'} fontSize={'xx-small'}>
            <Text textAlign={'center'} color={'blue.400'}>
              {user.email?.split('@')[0]}
            </Text>
          </Flex>
          <Flex flexDirection={'column'} fontSize={'xx-small'}>
            <Text textAlign={'center'}>
              {' '}
              Join At {fromFirebaseTimeStamp(user.createdAt).toDateString()}
            </Text>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default UserCard;
