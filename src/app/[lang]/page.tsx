import Hero from "@/components/layout/Hero/Hero";
import { getCookie } from "@/lib/actions/cookies";
import { CookieConfigKey, InitialConfig } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import SearchedAnimes from "@/components/search/SearchedAnimes/SearchedAnimes";
import ListAnimes from "@/components/misc/ListAnimes/ListAnimes";
import type { Locale } from "@/i18n-config";
import { HomePageItems } from "@/constants/translated";
import GetHomePageTitles from "@/lib/anime/getHomePageTitles";

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

    console.log(GetHomePageTitles());

    return (
        <div>
            <Hero theme={theme} base={base} />
            <div className="w-full h-4" />
            <SearchedAnimes />
            <div className="w-full h-4" />
            {
                HomePageItems.map((item) => {
                    return (
                        <ListAnimes
                            key={item.title.en}
                            title={item.title[lang]}
                            description={item.description[lang]}
                            method={item.method}
                            queryKey={item.queryKey}
                        />
                    );
                })
            }
        </div>
    );
}
