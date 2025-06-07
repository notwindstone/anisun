import searchTitles from "@/lib/anime/searchTitles";
import GetTopTitles from "@/lib/anime/getTopTitles";
import GetHeroTitle from "@/lib/anime/getHeroTitle";
import GetTrendingTitles from "@/lib/anime/getTrendingTitles";
import GetUpcomingNextSeasonTitles from "@/lib/anime/getUpcomingNextSeasonTitles";

// A workaround for passing methods from server to the client
export const Getters = {
    FetchHeroTitle:                GetHeroTitle,
    FetchTrendingTitles:           GetTrendingTitles,
    FetchUpcomingNextSeasonTitles: GetUpcomingNextSeasonTitles,
    FetchTopTitles:                GetTopTitles,
    SearchTitles:                  searchTitles,
};
