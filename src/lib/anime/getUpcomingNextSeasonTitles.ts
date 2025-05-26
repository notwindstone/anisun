import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { RemoteRoutes } from "@/constants/routes";
import { GeneralFields } from "@/constants/anilist";
import { getNextSeason } from "@/utils/misc/getNextSeason";
import { AnimeType } from "@/types/Anime/Anime.type";

const GetUpcomingNextSeasonTitles = (options?: Partial<Request> | undefined) => getGraphQLResponse<Array<AnimeType>>({
    url:     RemoteRoutes.Anilist.GraphQL.Root,
    options: options,
    ...GraphQLClient.Anilist({
        operation: "Page.Media",
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
    }),
});

export default GetUpcomingNextSeasonTitles;