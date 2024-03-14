import { ArrowBackIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { ROUTING } from '~/lib/constant';

import Btn from './Button';

export default function BackBtn() {
   return (
      <Btn style={{ margin: '0rem 0rem 0.2rem 0.6rem', padding: '0.4rem' }}>
         Go back
         <b
            style={{
               margin: '0rem 0.3rem 0rem 0.3rem',
               transform: 'translateY(-2px)'
            }}
         >
            <ArrowBackIcon />
         </b>
      </Btn>
   );
}
