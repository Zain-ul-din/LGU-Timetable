import { VisuallyHidden, Text } from '@chakra-ui/react';
import { link } from 'joi';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ROUTING } from '~/lib/constant';

export default function A11Y() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [ref]);

  return (
    <VisuallyHidden>
      <div ref={ref} tabIndex={-1} aria-live="polite" aria-atomic="true">
        <Text as="h2" fontSize="lg">
          LGU timetable Navigation
        </Text>
        <p>A non-official blazingly fast website to access the LGU timetable.</p>
        <nav aria-label="move through the LGU timetable navigation">
          {[
            { name: 'Student Timetable', link: ROUTING.timetable },
            { name: 'Teachers Timetable', link: ROUTING.teachers },
            { name: 'Fee Rooms', link: ROUTING.free_class_rooms }
          ].map((item, idx) => (
            <Link key={idx} href={item.link}>
              <Text>{item.name}</Text>
            </Link>
          ))}
        </nav>
      </div>
    </VisuallyHidden>
  );
}
