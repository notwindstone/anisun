import Hero from "@/components/misc/Hero/Hero";
import { getCookie } from "@/lib/actions/cookies";
import { CookieConfigKey, InitialConfig } from "@/constants/configs";
import readCookiesData from "@/utils/configs/readCookiesData";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import getSafeConfigValues from "@/utils/configs/getSafeConfigValues";
import SearchedAnimes from "@/components/search/SearchedAnimes/SearchedAnimes";
import ListAnimes from "@/components/misc/ListAnimes/ListAnimes";

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
            <ListAnimes
                title={"Trending Now"}
                description={"Watch the currently popular titles"}
                method={"FetchTrendingTitles"}
                queryKey={"trending"}
            />
            <ListAnimes
                title={"Upcoming Next Season"}
                description={"Explore the animes that are going to be released soon"}
                method={"FetchUpcomingNextSeasonTitles"}
                queryKey={"upcoming"}
            />
            <ListAnimes
                title={"Top 30 Anime"}
                description={"Check the best series ever sorted by a score"}
                method={"FetchTopTitles"}
                queryKey={"top"}
            />
        </div>
    );
}
