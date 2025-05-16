import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";
import { QueryType } from "@/types/Anime/Query.type";

export const AnilistClient = ({
    params,
    fields,
}: {
    params: string;
    fields: string;
}): GraphQLBuilderResponseType<
    QueryType,
    {
        [K: string]: string | number;
    }
> => {
    console.log(params, fields);
    return {
        query: {},
        variables: {
            suck: 1,
        },
    };
};