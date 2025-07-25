import FetchCurrentAnime from "@/lib/anime/fetchCurrentAnime";
import GetHomePageTitles from "@/lib/anime/getHomePageTitles";
import SearchAnime from "@/lib/anime/searchAnime";

// A workaround for passing methods from server to the client
export const Getters = {
    FetchHomePageTitles: GetHomePageTitles,
    SearchAnime:         SearchAnime,
    FetchCurrentAnime:   FetchCurrentAnime,
};
