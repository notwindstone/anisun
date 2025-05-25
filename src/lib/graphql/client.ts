import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";
import { QueryType } from "@/types/Anime/Query.type";

export const GraphQLClient = {
    Anilist: ({
        operation,
        fields,
        variables,
    }: {
        operation: "Page.Media" | "Media";
        fields: Array<QueryType>;
        variables: {
            page?: {
                perPage: number;
                page: number;
            },
            media: Record<string, string>;
        };
    }): GraphQLBuilderResponseType<string, string> => {
        let templateQuery: string;

        switch (operation) {
            case "Page.Media": {
                templateQuery = `query($mediaType: MediaType, $perPage: Int, $page: Int) { Page(perPage: $perPage, page: $page) { media(type: $mediaType) { ${fields.join(" ")} } } }`;

                break;
            }
            default: {
                templateQuery = `query($mediaType: MediaType) { Media(type: $mediaType) { ${fields.join(" ")} } }`;

                break;
            }
        }

        return {
            query: templateQuery,
            variables: JSON.stringify(variables),
        };
    },
    Shikimori: {},
};