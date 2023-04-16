import Router from 'next/router';
import { useEffect } from 'react';

export default function $404() {
   useEffect(() => {
      Router.push('/');
   }, []);

   return <>404</>;
}
