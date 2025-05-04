import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import searchTitles from "@/lib/anime/searchTitles";
import fetchTrendingTitles from "@/lib/anime/fetchTrendingTitles";
import fetchUpcomingNextSeasonTitles from "@/lib/anime/fetchUpcomingNextSeasonTitles";
import fetchTopTitles from "@/lib/anime/fetchTopTitles";

// A workaround for passing methods from server to the client
export const Getters = {
    FetchHeroTitle: fetchHeroTitle,
    FetchTrendingTitles: fetchTrendingTitles,
    FetchUpcomingNextSeasonTitles: fetchUpcomingNextSeasonTitles,
    FetchTopTitles: fetchTopTitles,
    SearchTitles: searchTitles,
};