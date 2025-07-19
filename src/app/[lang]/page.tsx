import { getCookie } from "@/lib/actions/cookies";
import { CookieConfigKey, InitialConfig } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import type { Locale } from "@/i18n-config";
import ServerFetch from "@/components/fetch/ServerFetch/ServerFetch";
import { Suspense } from "react";
import HomeTitles from "@/components/layout/HomeTitles/HomeTitles";
import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import HomeTitlesClient from "@/components/layout/HomeTitlesClient/HomeTitlesClient";

export default async function Home({
    params,
}: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await params;
    const configs = await getCookie({
        key: CookieConfigKey,
    });
    const parsedConfigData = readCookiesData<ParsedConfigType>({
        data:         configs,
        fallbackData: InitialConfig,
    });
    const { theme, colors: { base } } = getSafeConfigValues({
        config: parsedConfigData,
    });

    return (
        <>
            <Suspense fallback={
                <HomeTitles
                    lang={lang}
                    base={base}
                    theme={theme}
                    status="pending"
                />
            }>
                <ServerFetch
                    renderChildrenWithData={
                        ({
                            data,
                        }: {
                            data?: Awaited<ReturnType<typeof getGraphQLResponse>>;
                        }) => (
                            <HomeTitles
                                lang={lang}
                                base={base}
                                theme={theme}
                                data={data}
                            />
                        )
                    }
                    queryKey={["anime", "home"]}
                    method="FetchHomePageTitles"
                    pendingUI={
                        <HomeTitles
                            lang={lang}
                            base={base}
                            theme={theme}
                            status="pending"
                        />
                    }
                    errorUI={
                        <HomeTitles
                            lang={lang}
                            base={base}
                            theme={theme}
                            status="error"
                        />
                    }
                    cacheErrorKey="home/error"
                    cacheQueryKey="home/anime"
                >
                    <HomeTitlesClient lang={lang} />
                </ServerFetch>
            </Suspense>
        </>
    );
}
