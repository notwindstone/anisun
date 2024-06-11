import type {Metadata, Viewport} from "next";
import { Inter } from "next/font/google";
import React from "react";
import {ColorSchemeScript, createTheme, Group, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import {ClerkProvider} from "@clerk/nextjs";
import {ruRU} from "@clerk/localizations";
import './global.css';
import TanstackQueryProviders from "@/utils/Providers/TanstackQueryProviders";
import Main from "@/components/Main/Main";
import SideBar from "@/components/SideBar/SideBar";
import NavigationControl from "@/components/NavigationControl/NavigationControl";
import ThemedNextTopLoader from "@/components/ThemedNextTopLoader/ThemedNextTopLoader";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = 'Animeth';
const APP_DESCRIPTION = "Сайт для онлайн просмотра аниме на основе Next.JS 14, Mantine UI, Tanstack Query и Drizzle ORM. Плеер сделан на AniLibria API и Kodik, а поиск аниме через Shikimori API.";

const theme = createTheme({
    defaultRadius: "xl",
});

export const metadata: Metadata = {
    applicationName: APP_NAME,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_NAME,
    },
    formatDetection: {
        telephone: false,
    },
    icons: {
        icon: "/favicon.png"
    },
    title: APP_NAME,
    description: APP_DESCRIPTION,
    openGraph: {
        images: "/banner.png",
        siteName: 'Animeth',
        type: "website",
        title: APP_NAME,
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: APP_NAME,
        description: APP_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
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
                    <ThemedNextTopLoader />
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
                            <MobileNavbar />
                        </MantineProvider>
                    </TanstackQueryProviders>
                </body>
            </html>
        </ClerkProvider>
    );
}
