import { Flex, Input } from '@chakra-ui/react';
import { doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { apiAnalysisCol, userColsRef } from '~/lib/firebase';
import { UserDataDocType } from '~/types/typedef';
import Loader from '../design/Loader';
import UserCard from './UserCard';

export default function DeveloperMembers() {
  const [members, setMembers] = useState<UserDataDocType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [userSearch, setUserSearch] = useState<string>('');

  useEffect(() => {
    const fetchApiDocs = async () => {
      setLoading(true);
      const res = await getDocs(apiAnalysisCol);
      const members = await Promise.all(
        Array.from(new Set(res.docs.map((res) => res.data().email))).map((email) => {
          return getDoc(doc(userColsRef, email));
        })
      );
      setMembers(members.map((doc) => doc.data()) as UserDataDocType[]);
      setLoading(false);
    };

    fetchApiDocs();
  }, []);

  return (
    <Flex maxWidth={'1200px'} margin={'1rem auto'} flexDirection={'column'} marginBottom={'36'}>
      {(loading || members.length == 0) && (
        <Flex width={'100%'} justifyContent={'center'}>
          <Loader>Loading Members...</Loader>
        </Flex>
      )}

      <Input
        placeholder="Search User"
        value={userSearch}
        onChange={(e) => {
          setUserSearch(e.target.value);
        }}
      />

      <Flex flexWrap={'wrap'} py={6} gap={'1rem'} justifyContent={'center'} alignItems={'center'}>
        {members
          .filter(
            (user) =>
              user.email?.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase()) ||
              user.displayName?.toLocaleLowerCase().includes(userSearch.toLocaleLowerCase())
          )
          .map((user, idx) => {
            return <UserCard user={user} key={idx} />;
          })}
      </Flex>
    </Flex>
  );
}
