import Image from 'next/image';
import { UserDocType } from '~/lib/firebase_doctypes';
import styles from '~/styles/profile.module.css';
import {
    Flex,
    Heading,
    useMediaQuery,
    Text,
    Link,
    Box,
    Center,
    Button as Btn
} from '@chakra-ui/react';
import PremiumButton from './PremiumButton';
import { signOut } from 'firebase/auth';
import { firebase, timetableHistoryCol, userColsRef } from '~/lib/firebase';
import Button from './Button';
import { useEffect, useState } from 'react';
import {
    doc,
    getDocs,
    increment,
    limit,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import { ITimetableHistory } from '~/types/typedef';
import { removeDuplicateTimetableHistory } from '~/lib/util';
import Loader from './Loader';
import { TimeIcon } from '@chakra-ui/icons';
import { STAR_RATING } from '~/lib/constant';

export default function UserProfile({
    user,
    adminView
}: {
    user: UserDocType;
    adminView?: boolean;
}) {
    const [isUnder600] = useMediaQuery('(max-width: 600px)');
    const [loading, setLoading] = useState({
        updateToPro: false
    });

    const setProUser = (state: boolean) => {
        const user_doc = doc(userColsRef, `${user.email as string}`);
        setLoading({ ...loading, updateToPro: true });
        updateDoc(user_doc, {
            pro: state
        }).then(() => setLoading({ ...loading, updateToPro: false }));
    };

    return (
        <>
            <div className={styles.profile + ' roboto'}>
                <h1>PROFILE</h1>
                <div className={styles.credentials}>
                    
                    {/* eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                        src={user.photoURL as string}
                        alt="user_photo"
                        width={150}
                        height={150}
                        style={{ maxWidth: '150px', maxHeight: '150px' }}
                    />
                    
                    <div style={{ paddingBottom: '1rem' }}>
                        {user.pro && !adminView && (
                            <Flex width={'100%'} justifyContent={isUnder600 ? 'center' : 'initial'}>
                                <PremiumButton size={'sm'}>👑 Pro User</PremiumButton>
                            </Flex>
                        )}

                        {adminView && (
                            <>
                                <Flex
                                    width={'100%'}
                                    justifyContent={isUnder600 ? 'center' : 'initial'}>
                                    {!user.pro ? (
                                        <PremiumButton
                                            size={'sm'}
                                            isLoading={loading.updateToPro}
                                            onClick={() => setProUser(true)}>
                                            👑 Update to Pro User
                                        </PremiumButton>
                                    ) : (
                                        <Btn
                                            size={'sm'}
                                            colorScheme="red"
                                            variant={'outline'}
                                            isLoading={loading.updateToPro}
                                            onClick={() => setProUser(false)}>
                                            Demote to User
                                        </Btn>
                                    )}
                                </Flex>
                            </>
                        )}

                        <h1>{user.displayName}</h1>
                        <p style={{ textAlign: 'center' }}>Email: {user.email}</p>

                        {adminView && user.rating && (
                            <p>Feedback: {STAR_RATING[user.rating - 1].toLocaleUpperCase()}</p>
                        )}

                        {!adminView && (
                            <Button
                                onClick={(e) => {
                                    signOut(firebase.firebaseAuth);
                                }}>
                                SignOut
                            </Button>
                        )}
                    </div>
                </div>
                {user && <History user={user} adminView={adminView} />}
            </div>
        </>
    );
}

interface IHistoryDocStateType extends ITimetableHistory {
    docId: string;
}

const History = ({ user, adminView }: { user: UserDocType; adminView?: boolean }) => {
    const [showHistory, SetShowHistory] = useState<boolean>(false);

    if (!showHistory)
        return (
            <Center mt={'2rem'}>
                <Btn variant={'outline'} onClick={() => SetShowHistory(true)}>
                    <TimeIcon mx={'0.5rem'} />
                    Show History
                </Btn>
            </Center>
        );

    return <HistoryComponent user={user} adminView={adminView} />;
};

const HistoryComponent = ({ user, adminView }: { user: UserDocType; adminView?: boolean }) => {
    const [isUnder600] = useMediaQuery('(max-width: 600px)');
    const [history, setHistory] = useState<Array<IHistoryDocStateType>>([]);
    const [queryCounts, SetQueriesCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        const fetchTimetableHistory = async () => {
            const timetableHistoryQuery = query(
                timetableHistoryCol,
                limit(50),
                where('email', '==', user?.email),
                orderBy('createdAt', 'desc')
            );

            const admin_timetableHistoryQuery = query(
                timetableHistoryCol,
                where('email', '==', user.email),
                orderBy('createdAt', 'desc')
            );

            setLoading(true);
            const timetableHistoryDocs = await getDocs(
                adminView ? admin_timetableHistoryQuery : timetableHistoryQuery
            );
            setLoading(false);
            const res = timetableHistoryDocs.docs.map((historyDoc) => ({
                docId: historyDoc.id,
                ...historyDoc.data()
            }));

            SetQueriesCount(
                res.reduce((prev, curr) => {
                    let count = (curr as any).clickCount || 0;
                    count += 1;
                    return prev + count;
                }, 0)
            );
            setHistory(res as Array<IHistoryDocStateType>);
        };

        fetchTimetableHistory();
    }, []);

    if (loading) return <Loader>Loading History</Loader>;

    return (
        <>
            <Flex
                paddingY={'2rem'}
                justifyContent={isUnder600 ? 'center' : 'flex-start'}
                flexDirection={'column'}
                borderBottom={'1px solid var(--border-color)'}
                borderTop={'1px solid var(--border-color)'}
                marginBottom={'1.5rem'}>
                <Heading className="roboto" fontWeight={'thin'} fontSize={'3xl'} padding={'1rem'}>
                    {`Timetable History`.toUpperCase()}
                </Heading>
                <Text textAlign={'center'} textColor={'InfoText'}>
                    {history.length == 0 && <>No history found</>}
                </Text>
                <Flex
                    flexDirection={'column'}
                    padding={isUnder600 ? '0.5rem' : '1rem'}
                    gap={'0.5rem'}>
                    {removeDuplicateTimetableHistory(history).map((history, idx) => {
                        return (
                            <Link
                                href={`/timetable/${history.payload.fall?.replace('/', '-')} ${
                                    history.payload.semester
                                } ${history.payload.section}`}
                                key={idx}
                                onClick={() => {
                                    const historyDoc = doc(
                                        timetableHistoryCol,
                                        (history as IHistoryDocStateType).docId
                                    );
                                    updateDoc(historyDoc, {
                                        clickCount: increment(1)
                                    });
                                }}>
                                <Box
                                    background={'var(--card-color-dark)'}
                                    padding={'1rem'}
                                    textAlign={'center'}
                                    borderRadius={'base'}
                                    cursor={'pointer'}
                                    _hover={{
                                        border: '1px solid var(--border-color)',
                                        background: 'var(--card-color)'
                                    }}>
                                    {history.payload.fall?.replace('/', '-')} /{' '}
                                    {history.payload.semester} / {history.payload.section}
                                </Box>
                            </Link>
                        );
                    })}
                </Flex>
                <Center>
                    <Text fontSize={'md'} fontFamily={'monospace'} color={'whatsapp.300'}>
                        Total Potential Queries: {queryCounts}
                    </Text>
                </Center>
            </Flex>
        </>
    );
};
