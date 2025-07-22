import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { CurrentAnimeYear, GeneralFields } from "@/constants/anilist";
import { RemoteRoutes } from "@/constants/routes";
import { AnimeType } from "@/types/Anime/Anime.type";
import { getNextSeason } from "@/utils/misc/getNextSeason";

const GetHomePageTitles = (options?: Partial<Request> | undefined) => getGraphQLResponse<AnimeType>({
    url:     RemoteRoutes.Anilist.GraphQL.Root,
    options: options,
    ...GraphQLClient.Anilist({
        queries: [
            {
                alias:     "genres",
                name:      "GenreCollection",
                variables: {
                    page:  {},
                    media: {},
                },
                fields: [],
            },
            {
                alias:     "tags",
                name:      "MediaTagCollection",
                variables: {
                    page:  {},
                    media: {},
                },
                fields: [
                    "name",
                    "category",
                    "description",
                ],
            },
            {
                alias:     "hero",
                name:      "Media",
                variables: {
                    page:  {},
                    media: {
                        type:       "ANIME",
                        seasonYear: CurrentAnimeYear,
                        status:     "RELEASING",
                        sort:       "POPULARITY_DESC",
                        format:     "TV",
                    },
                },
                fields: [
                    ...GeneralFields,
                    "description",
                    "genres",
                ],
            },
            {
                alias:     "top",
                name:      "Page.Media",
                variables: {
                    page: {
                        page:    1,
                        perPage: 30,
                    },
                    media: {
                        type: "ANIME",
                        sort: "SCORE_DESC",
                    },
                },
                fields: [
                    ...GeneralFields,
                    "status",
                ],
            },
            {
                alias:     "trending",
                name:      "Page.Media",
                variables: {
                    page: {
                        page:    1,
                        perPage: 30,
                    },
                    media: {
                        type: "ANIME",
                        sort: "TRENDING_DESC",
                    },
                },
                fields: [
                    ...GeneralFields,
                    "status",
                ],
            },
            {
                alias:     "upcoming",
                name:      "Page.Media",
                variables: {
                    page: {
                        page:    1,
                        perPage: 30,
                    },
                    media: {
                        type:       "ANIME",
                        sort:       "POPULARITY_DESC",
                        seasonYear: (new Date).getFullYear(),
                        season:     getNextSeason(),
                    },
                },
                fields: [
                    ...GeneralFields,
                    "status",
                ],
            },
        ],
    }),
});

export default GetHomePageTitles;
