import searchTitles from "@/lib/anime/searchTitles";
import FetchCurrentAnime from "@/lib/anime/fetchCurrentAnime";
import GetHomePageTitles from "@/lib/anime/getHomePageTitles";

// A workaround for passing methods from server to the client
export const Getters = {
    FetchHomePageTitles: GetHomePageTitles,
    SearchTitles:        searchTitles,
    FetchCurrentAnime:   FetchCurrentAnime,
};
