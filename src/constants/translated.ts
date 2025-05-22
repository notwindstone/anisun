// For server-side translations without async .json files import
import { Locale } from "@/i18n-config";
import { Getters } from "@/lib/anime/getters";

export const HomePageItems: Array<{
    title: Record<Locale, string>;
    description: Record<Locale, string>;
    method: keyof typeof Getters;
    queryKey: string;
}> = [
    {
        title: {
            en: "Trending Now",
            ru: "Сейчас в тренде",
            uwu: "twending now",
        },
        description: {
            en: "Watch the currently popular titles",
            ru: "Смотрите популярные на данный момент тайтлы",
            uwu: "watch the cuwwentwy p-popuwaw titles",
        },
        method: "FetchTrendingTitles",
        queryKey: "trending",
    },
    {
        title: {
            en: "Upcoming Next Season",
            ru: "Аниме следующего сезона",
            uwu: "upcoming next season",
        },
        description: {
            en: "Explore the animes that are going to be released soon",
            ru: "Они выйдут в ближайшее время",
            uwu: "expwowe the animes that are going to be weweased soon",
        },
        method: "FetchUpcomingNextSeasonTitles",
        queryKey: "upcoming",
    },
    {
        title: {
            en: "Top 30 Anime",
            ru: "30 лучших аниме",
            uwu: "top 30 anime",
        },
        description: {
            en: "Check the best series sorted by a score",
            ru: "Взгляните на лучшие тайтлы, отсортированные по рейтингу",
            uwu: "check the best sewies s-sowted b-by a score",
        },
        method: "FetchTopTitles",
        queryKey: "top",
    },
];