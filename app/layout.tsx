import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import NextTopLoader from 'nextjs-toploader';
import { ClerkProvider } from '@clerk/nextjs';
import { theme } from '@/theme';
import Providers from '@/utils/Providers';
import {ruRU} from "@clerk/localizations";

export const metadata = {
    title: 'Mantine Next.js template',
    description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
    return (
        <ClerkProvider localization={ruRU}>
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
                    <Providers>
                        <MantineProvider theme={theme}>{children}</MantineProvider>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
