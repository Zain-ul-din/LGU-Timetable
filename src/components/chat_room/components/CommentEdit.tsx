import { Button, Flex, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
import MarkDownInput from './MarkDown';
import { useState } from 'react';
import { clientCommentsHandler } from '../lib/ClientCommentsHandler';
import type { Comment as CommentType } from '~/lib/firebase_doctypes';
import { useForm } from 'react-hook-form';
import { UserInputLimit } from '../ranking/param';

const CommentEdit = ({
  comment,
  closeHandler
}: {
  comment: CommentType;
  closeHandler: () => void;
}) => {
  const toast = useToast();
  const [content, setContent] = useState<string>(comment.comment);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <Flex width={'100%'} flexDir={'column'}>
        <FormControl isInvalid={errors.content !== undefined}>
          <MarkDownInput
            textAreaProps={{
              minH: '10rem',
              placeholder: 'Add a comment',
              ...register('content', {
                required: {
                  value: true,
                  message: 'comment is too short'
                },
                minLength: {
                  value: UserInputLimit.comment_min,
                  message: `Add  ${
                    UserInputLimit.comment_min - content.length
                  } more characters to go`
                },
                maxLength: {
                  value: UserInputLimit.comment_max,
                  message: 'comment is too long'
                },
                onChange: (e) => {
                  setContent(e.target.value);
                }
              }),
              defaultValue: comment.comment
            }}
            markdowntext={content}
          />

          {errors.content && (
            <FormErrorMessage>{errors.content?.message as string}</FormErrorMessage>
          )}
        </FormControl>

        <Flex width={'100%'} p={'0.2rem'} mt={'0.5rem'}>
          <Flex ml={'auto'} gap={'0.5rem'}>
            <Button
              size={'md'}
              variant={'outline'}
              colorScheme="red"
              onClick={() => {
                closeHandler();
                setContent(comment.comment);
              }}>
              Discard
            </Button>
            <Button
              size={'md'}
              variant={'outline'}
              colorScheme="green"
              onClick={() => {
                setLoading(true);
                handleSubmit(
                  (data) => {
                    clientCommentsHandler
                      .Update(comment, comment.id, data.content, (err) => {
                        setLoading(false);
                        toast({
                          description: err,
                          status: 'error',
                          position: 'top'
                        });
                        reset({ content: comment.comment });
                      })
                      ?.then(() => {
                        setLoading(false);
                        closeHandler();
                      });
                  },
                  () => setLoading(false)
                )();
              }}
              isLoading={loading}>
              Save
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CommentEdit;
