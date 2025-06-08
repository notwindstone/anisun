import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { CurrentAnimeYear, GeneralFields } from "@/constants/anilist";
import { RemoteRoutes } from "@/constants/routes";
import { AnimeType } from "@/types/Anime/Anime.type";

const GetHeroTitle = (options?: Partial<Request> | undefined) => getGraphQLResponse<AnimeType>({
    url:     RemoteRoutes.Anilist.GraphQL.Root,
    options: options,
    ...GraphQLClient.Anilist({
        operation: "Media",
        variables: {
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
    }),
});

export default GetHeroTitle;