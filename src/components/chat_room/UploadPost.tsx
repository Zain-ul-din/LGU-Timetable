import {
   Box,
   Button,
   ButtonProps,
   Center,
   Flex,
   FormControl,
   FormErrorMessage,
   FormLabel,
   Heading,
   Input,
   Text
} from '@chakra-ui/react';
import { CHAT_CATEGORIES } from '~/lib/constant';
import { useContext, useEffect, useState } from 'react';
import { UseStateProps } from '~/types/typedef';
import AppStateProvider, { AppState } from './hooks/AppStateProvider';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { PushNestedRouterParam } from './hooks/NestedRouting';

import MarkDown from './components/MarkDown';

export default function UploadPost() {
   const [appState, setAppState] = useContext(AppStateProvider);

   return (
      <>
         {/* <Text>Welcome to Discussions</Text> */}
         {!appState.upload_category ? (
            <CategoriesSelection categoryState={[appState, setAppState]} />
         ) : (
            <UploadForm categoryState={[appState, setAppState]} />
         )}
      </>
   );
}

function CategoriesSelection({ categoryState }: { categoryState: UseStateProps<AppState> }) {
   const router = useRouter();

   return (
      <Flex flexDir={'column'} p={'1rem'} gap={'1rem'}>
         <Heading fontSize={'2xl'} className="roboto">
            Select a discussion category
         </Heading>
         <Flex flexDir={'column'} border={'1px solid var(--border-color)'} rounded={'lg'}>
            {Object.entries(CHAT_CATEGORIES).map(([key, val], idx) => {
               if (idx == 0) return <Fragment key={idx}></Fragment>;
               return (
                  <Category
                     key={idx}
                     name={val}
                     btnProps={{
                        onClick: () => {
                           categoryState[1]({ ...categoryState[0], upload_category: key });
                           PushNestedRouterParam(
                              { ...categoryState[0], upload_category: key },
                              router
                           );
                        }
                     }}
                  />
               );
            })}
         </Flex>
      </Flex>
   );
}

const Category = ({ name, btnProps }: { name: string; btnProps?: ButtonProps }) => {
   return (
      <Flex p={'1rem'} py={'1rem'} border={'0.1px solid var(--border-color)'}>
         <Text className="roboto">{name}</Text>
         <Button size={'sm'} ml={'auto'} colorScheme="green" {...btnProps}>
            Get Started
         </Button>
      </Flex>
   );
};

import { useForm } from 'react-hook-form';
import { UserCredentialsContext } from '~/hooks/UserCredentialsContext';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { DiscussionDocType } from '~/lib/firebase_doctypes';
import { discussionsColRef } from '~/lib/firebase';

const UploadForm = ({ categoryState }: { categoryState: UseStateProps<AppState> }) => {
   const [state, setState] = categoryState;
   const router = useRouter();

   const validateCategory = (): boolean => {
      let categories = Object.keys(CHAT_CATEGORIES);

      return categories.slice(1, categories.length).reduce((acc: boolean, curr: string) => {
         if (acc == true) return true;
         return curr == state.upload_category;
      }, false);
   };

   useEffect(() => {
      if (!validateCategory()) {
         setState({ ...state, upload_category: undefined });
         PushNestedRouterParam({ ...state, upload_category: undefined }, router);
      }
   }, []);

   const {
      register,
      formState: { errors },
      handleSubmit,
      reset
   } = useForm();

   const [content, setContent] = useState<string>('');
   const user = useContext(UserCredentialsContext);
   const [loading, setLoading] = useState<boolean>(false);
   
   return (
      <Flex p={'1rem'} flexDir={'column'} gap={'0.5rem'} height={'100%'}>
         <Heading className="roboto" fontSize={'2xl'}>
            Start a new discussion
         </Heading>
         <Flex bg={'gray.600'}>
            <Box p={'0.5rem'} border={'1px solid var(--border-color)'} rounded={'md'}>
               <Text fontWeight={'extrabold'} className="roboto">
                  {CHAT_CATEGORIES[state.upload_category as keyof typeof CHAT_CATEGORIES]}
               </Text>
            </Box>
         </Flex>
         <Flex gap={'0.5rem'} flexDir={'column'} my={'1rem'}>
            <Text fontSize={'sm'}>
               {`If this doesn’t look right you can`}
               <Text
                  display={'inline-block'}
                  color={'blue.300'}
                  px={'0.3rem'}
                  cursor={'pointer'}
                  onClick={() => {
                     setState({ ...state, upload_category: undefined });
                     PushNestedRouterParam({ ...state, upload_category: undefined }, router);
                  }}
               >
                  choose a different category.
               </Text>
            </Text>
            <Text fontSize={'sm'} color={'var(--muted-color)'}>
               Fields marked with an asterisk (*) are required.
            </Text>
         </Flex>

         {/* Main Input */}
         <FormControl isInvalid={errors.title !== undefined}>
            <FormLabel>Discussion title *</FormLabel>
            <Input
               placeholder="Title"
               minH={'2.5rem'}
               {...register('title', {
                  required: {
                     value: true,
                     message: 'Title is required'
                  },
                  minLength: {
                     value: 2,
                     message: 'Title is too short'
                  },
                  maxLength: {
                     value: 100,
                     message: 'Title is too long'
                  }
               })}
            />
            {errors.title && <FormErrorMessage>{errors.title?.message as string}</FormErrorMessage>}
         </FormControl>
         <FormControl isInvalid={errors.content !== undefined}>
            <MarkDown
               markdowntext={content}
               textAreaProps={{
                  placeholder: 'Ask a question, start a conversation, or make an announcement',
                  ...register('content', {
                     required: {
                        value: true,
                        message: 'please fill the content'
                     },
                     minLength: {
                        value: 10,
                        message: `Add  ${10 - content.length} more characters to go`
                     },
                     maxLength: {
                        value: 100000,
                        message: 'Content is too long'
                     },
                     onChange: (e) => {
                        setContent(e.target.value);
                     }
                  })
               }}
            />
            {errors.content && (
               <FormErrorMessage>{errors.content?.message as string}</FormErrorMessage>
            )}
         </FormControl>
         <Box ml={'auto'}>
            <Button
               variant={'outline'}
               colorScheme="whatsapp"
               onClick={() => {
                  handleSubmit((data) => {
                     const discussionDocRef = doc(discussionsColRef);
                     const discussion: DiscussionDocType = {
                        id: discussionDocRef.id,
                        title: data.title,
                        content: data.content,
                        discussionType: state.upload_category as string,
                        authorId: user?.user?.uid as string,
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                        weight: 0
                     };

                     setLoading(true);
                     setDoc(discussionDocRef, discussion).then(() => {
                        setLoading(false);
                        reset();
                        setContent('');
                     });
                  })();
               }}
               isLoading={loading}
            >
               start discussion
            </Button>
         </Box>
         <Center></Center>
      </Flex>
   );
};
