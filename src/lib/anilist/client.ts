import { AnimeType } from "@/types/Anime/Anime.type";
import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";

export const AnilistClient = ({
    params,
    fields,
}: {
    params: string;
    fields: string;
}): GraphQLBuilderResponseType<AnimeType, ""> => {
    return {
        query: {},
        variables: {},
    };
};