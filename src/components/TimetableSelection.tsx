import styles from '~/styles/timetableselection.module.css';
import { motion } from 'framer-motion';
import { Ubuntu, Oxygen } from 'next/font/google';

const ubuntu = Ubuntu({ subsets: ['latin'], weight: '500' });
const oxygen = Oxygen({ subsets: ['latin'], weight: '300' });

import handleGlowBlob from '~/lib/glow';

export default function TimetableSelection({ metaData }: { metaData: any }) {
  const [isUnder400] = useMediaQuery('(max-width: 450px)');

  return (
    <div className={styles.selection}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className={`box-shadow ${metaData && 'glow glow_xl'}`}
        onMouseMove={(e) => handleGlowBlob(e)}>
        <h1 className={ubuntu.className} style={{ fontSize: isUnder400 ? '1.5rem' : '' }}>
          Timetable Selection
        </h1>
        <Selection metaData={metaData} />
      </motion.div>
    </div>
  );
}

import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Text, Button, useMediaQuery, Input, Divider } from '@chakra-ui/react';
import { MenuStyle, TabStyle, Transitions } from '~/styles/Style';
import {
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore';

const tabTitles = ['Semester', 'Program', 'Section'];

import { useRouter } from 'next/router';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { doc, setDoc } from 'firebase/firestore';
import { timetableHistoryCol } from '~/lib/firebase';
import { ITimetableHistory, TimetableInput } from '~/types/typedef';
import { removeDuplicateTimetableHistory } from '~/lib/util';
import Link from 'next/link';
import Fuse from 'fuse.js';
import ViewLinkTxt from './design/ViewLinkTxt';
import { ROUTING } from '~/lib/constant';
import { hashStr } from '~/lib/cipher';

function Selection({ metaData }: { metaData: any }): JSX.Element {
  const [userInput, setUserInput] = useState<TimetableInput>({
    fall: null,
    semester: null,
    section: null
  });
  const [currTabIdx, setCurrTabIdx] = useState<number>(0);
  const [history, setHistory] = useState<Array<ITimetableHistory>>([]);

  const user = useContext(UserCredentialsContext);
  const router = useRouter();

  const [isUnder400] = useMediaQuery('(max-width: 400px)');

  useEffect(() => {
    if (!user?.user) return;
    const fetchTimetableHistory = async () => {
      const timetableHistoryQuery = query(
        timetableHistoryCol,
        limit(50),
        where('email', '==', user.user?.email),
        orderBy('createdAt', 'desc')
      );
      const timetableHistoryDocs = await getDocs(timetableHistoryQuery);
      const res = timetableHistoryDocs.docs.map((historyDoc) => ({
        docId: historyDoc.id,
        ...historyDoc.data()
      }));

      setHistory(res as any);
    };

    fetchTimetableHistory();
  }, [user]);

  return (
    <>
      <Transitions.SlideFade in={true}>
        <Flex
          outline={1}
          justifyContent={'center'}
          alignItems={'center'}
          p={isUnder400 ? 1 : 5}
          borderWidth={'0px'}
          borderTopWidth={'0.05px'}
          borderBottomWidth={'0.05px'}
          borderColor={'gray.500'}
          flexDir={'column'}
          className={oxygen.className}>
          <Flex justifyContent={'center'}>
            <ViewLinkTxt href={ROUTING.clash_resolver}>Timetable Clash Resolver</ViewLinkTxt>
          </Flex>

          {history.length > 0 && (
            <Flex marginY={'1rem'} flexDirection={'column'}>
              <HistoryDropDown menuItems={removeDuplicateTimetableHistory(history)} />
            </Flex>
          )}

          <Text fontSize={{ base: '1xl', md: '2xl', lg: '3xl' }} fontWeight={'light'}>
            {`Select ${tabTitles[currTabIdx]}`.toLocaleUpperCase()}
          </Text>

          <TabStyle.Tabs index={currTabIdx} onChange={setCurrTabIdx}>
            <TabStyle.TabList>
              <TabStyle.Tab>Semester</TabStyle.Tab>
              <TabStyle.Tab isDisabled={userInput.fall == null}>Program</TabStyle.Tab>
              <TabStyle.Tab isDisabled={userInput.semester == null}>Section</TabStyle.Tab>
            </TabStyle.TabList>

            {/* Panels */}
            <TabStyle.TabPanels justifyContent={'center'}>
              <TabStyle.TabPanel textAlign={'center'}>
                <DropDown
                  defautlSelectedItem={'choose semester'}
                  menuItems={Object.keys(metaData)}
                  onClick={(
                    selectedItem: string,
                    setSelectedItem: React.Dispatch<React.SetStateAction<string>>
                  ) => {
                    setUserInput(
                      Object.assign(userInput, {
                        semester: null
                      })
                    );
                    setUserInput(
                      Object.assign(userInput, {
                        fall: selectedItem
                      })
                    );
                    setSelectedItem(selectedItem);
                    setCurrTabIdx(1);
                  }}
                />
              </TabStyle.TabPanel>

              <TabStyle.TabPanel textAlign={'center'}>
                <Transitions.SlideFade in={currTabIdx == 1}>
                  {userInput.fall != null && (
                    <DropDown
                      defautlSelectedItem={'choose program'}
                      menuItems={Object.keys(metaData[userInput.fall])}
                      onClick={(
                        selectedItem: string,
                        setSelectedItem: React.Dispatch<React.SetStateAction<string>>
                      ) => {
                        setUserInput(
                          Object.assign(userInput, {
                            section: null
                          })
                        );
                        setUserInput(
                          Object.assign(userInput, {
                            semester: selectedItem
                          })
                        );
                        setSelectedItem(selectedItem);
                        setCurrTabIdx(2);
                      }}
                    />
                  )}
                </Transitions.SlideFade>
              </TabStyle.TabPanel>

              <TabStyle.TabPanel textAlign={'center'}>
                <Transitions.SlideFade in={currTabIdx == 2}>
                  {userInput.fall != null && userInput.semester != null && (
                    <DropDown
                      defautlSelectedItem={'choose section'}
                      menuItems={metaData[userInput.fall][userInput.semester]}
                      onClick={(
                        selectedItem: string,
                        setSelectedItem: React.Dispatch<React.SetStateAction<string>>
                      ) => {
                        setUserInput(
                          Object.assign(userInput, {
                            section: selectedItem
                          })
                        );
                        setSelectedItem(selectedItem);
                        const { fall, section, semester } = userInput;

                        if (user?.user) {
                          setDoc(doc(timetableHistoryCol), {
                            payload: userInput,
                            email: user.user.email,
                            createdAt: serverTimestamp()
                          });
                        }
                        const hash = hashStr(`${fall} ${semester} ${section}`.replaceAll('/', ''));
                        console.log(
                          `${fall} ${semester} ${section}`.replaceAll('/', ''),
                          ' ~ ',
                          hash
                        );
                        router.push(`/timetable/${hash}`);
                      }}
                    />
                  )}
                </Transitions.SlideFade>
              </TabStyle.TabPanel>
            </TabStyle.TabPanels>
          </TabStyle.Tabs>
        </Flex>
      </Transitions.SlideFade>
    </>
  );
}

type onClickCallBack = (
  selectedItem: string,
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
) => void;

function DropDown({
  defautlSelectedItem,
  menuItems,
  onClick,
  useInitialFocus
}: {
  defautlSelectedItem: string;
  menuItems: Array<string> | null;
  onClick: onClickCallBack;
  useInitialFocus?: boolean;
}): JSX.Element {
  const [selectedItem, setSelectedItem]: [string, React.Dispatch<React.SetStateAction<string>>] =
    useState<string>(defautlSelectedItem);

  const [filterItems, setFilterItems] = useState<string[]>(menuItems as string[]);
  const searchRef = useRef<any>(null);
  const [query, setQuery] = useState<string>('');

  const fuse = new Fuse(menuItems as string[], {
    threshold: 0.3
  });

  //const lastElementRef = useRef<any>(null);

  return (
    <Transitions.SlideFade in={true}>
      <MenuStyle.Menu
        preventOverflow={true}
        initialFocusRef={useInitialFocus ? searchRef : undefined}>
        <MenuStyle.MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          textOverflow={'clip'}
          fontSize={{ base: 'xs', sm: 'md', lg: 'md' }}>
          {selectedItem}
        </MenuStyle.MenuButton>
        <MenuStyle.MenuList
          className="dropDown"
          overflowY={'scroll'}
          maxH={'80'}
          maxW={'98vw'}
          m={'0.5rem'}>
          {filterItems &&
            filterItems?.map(
              (item: string, idx: number): JSX.Element => (
                <Fragment key={idx}>
                  <MenuStyle.MenuItem
                    onClick={(e) => {
                      setQuery('');
                      setFilterItems(menuItems as string[]);
                      onClick(item, setSelectedItem);
                    }}
                    // marginTop={idx == 0 ? '3rem' : 'initial'}
                  >
                    {item}
                  </MenuStyle.MenuItem>
                  <Divider />
                </Fragment>
              )
            )}
        </MenuStyle.MenuList>
      </MenuStyle.Menu>
    </Transitions.SlideFade>
  );
}

function HistoryDropDown({ menuItems }: { menuItems: Array<ITimetableHistory> }): JSX.Element {
  return (
    <Transitions.SlideFade in={true}>
      <MenuStyle.Menu preventOverflow={true}>
        <MenuStyle.MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          textOverflow={'clip'}
          fontSize={{ base: 'xs', sm: 'md', lg: 'md' }}>
          {'Previous Selection History'}
        </MenuStyle.MenuButton>
        <MenuStyle.MenuList
          className="dropDown"
          overflowY={'scroll'}
          maxH={'80'}
          maxW={'98vw'}
          m={'0.5rem'}>
          {menuItems &&
            menuItems?.map(
              ({ payload, email, createdAt, docId }: any, idx: number): JSX.Element => (
                <Link
                  key={idx}
                  href={
                    '/timetable/' +
                    hashStr(
                      `${payload.fall} ${payload.semester} ${payload.section}`.replaceAll('/', '')
                    )
                  }
                  onClick={() => {
                    const historyDoc = doc(timetableHistoryCol, docId);
                    updateDoc(historyDoc, {
                      clickCount: increment(1)
                    });
                  }}>
                  <MenuStyle.MenuItem>
                    {`${payload.fall?.replace('/', '-')}  ${payload.semester}  ${payload.section}`}
                  </MenuStyle.MenuItem>
                  <Divider />
                </Link>
              )
            )}
        </MenuStyle.MenuList>
      </MenuStyle.Menu>
    </Transitions.SlideFade>
  );
}
