import {
  Button,
  Center,
  Flex,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { firebase } from '~/lib/firebase';

import React from 'react';
import MustSignIn from '../design/MustSigin';
import UploadModal from './UploadModal';
import PastPaper from './PastPaper';

export default function PastPapers() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex maxWidth={'1400px'} mx={'auto'} flexDir={'column'} position={'relative'}>
        {/* header */}
        <HStack
          w={'100%'}
          maxW={'1250px'}
          bg={'var(--bg-color)'}
          top={0}
          position={'sticky'}
          zIndex={999}
          p={3}
          rounded={'md'}
          mx={'auto'}
          boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
          transition="all 0.3s ease-in-out">
          <Input placeholder="Search Past Paper" />
          <Button variant={'outline'} colorScheme={'purple'} onClick={onOpen}>
            Upload
          </Button>
        </HStack>
        {/* past papers */}
        <Flex gap={2} flexWrap={'wrap'} rounded={'sm'} p={2} justifyContent={'center'} m={3}>
          {new Array(10).fill('').map((_, idx) => {
            return <PastPaper key={idx} />;
          })}
        </Flex>

        {/* past paper upload modal */}
        <UploadModal
          isOpen={isOpen}
          onClose={onClose}
          staticData={{
            bscs: ['hello world']
          }}
        />
      </Flex>
    </>
  );
}

// interface ModalProps {
//   props: PastPaperDocType;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ViewModal = ({ props, isOpen, onClose }: ModalProps) => {
//   return (
//     <>
//       <Modal
//         blockScrollOnMount={false}
//         allowPinchZoom={true}
//         isCentered
//         onClose={onClose}
//         isOpen={isOpen}
//         motionPreset="slideInBottom">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>{`${props.subjectName} | ${props.department}`}</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody p={'2rem'} justifyContent={'center'}>
//             {/*eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={props.imgUrl}
//               alt={`img ${props.subjectName}`}
//               style={{
//                 objectFit: 'scale-down',
//                 cursor: 'pointer',
//                 borderRadius: '0.5rem',
//                 maxHeight: '70vh'
//               }}
//               loading="lazy"></img>
//           </ModalBody>
//           <ModalFooter textAlign={'center'} justifyContent={'center'}>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Close
//             </Button>
//             <a href={props.imgUrl} download={`${props.subjectName}_past_paper`} target="_blank">
//               <Button variant="outline">Download</Button>
//             </a>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
