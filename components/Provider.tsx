'use client'
import { Session } from 'next-auth/core/types';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: JSX.Element | JSX.Element[];
  session?: Session;
}

const Provider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider;
