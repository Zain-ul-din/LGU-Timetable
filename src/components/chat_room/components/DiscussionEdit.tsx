import { Button, Flex, FormControl, FormErrorMessage, useToast } from '@chakra-ui/react';
import MarkDownInput from './MarkDown';
import { useState } from 'react';
import { clientCommentsHandler } from '../lib/ClientCommentsHandler';
import type { DiscussionDocType } from '~/lib/firebase_doctypes';
import { useForm } from 'react-hook-form';
import { UserInputLimit } from '../ranking/param';
import { discussionHandler } from '../lib/DiscussionHandler';

const DiscussionEdit = ({
    discussion,
    closeHandler
}: {
    discussion: DiscussionDocType;
    closeHandler: () => void;
}) => {
    const toast = useToast();
    const [content, setContent] = useState<string>(discussion.content);

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
                            minH: '20rem',
                            placeholder: 'Add a Content',
                            ...register('content', {
                                required: {
                                    value: true,
                                    message: 'content is too short'
                                },
                                minLength: {
                                    value: UserInputLimit.discussion_min,
                                    message: `Add  ${
                                        UserInputLimit.discussion_min - content.length
                                    } more characters to go`
                                },
                                maxLength: {
                                    value: UserInputLimit.discussion_max,
                                    message: 'Content is too long'
                                },
                                onChange: (e) => {
                                    setContent(e.target.value);
                                }
                            }),
                            defaultValue: discussion.content
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
                                setContent(discussion.content);
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
                                        discussionHandler
                                            .UpdateDiscussionContent(
                                                discussion,
                                                discussion.id,
                                                data.content,
                                                (err) => {
                                                    setLoading(false);
                                                    toast({
                                                        description: err,
                                                        status: 'error',
                                                        position: 'top'
                                                    });
                                                    reset({ content: discussion.content });
                                                }
                                            )
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

export default DiscussionEdit;
