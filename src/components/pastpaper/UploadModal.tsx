import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Text,
  VisuallyHidden,
  Switch,
  useToast
} from '@chakra-ui/react';

import React, { useReducer, useRef, useState, useCallback } from 'react';

import Image from 'next/image';

import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  Item
} from '@choc-ui/chakra-autocomplete';

import Tesseract from 'tesseract.js';
import Loader from '../design/Loader';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import useAllSubjects from '~/hooks/useAllSubjects';

const UploadModal = ({
  isOpen,
  onClose,
  staticData
}: {
  isOpen: boolean;
  onClose: () => void;
  staticData: { [department: string]: Array<string> };
}) => {
  const [loading, setLoading] = useState({
    validatingImage: false,
    uploading: false
  });

  const toast = useToast();
  const subjects = useAllSubjects();

  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<{ img: null | File; err: undefined | string }>({
    img: null,
    err: undefined
  });

  const handleInputFile = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const inputReducer = (state: inputStateType, action: InputAction) => {
    switch (action.type) {
      case InputActionKind.subject:
        return {
          ...state,
          subject: {
            value: action.payload as string,
            error: subjects.includes(action.payload as string) ? undefined : InputError.subject
          }
        };
      case InputActionKind.examType:
        return {
          ...state,
          examType: {
            value: action.payload as string,
            error: ExamTypeArr.includes(action.payload as string) ? undefined : InputError.examType
          }
        };
      case InputActionKind.visibility:
        return {
          ...state,
          visibility: { value: action.payload as boolean, error: undefined }
        };
    }
    return initialState;
  };

  const [input, dispatch] = useReducer(inputReducer, initialState);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile({
        err: undefined,
        img: e.target.files[0].type.startsWith('image') ? e.target.files[0] : null
      });
    }
  };

  const convertImageToText = async () => {
    if (!selectedFile.img) return;
    setLoading({ ...loading, validatingImage: true });
    const res = await Tesseract.recognize(selectedFile.img, 'eng');
    setLoading({ ...loading, validatingImage: false });
    return res;
  };

  const handleSubmit = () => {
    dispatch({ type: InputActionKind.examType, payload: input.examType.value });
    dispatch({ type: InputActionKind.subject, payload: input.subject.value });

    let errors = Object.entries(input)
      .map(([key, val]) => {
        return val.error;
      })
      .filter((err) => err != undefined).length;

    if (selectedFile.img == undefined) setSelectedFile({ img: null, err: InputError.image });

    console.log(errors);
    errors = selectedFile.img == null ? errors + 1 : errors;

    if (errors != 0) {
      toast({
        status: 'error',
        description: `please resolve ${errors} errors to upload`,
        duration: 2000,
        position: 'top'
      });
      return;
    }

    const img_err = () => {
      toast({
        status: 'error',
        description: `Image not looks like exam paper`,
        duration: 3000,
        position: 'top'
      });
    };

    // TODO: validate image
    convertImageToText().then((res) => {
      console.log(res?.data);
      if (!res?.data.lines.length) return img_err();
      if (res?.data.lines.length < 10) return img_err();

      const avgConfidence =
        res.data.lines.reduce((acc, curr) => {
          return acc + curr.confidence;
        }, 0) / res.data.lines.length;

      console.log(avgConfidence);

      // all set
      toast({
        status: 'info',
        description: `The image appears to be legitimate, but out trusted member of the community will review it later.`,
        duration: 5000,
        position: 'top'
      });

      setLoading({ ...loading, uploading: false });

      toast({
        status: 'success',
        description: `Image has been uploaded ✔`,
        duration: 1000,
        position: 'top'
      });
    });
  };

  return (
    <>
      <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`Past Papers Upload Form`}</DrawerHeader>
          <DrawerBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}>
              <Flex p={'1rem'}>
                <Flex w="100%" flexDir={'column'}>
                  <VisuallyHidden>
                    <Input
                      type="file"
                      ref={inputRef}
                      accept="image/*"
                      onChange={handleFileInputChange}
                    />
                  </VisuallyHidden>
                  <Center my={'1rem'}>
                    {selectedFile.img && (
                      <Flex flexDir={'column'} gap={'1rem'}>
                        <Image
                          src={URL.createObjectURL(selectedFile.img)}
                          alt="image"
                          width={350}
                          height={300}
                          quality={100}></Image>
                        <Center>
                          {!loading.validatingImage && !loading.uploading && (
                            <Button
                              colorScheme="red"
                              onClick={(e) =>
                                setSelectedFile({
                                  img: null,
                                  err: InputError.image
                                })
                              }>
                              Delete Image
                            </Button>
                          )}
                        </Center>
                      </Flex>
                    )}
                  </Center>
                  <Box
                    bg={'var(--card-color)'}
                    py={'4rem'}
                    w={'100%'}
                    border={'3px dashed var(--border-color)'}
                    textAlign={'center'}
                    rounded={'lg'}
                    cursor={'pointer'}
                    onClick={handleInputFile}
                    style={{ display: selectedFile.img ? 'none' : 'initial' }}>
                    <Text fontSize={'xl'}>CLICK TO UPLOAD IMAGE</Text>
                  </Box>

                  <Center my={'1rem'} color={'red.300'}>
                    {selectedFile.err}
                  </Center>

                  <Flex flexWrap={'wrap'} gap="1rem" justifyContent={'center'} p={'1rem'}>
                    <AutoCompleteSearch
                      value={input.subject.value}
                      error={input.subject.error}
                      onSelectOption={(option) => {
                        dispatch({
                          type: InputActionKind.subject,
                          payload: option.item.value || ''
                        });
                      }}
                      options={subjects}
                      title={'Subject Name'}
                      placeholder={'Enter Subject Name'}
                    />

                    <AutoCompleteSearch
                      value={input.examType.value}
                      error={input.examType.error}
                      onSelectOption={(option) => {
                        dispatch({
                          type: InputActionKind.examType,
                          payload: option.item.value
                        });
                      }}
                      options={ExamTypeArr}
                      title={'Exam Type'}
                      placeholder={'Enter Exam Type Name'}
                    />

                    <SwitchForm
                      value={input.visibility.value == true ? 1 : 0}
                      onChange={(e) => {
                        dispatch({
                          type: InputActionKind.visibility,
                          payload: e.target.value == '1' ? !true : !false
                        });
                      }}
                      title="Visibility"
                      helperText="Optional, set to false if you want to hide your profile avatar"
                    />
                  </Flex>
                </Flex>
              </Flex>

              {loading.validatingImage && <Loader>Please Wait Validating Image</Loader>}
              {loading.uploading && <Loader>Uploading Image to Cloud</Loader>}
              <Center pt={'0.4rem'} mb={'3rem'}>
                <Button
                  colorScheme="whatsapp"
                  type="submit"
                  isLoading={loading.validatingImage || loading.uploading}>
                  Submit
                </Button>
              </Center>
            </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const AutoCompleteSearch = ({
  title,
  options,
  placeholder,
  value,
  onSelectOption,
  error
}: {
  title: string;
  placeholder: string;
  options: Array<string>;
  value: string;
  onSelectOption:
    | ((params: {
        item: Item;
        selectMethod: 'mouse' | 'keyboard' | null;
        isNewInput?: boolean | undefined;
      }) => boolean | void)
    | undefined;
  error: string | undefined;
}) => {
  return (
    <>
      <FormControl w="60">
        <FormLabel>{title}</FormLabel>
        <AutoComplete openOnFocus value={value} onSelectOption={onSelectOption}>
          <AutoCompleteInput
            variant="filled"
            background={'var(--card-color)'}
            _hover={{ background: 'var(--card-color)' }}
            placeholder={placeholder}
          />
          <AutoCompleteList background={'var(--bg-color)'}>
            {options.map((opt, cid) => (
              <AutoCompleteItem
                key={`option-${cid}`}
                value={opt}
                textTransform="capitalize"
                _hover={{ background: 'var(--card-color)' }}>
                {opt}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        {error && (
          <Text color={'red.300'} fontSize={'sm'} className="roboto" my={'0.5rem'}>
            {error}
          </Text>
        )}
      </FormControl>
    </>
  );
};

const SwitchForm = ({
  title,
  helperText,
  value,
  onChange
}: {
  title: string;
  helperText: string;
  value: number;
  onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
}) => {
  return (
    <>
      <FormControl w="60">
        <FormLabel>{title}</FormLabel>
        <Switch
          size={'lg'}
          colorScheme={'purple'}
          value={value}
          onChange={onChange}
          isChecked={value == 1 ? true : false}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  );
};

export default UploadModal;

enum InputActionKind {
  subject = 'subject',
  examType = 'examType',
  visibility = 'visibility'
}

enum InputError {
  image = 'Paper Image Required',
  subject = 'Invalid Subject Name',
  examType = 'Invalid Option'
}

const ExamTypeArr = ['mid', 'final'];

interface InputAction {
  type: InputActionKind;
  payload: string | boolean;
}

interface inputStateType {
  subject: { value: string; error: undefined | string };
  examType: { value: string; error: undefined | string };
  visibility: { value: boolean; error: undefined | string };
}

const initialState: inputStateType = {
  subject: { value: '', error: undefined },
  examType: { value: '', error: undefined },
  visibility: { value: true, error: undefined }
};
