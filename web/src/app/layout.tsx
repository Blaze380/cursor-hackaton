import type { Metadata, Viewport } from 'next';

import { PwaRegistrar } from '@/components/pwa/pwa-registrar';
import { Providers } from '@/providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alerta Maputo',
  description: 'Sistema de alerta precoce de cheias — monitorização por bairro',
  applicationName: 'Alerta Maputo',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Alerta Maputo',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  themeColor: '#0284c7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className="antialiased">
        <Providers>
          <PwaRegistrar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
