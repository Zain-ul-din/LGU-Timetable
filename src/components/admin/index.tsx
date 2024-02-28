import { Button, Center, Flex, Input, Spinner, Text } from '@chakra-ui/react';
import { getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    const [lastVisible, setLastVisible] = useState<any>();
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchMore = useCallback(() => {
        if (lastVisible == undefined) return;

        const userQuery = query(
            userColsRef,
            orderBy('createdAt', 'desc'),
            startAfter(lastVisible),
            limit(10)
        );

        setLoading(true);
        getDocs(userQuery).then((userDocs) => {
            setUsers((prevDocs) => [
                ...prevDocs,
                ...(userDocs.docs.map((user) => user.data()) as Array<UserDataDocType>)
            ]);
            setLastVisible(userDocs.docs[userDocs.docs.length - 1]);
            setLoading(false);
        });
    }, [lastVisible]);

    useEffect(() => {
        setLoading(true);

        const getUsers = async () => {
            const userQuery = query(userColsRef, orderBy('createdAt', 'desc'), limit(10));
            const userDocs = await getDocs(userQuery);
            setLastVisible(userDocs.docs[userDocs.docs.length - 1]);
            setUsers(userDocs.docs.map((user) => user.data()) as Array<UserDataDocType>);
        };

        getUsers();
        setLoading(false);
    }, []);

    const fetchAll = useCallback(() => {
        const getUsers = async () => {
            setLoading(true);
            const userQuery = query(userColsRef, orderBy('createdAt', 'desc'));
            const userDocs = await getDocs(userQuery);
            setLastVisible(undefined);
            setUsers(userDocs.docs.map((user) => user.data()) as Array<UserDataDocType>);
            setLoading(false);
        };

        getUsers();
    }, []);

    useEffect(() => {
        if (containerRef.current == null) return;

        const handleScroll = () => {
            const totalHeight = document.body.scrollHeight - 2;
            const sumViewportAndScroll = window.innerHeight + window.scrollY;
            console.log(sumViewportAndScroll, ' >= ', totalHeight);
            if (sumViewportAndScroll >= totalHeight) {
                fetchMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [containerRef, fetchMore, lastVisible]);

    return (
        <Flex
            maxWidth={'1200px'}
            margin={'1rem auto'}
            flexDirection={'column'}
            marginBottom={'36'}
            ref={containerRef}>
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

            <Center gap={4} py={5}>
                <Text>Total Users: {users.length}</Text>
                <Button size={'sm'} variant={'outline'} onClick={fetchAll}>
                    fetch All
                </Button>
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

            {loading && (
                <Center py={10}>
                    <Spinner />
                </Center>
            )}
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
