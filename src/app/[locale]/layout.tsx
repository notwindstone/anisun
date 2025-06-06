import type {Metadata, Viewport} from "next";
import { Inter } from "next/font/google";
import React from "react";
import {Anchor, ColorSchemeScript, createTheme, Group, MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import {Notifications} from "@mantine/notifications";
import '@mantine/notifications/styles.css';
import {ClerkProvider} from "@clerk/nextjs";
import {ruRU, enUS} from "@clerk/localizations";
import './global.css';
import TanstackQueryProviders from "@/utils/Providers/TanstackQueryProviders";
import Main from "@/components/Main/Main";
import SideBar from "@/components/SideBar/SideBar";
import NavigationControl from "@/components/NavigationControl/NavigationControl";
import ThemedNextTopLoader from "@/components/ThemedNextTopLoader/ThemedNextTopLoader";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

const APP_NAME = 'Anisun';
const APP_DESCRIPTION = "An anime streaming website/PWA based on Next.js 14 and Shikimori, AniLibria, Kodik, Animetize and SovetRomantica APIs with the Mantine UI kit.";

const theme = createTheme({
    defaultRadius: "xl",
});

export const metadata: Metadata = {
    applicationName: APP_NAME,
    category: "website",
    generator: "Next.js",
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
    alternates: {
        canonical: '/',
        languages: {
            'en-US': '/en',
            'ru-RU' : '/ru',
        },
    },
    title: {
        template: `%s - ${APP_NAME}`,
        default: APP_NAME,
    },
    description: APP_DESCRIPTION,
    openGraph: {
        images: "/banner.png",
        siteName: APP_NAME,
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

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: {locale: string};
}>) {
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    let clerkLocale;

    switch (locale) {
        case "en":
            clerkLocale = enUS;
            break;
        case "ru":
            clerkLocale = ruRU;
            break;
        default:
            clerkLocale = enUS;
            break;
    }

    return (
        <ClerkProvider localization={clerkLocale}>
            <html lang={locale}>
                <head>
                    <ColorSchemeScript/>
                </head>
                <body className={inter.className}>
                    <NextIntlClientProvider messages={messages}>
                        <ThemedNextTopLoader />
                        <TanstackQueryProviders>
                            <MantineProvider theme={theme} defaultColorScheme="dark">
                                <Notifications zIndex={50000} limit={3} />
                                <Group className="root-group" gap={0} wrap="nowrap">
                                    <SideBar>
                                        <NavigationControl />
                                    </SideBar>
                                    <div className="app-wrapper">
                                        <div style={{ padding: "8px 16px", borderRadius: 8, marginTop: 16, marginRight: 24, position: "absolute", top: 0, right: 0, zIndex: 60000, backgroundColor: "black" }}>
                                            <Anchor target="_blank" style={{ color: "white" }} href="https://anime.tatar">
                                                Visit the new version of this app
                                            </Anchor>
                                        </div>
                                        <Main>
                                            {children}
                                        </Main>
                                    </div>
                                </Group>
                                <MobileNavbar />
                            </MantineProvider>
                        </TanstackQueryProviders>
                    </NextIntlClientProvider>
                    <Analytics />
                </body>
            </html>
        </ClerkProvider>
    );
}
