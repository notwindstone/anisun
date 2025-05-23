import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";

export const GraphQLClient = {
    Anilist: ({
        operation,
        fields,
        variables,
    }: {
        operation: "Page.Media" | "Media";
        fields: "";
        variables: Record<string, string>;
    }): GraphQLBuilderResponseType<string, string> => {

    },
    Shikimori: {},
};