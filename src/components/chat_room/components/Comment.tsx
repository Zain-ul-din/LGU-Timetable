import { Avatar, Button, Flex, Icon, Text, useToast } from "@chakra-ui/react";
import { UserDocType } from "~/lib/firebase_doctypes";
import { fromFirebaseTimeStamp } from "~/lib/util";
import type { Comment as CommentType } from "~/lib/firebase_doctypes";
import StaticDropDown from "~/components/design/StaticDropDown";
import { BsThreeDotsVertical } from "react-icons/bs";
import MarkDown from "~/components/design/MarkDown";
import styles from '~/styles/chat_room/MarkDown.module.css';
import { clientCommentsHandler } from "../lib/ClientCommentsHandler";
import { CopyIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

import MarkDownInput from "./MarkDown";

const Comment = ({ comment, user, is_author }: { comment: CommentType; user: UserDocType | undefined, is_author: boolean }) => {
    

    const toast = useToast();
    const [canEdit, setEdit] = useState<boolean>(false);
    
    const [commentInput, setCommentInput] = useState<string>(comment.comment);

    return (
       <Flex
          p={'1rem'}
          border={'1px solid var(--border-color)'}
          rounded={'lg'}
          flexDir={'column'}
          width={'100%'}
          gap={'0.5rem'}
       >
          <Flex>
             {user && (
                <Flex gap={'0.5rem'} alignItems={'center'} width={'100%'}>
                   <Flex>
                      <Avatar src={user.photoURL as string} size={'sm'} />
                   </Flex>
                   <Flex flexDir={'column'}>
                      <Text fontSize={'md'} fontWeight={'bold'} className={'roboto'} lineHeight={1}>
                         {user.displayName}
                      </Text>
                      <Text
                         fontSize={'sm'}
                         fontWeight={'thin'}
                         color={'var(--muted-light-color)'}
                         className={'roboto'}
                         lineHeight={1}
                      >
                        
                        {!comment.isDeleted && comment.createdAt && (
                           <>
                              commented on {fromFirebaseTimeStamp(comment.createdAt).toDateString()}
                           </>
                        )}
                      </Text>
                   </Flex>
                   <Flex ml={'auto'}>
                    {!comment.isDeleted && 
                      <StaticDropDown
                         options={[
                            {
                               label: <Flex alignItems={'center'} gap={'0.3rem'}>
                                 <CopyIcon/> Copy
                               </Flex>,
                               onClick: () => {
                                  navigator.clipboard.writeText(comment.comment);
                                  toast({
                                    title: 'Copied',
                                    status: 'success',
                                    position: 'top'
                                  })
                               }
                            },
                            is_author ? { label: <Flex alignItems={'center'} gap={'0.3rem'}>
                            <EditIcon/> Edit
                           </Flex>
                            , onClick: () => { setEdit(true) } } : null,
                            is_author ? {
                               label: <Flex alignItems={'center'} gap={'0.3rem'}>
                               <DeleteIcon/> Delete
                              </Flex>,
                               onClick: () => {
                                clientCommentsHandler.Delete(comment, comment.id);
                               },
                               color: { color: 'red.300', textColor: 'red.300' }
                            } : null
                         ].filter((option) => option != null) as any[]}
                      >
                         <Icon fontSize={'xl'}>
                            <BsThreeDotsVertical />
                         </Icon>
                      </StaticDropDown>
                    }
                   </Flex>
                </Flex>
             )}
          </Flex>
          <Flex pl={'0.2rem'} rounded={'md'} p={'0.2rem'}>
            {comment.isDeleted ? <Flex alignItems={'center'} gap={'0.3rem'} px={'0.2rem'} flexWrap={'wrap'}>
                <DeleteIcon color={'red.400'} />
                <Text color={'var(--muted-light-color)'} textAlign={'center'}>
                    <Text color={'red.400'} display={'inline'} mr={'0.3rem'}>
                        deleted this comment on 
                    </Text>
                    {comment.updatedAt && 
                     fromFirebaseTimeStamp(comment.updatedAt).toDateString()}
                </Text>
            </Flex>: <>
                {canEdit ? <Flex width={'100%'} flexDir={'column'}> 
                  <MarkDownInput markdowntext={commentInput} textAreaProps={{
                     value: commentInput,
                     onChange: (e) => {
                        setCommentInput(e.target.value)
                     }
                  }}/> 
                  <Flex width={'100%'} p = {'0.2rem'} mt={'0.5rem'}>
                     <Flex ml={'auto'} gap={'0.5rem'}>
                        <Button size={'md'} variant={'outline'} colorScheme="red" onClick={()=>{
                           setEdit(false)
                           setCommentInput(comment.comment)
                        }}>Discard</Button>
                        <Button size={'md'} variant={'outline'} colorScheme="green">Save</Button>
                     </Flex>
                  </Flex>
                </Flex>
                : 
                  <MarkDown text={comment.comment} className={styles.mark_down} />}
            </>}
          </Flex>
       </Flex>
    );
};

export default Comment;

