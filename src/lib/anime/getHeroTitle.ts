import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { CurrentAnimeYear, GeneralFields } from "@/constants/anilist";
import { RemoteRoutes } from "@/constants/routes";

const GetHeroTitle = getGraphQLResponse({
    url: RemoteRoutes.Anilist.GraphQL.Root,
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