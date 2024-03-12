import { HTMLProps } from 'react';
import Link from 'next/link';

interface LinkWrapperProps extends HTMLProps<HTMLAnchorElement> {
  enable?: boolean;
}

export default function LinkWrapper({ children, enable, ...rest }: LinkWrapperProps) {
  if (!enable) return <>{children}</>;
  return (
    <Link {...(rest as any)} href={rest.href || ''}>
      {children}
    </Link>
  );
}
