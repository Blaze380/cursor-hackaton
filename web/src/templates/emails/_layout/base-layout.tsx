import { Body, Container, Head, Html, Preview, Tailwind } from '@react-email/components';
import type { ReactNode } from 'react';

export interface BaseLayoutProps {
  preview?: string;
  children: ReactNode;
}

export function BaseLayout({ preview, children }: BaseLayoutProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        {preview ? <Preview>{preview}</Preview> : null}
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-8 max-w-[480px] rounded-lg bg-white p-6">
            {children}
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
