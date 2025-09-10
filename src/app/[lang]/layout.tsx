import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigsProvider } from "@/lib/providers/ConfigsProvider";
import { getCookiesArray } from "@/lib/actions/cookies";
import TanstackQueryProviders from "@/lib/providers/TanstackQueryProviders";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { CookieConfigKey, InitialConfig, PlaceholderAccount } from "@/constants/configs";
import readCookiesData from "@/lib/configs/readCookiesData";
import AppWrapper from "@/components/layout/AppWrapper/AppWrapper";
import { AccountInfoCookieKey, AppName } from "@/constants/app";
import { cookies, headers } from "next/headers";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import { UserType } from "@/types/OAuth2/User.type";
import Footer from "@/components/layout/Footer/Footer";
import DarkReaderNotify from "@/components/misc/DarkReaderNotify/DarkReaderNotify";
import { SidebarConfigProvider } from "@/lib/providers/SidebarConfigProvider";
import getSafeAccountData from "@/lib/configs/getSafeAccountData";
import { ExtensionsProvider } from "@/lib/providers/ExtensionsProvider";
import HistoryLogger from "@/components/misc/HistoryLogger/HistoryLogger";
import MobileNavbarWrapper from "@/components/layout/MobileNavbarWrapper/MobileNavbarWrapper";
import SidebarWrapper from "@/components/layout/SidebarWrapper/SidebarWrapper";
import handleRequests from "@/lib/misc/handleRequests";
import UnsupportedBrowserNotify from "@/components/misc/UnsupportedBrowserNotify/UnsupportedBrowserNotify";
import { AnimePageLoaderProvider } from "@/lib/providers/AnimePageLoader";
import ExtensionsLoader from "@/components/extensions/ExtensionsLoader/ExtensionsLoader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets:  ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets:  ["latin"],
});

// since Next.js 15.2 `generateMetadata` doesn't block initial render
// because metadata will be streamed into HTML
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
    const headersList = await headers();
    const cookieStore = await cookies();

    const dictionaries = await getDictionary(lang);

    const [configs, accountInfo] = await getCookiesArray({
        keys:  [CookieConfigKey, AccountInfoCookieKey],
        store: cookieStore,
    });

    const parsedConfigData = readCookiesData<ParsedConfigType>({
        data:         configs,
        fallbackData: InitialConfig,
    });
    // yeah ik that `any_type | unknown` becomes just `unknown`
    const parsedAccountInfoData = readCookiesData<UserType | unknown>({
        data:         accountInfo,
        fallbackData: PlaceholderAccount,
    });

    const safeAccountValues = getSafeAccountData({
        account: parsedAccountInfoData,
    });

    handleRequests({
        headers: headersList,
    });

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
                                    <SidebarWrapper accountInfo={safeAccountValues} />
                                    <div className="overflow-y-auto w-full h-[calc(100svh-64px)] sm:h-full">
                                        {/* just use CSR apps at this point 😭 */}
                                        <AnimePageLoaderProvider>
                                            {children}
                                        </AnimePageLoaderProvider>
                                        <Footer dictionaries={dictionaries} />
                                    </div>
                                    <MobileNavbarWrapper accountInfo={safeAccountValues} />
                                </AppWrapper>
                                <ExtensionsLoader />
                            </ExtensionsProvider>
                        </SidebarConfigProvider>
                        <HistoryLogger />
                    </ConfigsProvider>
                </TanstackQueryProviders>
                <UnsupportedBrowserNotify />
                <DarkReaderNotify />
            </body>
        </html>
    );
}
