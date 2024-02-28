import { BiLoader } from 'react-icons/bi';
import Loader from '../design/Loader';
import { Flex } from '@chakra-ui/react';

const LoadingOverlay = () => {
  return (
    <Flex
      position={'fixed'}
      top={2}
      right={2}
      bottom={0}
      left={2}
      bg={'var(--bg-dark)'}
      zIndex={9999}
      justifyContent={'center'}
      alignContent={'center'}
      alignItems={'center'}>
      <Flex
        p={5}
        bg={'black'}
        rounded={'md'}
        gap={2}
        alignItems={'center'}
        border={'2px solid'}
        borderColor={'var(--border-color)'}>
        <Loader
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
          <BiLoader className="spinner" />
          Wait, Updating Subjects
        </Loader>
      </Flex>{' '}
    </Flex>
  );
};

export default LoadingOverlay;
