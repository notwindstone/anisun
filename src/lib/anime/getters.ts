import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import searchTitles from "@/lib/anime/searchTitles";

// A workaround for passing methods from server to the client
export const Getters = {
    FetchHeroTitle: fetchHeroTitle,
    FetchTrendingTitles: fetchHeroTitle,
    SearchTitles: searchTitles,
};