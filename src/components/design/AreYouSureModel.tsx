import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    Text,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { UseDisclosureProps } from '@chakra-ui/react';

export default function AreYouSureModel({
    title = 'Are you sure?',
    onYes,
    handler: { onClose, isOpen }
}: {
    title?: string;
    handler: UseDisclosureProps;
    onYes?: ()=> void;
}) {
    return (
        <Modal onClose={onClose || (() => {})} isOpen={isOpen as boolean} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text className="roboto">{title}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose} mr={'0.5rem'}>
                        Nope
                    </Button>
                    <Button onClick={()=>{
                        onClose && (onClose())
                        onYes && (onYes())
                    }} ml={'0.5rem'}>
                        Yep
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
