import { Center, FormControl, FormErrorMessage, Spinner, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DiscussionDocType } from '~/lib/firebase_doctypes';
import { UserInputLimit } from '../ranking/param';
import EditableText from './EditableText';
import { discussionHandler } from '../lib/DiscussionHandler';

interface DiscussionTitleEditProps {
  discussion: DiscussionDocType;
}

export default function DiscussionTitleEdit({ discussion }: DiscussionTitleEditProps) {
  const toast = useToast();
  const [title, setTitle] = useState<string>(discussion.title);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <FormControl isInvalid={errors.title != undefined}>
      {loading && <Spinner size={'xs'} />}
      <EditableText
        editAbleProps={{
          value: title,
          defaultValue: discussion.title,
          fontSize: '2xl',
          className: 'roboto',
          fontWeight: 'bold',
          onSubmit: async (value) => {
            setLoading(true);
            handleSubmit(
              async (data) => {
                if (data.title === discussion.title) return setLoading(false);
                discussionHandler
                  .UpdateDiscussionTitle(discussion, data.title, (reason) => {
                    toast({
                      description: reason,
                      status: 'error',
                      position: 'top'
                    });
                    setTitle(discussion.title);
                    setLoading(false);
                    reset({ title: discussion.title });
                  })
                  ?.then(() => setLoading(false));
              },
              () => {
                setTitle(discussion.title);
                setLoading(false);
                reset({ title: discussion.title });
              }
            )();
          },
          onCancel: () => {
            setTitle(discussion.title);
            setLoading(false);
          }
        }}
        editAbleInputProps={{
          defaultValue: discussion.title,
          ...register('title', {
            value: title,
            required: {
              value: true,
              message: 'title is too short'
            },
            minLength: {
              value: UserInputLimit.discussion_title_min,
              message: `Add ${
                UserInputLimit.discussion_title_min - title.length
              } more characters to go`
            },
            maxLength: {
              value: UserInputLimit.discussion_title_max,
              message: 'title is too long'
            },
            onChange: (e) => {
              setTitle(e.target.value);
            }
          })
        }}
      />

      {errors.title && <FormErrorMessage>{errors.title?.message as string}</FormErrorMessage>}
    </FormControl>
  );
}
