import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigsProvider } from "@/utils/providers/ConfigsProvider";
import { getCookie } from "@/lib/actions/cookies";
import TopLoader from "@/components/layout/TopLoader/TopLoader";
import TanstackQueryProviders from "@/utils/providers/TanstackQueryProviders/TanstackQueryProviders";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { CookieConfigKey, InitialConfig, SidebarLeftPosition } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import AppWrapper from "@/components/layout/AppWrapper/AppWrapper";
import SidebarWrapper from "@/components/layout/SidebarWrapper/SidebarWrapper";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import { AccountInfoCookieKey, AppName } from "@/constants/app";
import MobileNavbar from "@/components/layout/MobileNavbar/MobileNavbar";
import { cookies } from "next/headers";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import { UserType } from "@/types/OAuth2/User.type";
import Footer from "@/components/layout/Footer/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
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
            default: title,
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
        key: CookieConfigKey,
    });
    const accountInfo = await getCookie({
        store: cookieStore,
        key: AccountInfoCookieKey,
    });

    const parsedConfigData = readCookiesData<ParsedConfigType>({
        data: configs,
        fallbackData: InitialConfig,
    });
    const parsedAccountInfoData = readCookiesData<UserType | unknown>({
        data: accountInfo,
        fallbackData: {
            username: "",
            avatar: "",
        },
    });

    const safeConfigValues = getSafeConfigValues({
        config: parsedConfigData,
    });
    const layoutClassNames = safeConfigValues.layout.sidebar.position === SidebarLeftPosition
        ? "flex-col sm:flex-row"
        : "flex-col sm:flex-row-reverse";

    return (
        <html lang={lang}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TanstackQueryProviders>
                    <ConfigsProvider configs={parsedConfigData} dictionaries={dictionaries}>
                        <AppWrapper>
                            <TopLoader />
                            <main
                                className={`w-full h-[100svh] flex flex-nowrap gap-0 ${layoutClassNames}`}
                            >
                                {
                                /*
                                 * SidebarWrapper is client-side
                                 * Sidebar is server-side
                                 */
                                }
                                <SidebarWrapper serverSideSidebarPosition={safeConfigValues.layout.sidebar.position}>
                                    <Sidebar
                                        config={safeConfigValues}
                                        dictionaries={dictionaries}
                                        accountInfo={parsedAccountInfoData}
                                    />
                                </SidebarWrapper>
                                <div className="overflow-y-auto w-full h-[calc(100svh-64px)] sm:h-full">
                                    {children}
                                    <Footer dictionaries={dictionaries} />
                                </div>
                                <MobileNavbar
                                    accountInfo={parsedAccountInfoData}
                                />
                            </main>
                        </AppWrapper>
                    </ConfigsProvider>
                </TanstackQueryProviders>
            </body>
        </html>
    );
}
