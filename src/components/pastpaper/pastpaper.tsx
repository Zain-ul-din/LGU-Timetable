import {
   Button,
   Center,
   Flex,
   Input,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   Text,
   useDisclosure,
} from '@chakra-ui/react';

import { firebase } from '~/lib/firebase';

import React from 'react';
import MustSignIn from '../design/MustSigin';
import UploadModal from './UploadModal';

export default function PastPaper({ staticData, pastPapers }: { staticData: {[department: string]: Array<string>}, pastPapers: Array<PastPaperDocType> }) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   return (
      <>
         {firebase.firebaseAuth.currentUser && <UploadModal isOpen={isOpen} onClose={onClose} staticData={staticData}/>}
         <MustSignIn>
            <Flex
               bg={'var(--card-color)'}
               p={'1rem'}
               border={'1px solid var(--border-color)'}
               rounded={'lg'}
               flexDirection={'column'}
               gap={'0.5rem'}
            >
               <Text className="roboto" textAlign={'justify'} padding={0}>
                  {`I've created a website where you can access past papers from our university exams to help you prepare for upcoming tests. But to make this resource as useful as possible, I need your help. Please contribute any past papers you have access to so that others can benefit too. Together, we can create a valuable resource and support each other towards academic success.`}
               </Text>
               <Center>
                  <Button colorScheme="whatsapp" onClick={onOpen}>
                     Upload
                  </Button>
               </Center>
            </Flex>
            <Center>
               <Input placeholder={'Enter Subject Name'} className={'roboto'} />
            </Center>

            <Flex justifyContent={'center'} flexWrap={'wrap'} gap ={'2rem'}>
               {pastPapers && pastPapers.map ((paper, idx)=> {
                  return <PastPaperRenderer key = {idx} props={paper}/>
               })}
            </Flex>
         </MustSignIn>
      </>
   );
}

import Image from 'next/image';
import { PastPaperDocType } from '~/types/typedef';

const PastPaperRenderer = ({ props }: {props: PastPaperDocType}) => {

   const { isOpen, onOpen, onClose } = useDisclosure()
   return <>
      <ViewModal props= {props} isOpen={isOpen} onClose = {onClose}/>
      <Flex >

         {/*eslint-disable-next-line @next/next/no-img-element */}
         <img
            src={props.imgUrl}
            alt= {`img ${props.subjectName}`}
            
            style={{ filter: 'brightness(130%)', minHeight: 250, maxHeight: 250,minWidth: 200, maxWidth: 200, cursor: 'pointer' }}
            loading='lazy'
            onClick={onOpen}
         ></img>
      </Flex> 
   </> 
};

interface ModalProps {
   props: PastPaperDocType,
   isOpen: boolean
   onClose: ()=> void
}

const ViewModal = ({props, isOpen, onClose }: ModalProps)=> {
   
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        allowPinchZoom = {true}
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`${props.subjectName} | ${props.department}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p = {'2rem'} justifyContent={'center'}>
            {/*eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={props.imgUrl}
              alt= {`img ${props.subjectName}`}
              style={{ objectFit: 'scale-down', cursor: 'pointer', borderRadius: '0.5rem', maxHeight: '70vh' }}
              loading='lazy'
            ></img>
          </ModalBody>
          <ModalFooter textAlign={'center'} justifyContent={'center'}>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <a href = {props.imgUrl} download={`${props.subjectName}_past_paper`} target='_blank'>
               <Button variant='outline'>Download
               </Button>
            </a>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
