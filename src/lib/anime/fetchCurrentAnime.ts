import getGraphQLResponse from "@/utils/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { RemoteRoutes } from "@/constants/routes";
import { AnimeType } from "@/types/Anime/Anime.type";

const FetchCurrentAnime = (
    options?: { idMal?: string } & Partial<Request> | undefined,
) => getGraphQLResponse<AnimeType>({
    url:     RemoteRoutes.Anilist.GraphQL.Root,
    options: options,
    ...GraphQLClient.Anilist({
        operation: "Media",
        variables: {
            media: {
                type:  "ANIME",
                idMal: Number(options?.idMal ?? 0),
            },
        },
        fields: [
            "id",
            "idMal",
            "title.romaji",
            "title.native",
            "title.english",
            "coverImage.extraLarge",
            "averageScore",
            "episodes",
        ],
    }),
});

export default FetchCurrentAnime;
