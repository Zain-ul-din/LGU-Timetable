import { Button, Flex, FormControl, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";
import { BiMessageSquareCheck } from "react-icons/bi";
import { clientCommentsHandler } from "../lib/ClientCommentsHandler";
import MarkDownInput from './MarkDown';
import { UserDocType } from "~/lib/firebase_doctypes";
import { useForm } from "react-hook-form";
import { UserInputLimit } from "../ranking/param";

const CommentUploader = ({ discussion_id, user }: { discussion_id: string, user: UserDocType })=> {

   const [content, setContent] = useState<string>('');
   const [loader, setLoader] = useState<boolean>(false);

   const {
     register,
     formState: { errors },
     handleSubmit,
     reset
   } = useForm();

   return <>
     <Flex width={'100%'}>
      <FormControl isInvalid={errors.content !== undefined}>
         <MarkDownInput
               textAreaProps={{
                  minH: '10rem',
                  placeholder: "Add a comment",
                  ...register('content', {
                     required: {
                        value: true,
                        message: 'comment is too short'
                     },
                     minLength: {
                        value: UserInputLimit.comment_min,
                        message: `Add  ${UserInputLimit.comment_min - content.length} more characters to go`
                     },
                     maxLength: {
                        value: UserInputLimit.comment_max,
                        message: 'comment is too long'
                     },
                     onChange: (e) => {
                        setContent(e.target.value);
                     }
                  })
               }}
               markdowntext={content}
            />

            {errors.content && (
               <FormErrorMessage>{errors.content?.message as string}</FormErrorMessage>
            )}
      </FormControl>
     </Flex>
     <Flex width={'100%'} justifyContent={'flex-end'} gap={'1rem'}>
        <Button colorScheme="purple" size={'md'} variant={'outline'}>
           <BiMessageSquareCheck style={{ margin: '0 0.2rem 0 0' }} /> Close Discussion
        </Button>
        <Button
           colorScheme="green"
           size={'md'}
           variant={'outline'}
           onClick={() => {
               setLoader(true);
               handleSubmit(data => {
                  clientCommentsHandler.Post(discussion_id, user?.uid as string, data.content)
                  .then(()=> {
                     setLoader(false);           
                     setContent('');       
                     reset({ content: ''});
                  });
               }, ()=> setLoader(false))();
           }}
           isLoading={loader}
        >
           Comment
        </Button>
     </Flex>
   </>
};

 
export default CommentUploader;
