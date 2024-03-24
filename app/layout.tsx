import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import NextTopLoader from 'nextjs-toploader';
import { theme } from '@/theme';
import { Provider } from '@/utils/Provider';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <title>Mantine + Next.JS</title>
      </head>
      <body>
        <NextTopLoader
          color="#0076ff"
          showSpinner={false}
          height={4}
        />
        <Provider>
              <MantineProvider theme={theme}>{children}</MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
