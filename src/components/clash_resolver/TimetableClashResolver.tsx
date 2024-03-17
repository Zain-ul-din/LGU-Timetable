import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useMediaQuery
} from '@chakra-ui/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SubjectObjectVal, SubjectOjectType } from '~/types/typedef';
import CourseCard from './CourseCard';
import TimeClashResolverIntro from './TimeClashResolverInto';
import CourseCart from './CourseCart';
import { findCoursesTimeConflicts } from '~/lib/util';
import { HttpClient } from '~/lib/httpclient';
import { APIS_ENDPOINTS } from '~/lib/constant';
import Loader from '../design/Loader';
import LoadingOverlay from './LoadingOverlay';
import usePagination from '~/hooks/usePagination';
import Pagination from '../design/Pagination';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  Item
} from '@choc-ui/chakra-autocomplete';

const PaginationConfig = {
  MAX_CARD_PER_PAGE: 10
};

export default function TimetableClashResolver() {
  const [loading, setLoading] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<SubjectOjectType>({});
  const [filter, setFilter] = useState<string>('');

  const allClasses = useMemo(() => {
    return Array.from(new Set(Object.values(subjects).map((sub) => sub.url_id)));
  }, [subjects]);

  const [selectedClass, setSelectedClass] = useState<string>('');

  useEffect(() => {
    const getSubjects = async () => {
      const httpClient = new HttpClient<SubjectOjectType>(APIS_ENDPOINTS.Util_Cache, (res) => {
        setLoading(false);
        setSubjects(res.data);
      });

      httpClient.get();
    };

    getSubjects();
  }, []);

  const [subjectLoading, setSubjectLoading] = useState<boolean>(false);

  const visibleSubjectsCount = useMemo<number>(
    () =>
      Object.keys(subjects).filter((e) => e.toLowerCase().includes(filter.toLowerCase())).length,
    [subjects, filter]
  );

  const handleCartAdd = useCallback(
    (subjName: string) => {
      setSubjectLoading(true);
      setSubjects((state) => {
        return {
          ...state,
          [subjName]: { ...state[subjName], isInCart: true, conflicts: {} }
        };
      });
    },
    [setSubjects]
  );

  const handleCartRemove = useCallback(
    (subjName: string) => {
      setSubjectLoading(true);
      setSubjects((s) => {
        return { ...s, [subjName]: { ...s[subjName], isInCart: false, conflicts: {} } };
      });
    },
    [setSubjects]
  );

  useEffect(() => {
    if (!subjectLoading) return;

    const stateAsync = async () => {
      await new Promise((resolve) => {
        setSubjects((newState) => findCoursesTimeConflicts(newState));
        resolve(true);
      }).then((val) => {
        setSubjectLoading((newState) => false);
      });
    };

    stateAsync();
  }, [subjectLoading, subjects, setSubjects]);

  const subjectsToEntries = useMemo(
    () =>
      Object.entries(subjects).filter(([key, val]) => {
        const fullText = (key + ' ' + val).replaceAll('  ', ' ');
        return fullText.toLowerCase().includes(filter.toLowerCase());
      }),
    [subjects, filter]
  );

  const [subjectToShow, paginationIndices, activePageIdx, setActivePaginationIdx] = usePagination(
    subjectsToEntries,
    PaginationConfig.MAX_CARD_PER_PAGE
  );

  // reset pagination on search
  useEffect(() => setActivePaginationIdx(1), [filter, setActivePaginationIdx]);
  const [isMdScreen] = useMediaQuery('(max-width: 600px)');

  const inputRef = useRef<HTMLInputElement>(null);

  const focusOnInput = useCallback(() => {
    const id = setTimeout(() => {
      if (!inputRef.current) return;
      inputRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }, 400);

    return () => clearTimeout(id);
  }, [inputRef]);

  return (
    <>
      <CourseCart
        focusInputCb={focusOnInput}
        removeCartItemHandle={handleCartRemove}
        subjects={subjects}
      />

      {subjectLoading && <LoadingOverlay />}

      <Flex
        maxW={'1200px'}
        m={'0 auto'}
        py={'2'}
        justifyContent={'center'}
        flexDir={'column'}
        gap={5}>
        <TimeClashResolverIntro />

        {/* search input */}
        <Box px={5}>
          <Text fontWeight={'bold'} my={1}>
            Search Courses: {visibleSubjectsCount} found
          </Text>
          <Stack>
            <Input
              ref={inputRef}
              size={'md'}
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              placeholder="Enter Course Name"
            />

            {/* <AutoCompleteSearch
              options={allClasses}
              placeholder="Select Class (Optional)"
              onSelectOption={(e) => {
                setSelectedClass(e.item.value);
              }}
              title="Select Class"
              value={selectedClass}
              error=""
            /> */}
          </Stack>
        </Box>

        {loading && <Loader>Please wait fetching subjects data</Loader>}

        {/* courses list */}
        <Flex flexDir={'column'} px={5} gap={3}>
          {subjectToShow.map(([subjName, subj]: [string, SubjectObjectVal], i) => {
            return (
              <CourseCard
                key={i}
                name={subjName}
                subject={subj}
                onAdd={handleCartAdd}
                onRemove={handleCartRemove}
              />
            );
          })}
        </Flex>
        {!loading && (
          <>
            {' '}
            <Flex justifyContent={isMdScreen ? 'center' : 'flex-end'} flexWrap={'wrap'} gap={4}>
              <Box>
                <Input
                  size={'sm'}
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                  placeholder="Enter Course Name"
                />
              </Box>
              <Pagination
                mr={isMdScreen ? '0' : 'min(1.5rem, 5%)'}
                pageCounts={paginationIndices}
                activePage={activePageIdx}
                handlePageChange={(page) => {
                  setActivePaginationIdx(page);
                }}
              />
            </Flex>
            <Flex px={5}>
              <Text
                as={'a'}
                ml={'auto'}
                textColor={'var(--muted-color)'}
                fontWeight={'normal'}
                textDecoration={'underline'}
                cursor={'pointer'}
                href={
                  'https://github.com/Zain-ul-din/LGU-Timetable/blob/production/src/lib/util.ts#L279'
                }
                target="_blank">
                View technical implementation
              </Text>
            </Flex>
          </>
        )}

        {/* flexible space since we have fixed footer in the bottom*/}
        <Flex my={'6rem'}></Flex>
      </Flex>
    </>
  );
}

const AutoCompleteSearch = ({
  title,
  options,
  placeholder,
  value,
  onSelectOption,
  error
}: {
  title: string;
  placeholder: string;
  options: Array<string>;
  value: string;
  onSelectOption:
    | ((params: {
        item: Item;
        selectMethod: 'mouse' | 'keyboard' | null;
        isNewInput?: boolean | undefined;
      }) => boolean | void)
    | undefined;
  error: string | undefined;
}) => {
  return (
    <>
      <FormControl w="full">
        <FormLabel>{title}</FormLabel>
        <AutoComplete openOnFocus value={value} onSelectOption={onSelectOption}>
          <AutoCompleteInput
            fontSize={'xs'}
            variant="filled"
            background={'var(--card-color)'}
            _hover={{ background: 'var(--card-color)' }}
            placeholder={placeholder}
          />
          <AutoCompleteList background={'var(--bg-color)'}>
            {options.map((opt, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={opt}
                textTransform="capitalize"
                _hover={{ background: 'var(--card-color)' }}>
                {opt}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        {error && (
          <Text color={'red.300'} fontSize={'sm'} className="roboto" my={'0.5rem'}>
            {error}
          </Text>
        )}
      </FormControl>
    </>
  );
};
