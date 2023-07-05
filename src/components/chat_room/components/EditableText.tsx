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
      <ButtonGroup size="sm" display={'inline-block'} p={'0.2rem'}>
         <IconButton
            size={'sm'}
            colorScheme="green"
            icon={<CheckIcon />}
            {...(getSubmitButtonProps() as IconButtonProps)}
         />
         <IconButton
            size={'sm'}
            colorScheme="red"
            icon={<CloseIcon />}
            {...(getCancelButtonProps() as IconButtonProps)}
         />
      </ButtonGroup>
   ) : (
      <Box display={'inline-block'} mx={'0.5rem'}>
         <IconButton size="sm" icon={<EditIcon />} {...(getEditButtonProps() as IconButtonProps)} />
      </Box>
   );
};
