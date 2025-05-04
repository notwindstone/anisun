import Hero from "@/components/Hero/Hero";
import { getCookie } from "@/lib/actions/cookies";
import { CookieConfigKey, InitialConfig } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import SearchedAnimes from "@/components/SearchedAnimes/SearchedAnimes";
import TrendingAnimes from "@/components/TrendingAnimes/TrendingAnimes";

export default async function Home() {
    const configs = await getCookie({
        key: CookieConfigKey,
    });
    const parsedConfigData = readCookiesData<ParsedConfigType>({
        data: configs,
        fallbackData: InitialConfig,
    });
    const { theme, colors: { base } } = getSafeConfigValues({
        config: parsedConfigData,
    });

    return (
        <div>
            <Hero theme={theme} base={base} />
            <div className="w-full h-2" />
            <SearchedAnimes />
            <div className="w-full h-4" />
            <TrendingAnimes theme={theme} base={base} />
        </div>
    );
}
