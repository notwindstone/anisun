import getGraphQLResponse from "@/lib/misc/getGraphQLResponse";
import { GraphQLClient } from "@/lib/graphql/client";
import { RemoteRoutes } from "@/constants/routes";
import { AnimeType } from "@/types/Anime/Anime.type";
import { SearchType } from "@/types/Anime/Search.type";
import { AnilistPageMediaLimitDefault } from "@/constants/anilist";
import { SortType } from "@/types/Anime/Queries/Sort.type";

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
                        type:   "ANIME",
                        search: options?.search,
                        // make some function to check this shit
                        // can be literally anything cuz user
                        sort:   options?.filters?.["sort"] as SortType,
                        genre:  options?.filters?.["genre"] as string,
                    },
                } : {
                    page:  {},
                    media: {
                        type:  "ANIME",
                        idMal: Number(options?.filters?.["idMal"] ?? 0),
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
