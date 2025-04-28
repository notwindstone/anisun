import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigsProvider } from "@/utils/providers/ConfigsProvider";
import { getCookie } from "@/lib/actions/cookies";
import TopLoader from "@/components/TopLoader/TopLoader";
import TanstackQueryProviders from "@/utils/providers/TanstackQueryProviders/TanstackQueryProviders";
import { i18n, type Locale } from "@/i18n-config";
import { getDictionary } from "@/get-dictionary";
import { CookieConfigKey } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import Sidebar from "@/components/Sidebar/Sidebar";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import SidebarWrapper from "@/components/Sidebar/SidebarWrapper/SidebarWrapper";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";

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
        title: {
            template: "%s | anisun",
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
    const configs = await getCookie({
        key: CookieConfigKey,
    });
    const parsedCookieData = readCookiesData({ configs });
    const safeConfigValues = getSafeConfigValues({
        config: parsedCookieData,
    });

    return (
        <html lang={lang}>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TanstackQueryProviders>
                    <ConfigsProvider configs={parsedCookieData} dictionaries={dictionaries}>
                        <AppWrapper>
                            <TopLoader />
                            <main className="w-full h-[100svh] flex flex-nowrap gap-0">
                                {
                                /*
                                 * SidebarWrapper is client-side
                                 * Sidebar is server-side
                                 */
                                }
                                <SidebarWrapper>
                                    <Sidebar config={safeConfigValues} />
                                </SidebarWrapper>
                                <div className="overflow-y-auto w-full">
                                    {children}
                                </div>
                            </main>
                        </AppWrapper>
                    </ConfigsProvider>
                </TanstackQueryProviders>
            </body>
        </html>
    );
}
