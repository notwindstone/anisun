import fetchHeroTitle from "@/lib/anime/fetchHeroTitle";
import searchTitles from "@/lib/anime/searchTitles";
import fetchTrendingTitles from "@/lib/anime/fetchTrendingTitles";
import fetchUpcomingNextSeasonTitles from "@/lib/anime/fetchUpcomingNextSeasonTitles";
import fetchTopTitles from "@/lib/anime/fetchTopTitles";
import fetchAnilibriaVideo from "@/lib/anime/fetchAnilibriaVideo";

// TODO implement a GraphQL query builder
// A workaround for passing methods from server to the client
export const Getters = {
    FetchHeroTitle:                fetchHeroTitle,
    FetchTrendingTitles:           fetchTrendingTitles,
    FetchUpcomingNextSeasonTitles: fetchUpcomingNextSeasonTitles,
    FetchTopTitles:                fetchTopTitles,
    SearchTitles:                  searchTitles,
};
export const VideoGetters = {
    FetchAnilibriaVideo: fetchAnilibriaVideo,
};