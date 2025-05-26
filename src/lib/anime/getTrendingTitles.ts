import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { RemoteRoutes } from "@/constants/routes";
import { GeneralFields } from "@/constants/anilist";

const GetTrendingTitles = getGraphQLResponse({
    url: RemoteRoutes.Anilist.GraphQL.Root,
    ...GraphQLClient.Anilist({
        operation: "Page.Media",
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
    }),
});

export default GetTrendingTitles;