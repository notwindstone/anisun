import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import {ColorSchemeScript, createTheme, Group, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import NextTopLoader from "nextjs-toploader";
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import {ClerkProvider} from "@clerk/nextjs";
import {ruRU} from "@clerk/localizations";
import './global.css'
import TanstackQueryProviders from "@/utils/Providers/TanstackQueryProviders";
import Main from "@/components/Main/Main";
import SideBar from "@/components/SideBar/SideBar";
import NavigationControl from "@/components/NavigationControl/NavigationControl";

const inter = Inter({ subsets: ["latin"] });

const title = 'Главная'
const description = "Сайт для онлайн просмотра аниме на основе Next.JS 14, Mantine UI, Tanstack Query и Drizzle ORM. Плеер сделан на AniLibria API и Kodik, а поиск аниме через Shikimori API."

const theme = createTheme({
    defaultRadius: "xl",
})

export const metadata: Metadata = {
    icons: {
        icon: "/favicon.png"
    },
    title: title,
    description: description,
    openGraph: {
        siteName: 'Animeth',
        type: "website",
        title: title,
        description: description,
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider localization={ruRU}>
            <html lang="en">
                <head>
                    <ColorSchemeScript/>
                </head>
                <body style={{ background: 'var(--animeth-background-color)' }} className={inter.className}>
                    <NextTopLoader
                      color="var(--animeth-accent-color)"
                      showSpinner={false}
                      height={4}
                      zIndex={100000}
                    />
                    <TanstackQueryProviders>
                        <MantineProvider theme={theme} defaultColorScheme="dark">
                            <Notifications zIndex={50000} limit={3} />
                            <Group className="root-group" gap={0} wrap="nowrap">
                                <SideBar>
                                    <NavigationControl />
                                </SideBar>
                                <div className="app-wrapper">
                                    <Main>
                                        {children}
                                    </Main>
                                </div>
                            </Group>
                        </MantineProvider>
                    </TanstackQueryProviders>
                </body>
            </html>
        </ClerkProvider>
    );
}
