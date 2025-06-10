import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigsProvider } from "@/utils/providers/ConfigsProvider";
import { getCookie } from "@/lib/actions/cookies";
import TanstackQueryProviders from "@/utils/providers/TanstackQueryProviders/TanstackQueryProviders";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { CookieConfigKey, InitialConfig } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import AppWrapper from "@/components/layout/AppWrapper/AppWrapper";
import { AccountInfoCookieKey, AppName } from "@/constants/app";
import MobileNavbar from "@/components/layout/MobileNavbar/MobileNavbar";
import { cookies, headers } from "next/headers";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import { UserType } from "@/types/OAuth2/User.type";
import Footer from "@/components/layout/Footer/Footer";
import DarkReaderNotify from "@/components/misc/DarkReaderNotify/DarkReaderNotify";
import { userAgent } from "next/server";
import { SidebarConfigProvider } from "@/utils/providers/SidebarConfigProvider";
import getSafeAccountData from "@/utils/configs/getSafeAccountData";
import { ExtensionsProvider } from "@/utils/providers/ExtensionsProvider";
import CSSExtensionsLoader from "@/components/extensions/CSSExtensionsLoader/CSSExtensionsLoader";
import HistoryLogger from "@/components/misc/HistoryLogger/HistoryLogger";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets:  ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets:  ["latin"],
});

export async function generateMetadata({
    params,
}: {
    params: Promise<{
        lang: Locale;
    }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const { metadata: { title, description } } = await getDictionary(lang);

    return {
        icons: "/favicon.webp",
        title: {
            template: `%s | ${AppName.toLowerCase()}`,
            default:  title,
        },
        description,
    };
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ lang: Locale }>;
}>) {
    const { lang } = await params;
    const dictionaries = await getDictionary(lang);

    const cookieStore = await cookies();
    const configs = await getCookie({
        store: cookieStore,
        key:   CookieConfigKey,
    });
    const accountInfo = await getCookie({
        store: cookieStore,
        key:   AccountInfoCookieKey,
    });

    const parsedConfigData = readCookiesData<ParsedConfigType>({
        data:         configs,
        fallbackData: InitialConfig,
    });
    const parsedAccountInfoData = readCookiesData<UserType | unknown>({
        data:         accountInfo,
        fallbackData: {
            username: "",
            avatar:   "",
        },
    });

    const safeAccountValues = getSafeAccountData({
        account: parsedAccountInfoData,
    });

    const headersList = await headers();
    const { browser, cpu, os, device } = userAgent({
        headers: headersList,
    });
    const currentDate = new Date();

    // log requests
    console.log(
        `[${currentDate.toLocaleTimeString()}, ${currentDate.toDateString()}]:`,
        "request -",
        `${browser?.name} ${browser?.version},`,
        `${cpu?.architecture},`,
        `${os?.name} ${os?.version},`,
        `${device?.type}`,
    );

    return (
        <html lang={lang}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TanstackQueryProviders>
                    <ConfigsProvider configs={parsedConfigData} dictionaries={dictionaries}>
                        <SidebarConfigProvider configs={parsedConfigData?.layout?.sidebar}>
                            <ExtensionsProvider>
                                <AppWrapper>
                                    <Sidebar accountInfo={safeAccountValues} />
                                    <div className="overflow-y-auto w-full h-[calc(100svh-64px)] sm:h-full">
                                        {children}
                                        <Footer dictionaries={dictionaries} />
                                    </div>
                                    <MobileNavbar
                                        accountInfo={parsedAccountInfoData}
                                    />
                                </AppWrapper>
                                <CSSExtensionsLoader />
                            </ExtensionsProvider>
                        </SidebarConfigProvider>
                    </ConfigsProvider>
                </TanstackQueryProviders>
                <DarkReaderNotify />
                <HistoryLogger />
            </body>
        </html>
    );
}
