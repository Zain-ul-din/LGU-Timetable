import { Center, Flex, Input, Text } from '@chakra-ui/react';
import { getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { userColsRef } from '~/lib/firebase';
import { UserDataDocType } from '~/types/typedef';
import Loader from '../design/Loader';
import Image from 'next/image';
import { fromFirebaseTimeStamp } from '~/lib/util';
import Link from 'next/link';
import { ROUTING } from '~/lib/constant';

export default function Admin() {
    const [loading, setLoading] = useState<boolean>();
    const [users, setUsers] = useState<Array<UserDataDocType>>([]);
    const [userSearch, setUserSearch] = useState<string>('');

    useEffect(() => {
        setLoading(true);

        const getUsers = async () => {
            const userQuery = query(userColsRef, orderBy('createdAt', 'desc'));
            const userDocs = await getDocs(userQuery);

            setUsers(userDocs.docs.map((user) => user.data()) as Array<UserDataDocType>);
            console.log(users);
        };

        getUsers();
        setLoading(false);
    }, []);

    return (
        <Flex maxWidth={'1200px'} margin={'0 auto'} flexDirection={'column'} marginBottom={'36'}>
            {(loading || users.length == 0) && (
                <Flex width={'100%'} justifyContent={'center'}>
                    <Loader>Loading Users...</Loader>
                </Flex>
            )}
            <Input
                placeholder="Search User"
                value={userSearch}
                onChange={(e) => {
                    setUserSearch(e.target.value);
                }}
            />

            <Center>
                <Text>Total Users: {users.length}</Text>
            </Center>

            <Flex flexWrap={'wrap'} gap={'1rem'} justifyContent={'center'} alignItems={'center'}>
                {users
                    .filter(
                        (user) =>
                            user.email
                                ?.toLocaleLowerCase()
                                .includes(userSearch.toLocaleLowerCase()) ||
                            user.displayName
                                ?.toLocaleLowerCase()
                                .includes(userSearch.toLocaleLowerCase())
                    )
                    .map((user, idx) => {
                        return <UserRenderer user={user} key={idx} />;
                    })}
            </Flex>
        </Flex>
    );
}

const UserRenderer = ({ user }: { user: UserDataDocType }) => {
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
                    <Image
                        src={user.photoURL as string}
                        alt={user.displayName + ' photo_url'}
                        width={100}
                        height={100}
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
