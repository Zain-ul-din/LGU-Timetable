import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
   Box,
   ButtonGroup,
   Editable,
   EditableInput,
   EditableInputProps,
   EditablePreview,
   EditableProps,
   Flex,
   IconButton,
   IconButtonProps,
   Input,
   InputProps,
   useEditableControls
} from '@chakra-ui/react';

export default function EditableText({
   editAbleProps,
   editAbleInputProps
}: {
   editAbleProps: EditableProps;
   editAbleInputProps?: InputProps;
}) {
   return (
      <Flex flexDir={'row'} alignItems={'center'}>
         <Editable {...editAbleProps} flexDir={'row'}>
            <EditablePreview />
            <Input as={EditableInput} {...editAbleInputProps} />
            <EditableControls />
         </Editable>
      </Flex>
   );
}

const EditableControls = () => {
   const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } =
      useEditableControls();

   return isEditing ? (
      <Box  display={'flex'} p={'0.2rem'} gap={'0.5rem'}>
         <IconButton
            size={'xs'}
            colorScheme="green"
            variant={'outline'}
            icon={<CheckIcon />}
            {...(getSubmitButtonProps() as IconButtonProps)}
         />
         <IconButton
            size={'xs'}
            colorScheme="red"
            variant={'outline'}
            icon={<CloseIcon />}
            {...(getCancelButtonProps() as IconButtonProps)}
         />
      </Box>
   ) : (
      <Box display={'inline-block'} mx={'0.5rem'} alignItems={'center'}>
         <IconButton size="xs" variant={"outline"} icon={<EditIcon />} {...(getEditButtonProps() as IconButtonProps)} />
      </Box>
   );
};
