import getGraphQLResponse from "@/lib/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { RemoteRoutes } from "@/constants/routes";
import { AnimeType } from "@/types/Anime/Anime.type";
import { SearchType } from "@/types/Anime/Search.type";
import { AnilistPageMediaLimitDefault } from "@/constants/anilist";
import getAnilistFilters from "@/lib/misc/getAnilistFilters";

const SearchAnime = (
    options?: Partial<SearchType> | undefined,
) => getGraphQLResponse<AnimeType>({
    url: RemoteRoutes.Anilist.GraphQL.Root,
    ...GraphQLClient.Anilist({
        queries: [
            {
                alias:     "searched",
                name:      "Page.Media",
                variables: options?.type === "name" ? {
                    page: {
                        page:    1,
                        perPage: Number.isNaN(Number(options?.filters?.["perPage"]))
                            ? AnilistPageMediaLimitDefault
                            // ensuring that we get a number within 0-50 range
                            : Math.min(
                                Math.abs(
                                    Number(options?.filters?.["perPage"] ?? AnilistPageMediaLimitDefault),
                                ),
                                AnilistPageMediaLimitDefault,
                            ),
                    },
                    media: {
                        type: "ANIME",
                        ...(getAnilistFilters({
                            search: options,
                        })),
                    },
                } : {
                    page: {
                        page:    1,
                        perPage: 10,
                    },
                    media: {
                        type:  "ANIME",
                        idMal: Number(options?.search ?? 0),
                    },
                },
                fields: [
                    "id",
                    "idMal",
                    "status",
                    "title.romaji",
                    "title.native",
                    "title.english",
                    "coverImage.extraLarge",
                    "averageScore",
                    "episodes",
                    "relations.nodes.title.romaji",
                    "relations.nodes.title.native",
                    "relations.nodes.title.english",
                ],
            },
        ],
    }),
});

export default SearchAnime;
