import {
  Button,
  Box,
  Text,
  BoxProps,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { clamp } from '~/lib/util';

interface PaginationProps extends BoxProps {
  pageCounts: number[];
  activePage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({ pageCounts, activePage, handlePageChange, ...rest }: PaginationProps) => {
  const [input, setInput] = useState<string>('0');
  useEffect(() => setInput(activePage.toString()), [activePage]);

  return (
    <>
      <Box {...rest} gap={4} px={4}>
        <HStack>
          <Button
            variant={'outline'}
            size={'sm'}
            isDisabled={activePage == pageCounts[0]}
            onClick={() => {
              handlePageChange(activePage - 1);
            }}>
            <BiLeftArrow />
          </Button>

          <HStack>
            <Text whiteSpace={'nowrap'}>Page</Text>
            <NumberInput
              variant={'filled'}
              rounded={'lg'}
              maxW={'6rem'}
              minW={'6rem'}
              value={input}
              onChange={(txtValue, v) => {
                if (isNaN(v)) return setInput(txtValue);
                const clampedVal = clamp(v, pageCounts[0], pageCounts[pageCounts.length - 1]);
                setInput(clampedVal.toString());
                handlePageChange(clampedVal);
              }}
              defaultValue={activePage}
              step={1}
              min={pageCounts[0]}
              max={pageCounts[pageCounts.length - 1]}
              size={'sm'}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text whiteSpace={'nowrap'}>of {pageCounts[pageCounts.length - 1]} </Text>
          </HStack>

          <Button
            variant={'outline'}
            size={'sm'}
            isDisabled={activePage == pageCounts[pageCounts.length - 1]}
            onClick={() => {
              handlePageChange(activePage + 1);
            }}>
            <BiRightArrow />
          </Button>
        </HStack>
      </Box>
    </>
  );
};
export default Pagination;
