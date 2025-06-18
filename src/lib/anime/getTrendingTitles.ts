import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { RemoteRoutes } from "@/constants/routes";
import { GeneralFields } from "@/constants/anilist";
import { AnimeType } from "@/types/Anime/Anime.type";

const GetTrendingTitles = (options?: Partial<Request> | undefined) => getGraphQLResponse<Array<AnimeType>>({
    url:     RemoteRoutes.Anilist.GraphQL.Root,
    options: options,
    ...GraphQLClient.Anilist({
        queries: [
            {
                alias:     "Page",
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
        ],
    }),
});

export default GetTrendingTitles;
