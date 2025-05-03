import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";

// A workaround for passing methods from server to the client
export const Getters = {
    FetchHeroTitle: fetchHeroTitle,
    FetchTrendingTitles: fetchHeroTitle,
};