import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";
import { QueryType } from "@/types/Anime/Query.type";
import { VariablesType } from "@/types/Anime/Variables.type";
import { QueryParametersType } from "@/constants/anilist";
import IsKeyInObject from "@/types/Utils/IsKeyInObject";

export const GraphQLClient = {
    Anilist: ({
        operation,
        fields,
        variables,
    }: {
        operation: "Media";
        fields: Array<QueryType>;
        variables: {
            page?: undefined;
            media: VariablesType;
        };
    } | {
        operation: "Page.Media";
        fields: Array<QueryType>;
        variables: {
            page: {
                perPage: number;
                page: number;
            },
            media: VariablesType;
        };
    }): GraphQLBuilderResponseType<string, string> => {
        const mediaVariables = variables.media;
        const pageVariables = variables?.page;

        const templateMediaQueryParametersArray: Array<string> = [];
        const templateQueryVariablesArray: Array<string> = [];

        for (const key of Object.keys(mediaVariables)) {
            if (IsKeyInObject<typeof QueryParametersType>(key, QueryParametersType)) {
                const keyType = QueryParametersType[key];
                const queryParameter = `${key}: $${key}`;
                const queryVariable = `$${key}: ${keyType}`;

                templateMediaQueryParametersArray.push(queryParameter);
                templateQueryVariablesArray.push(queryVariable);
            }
        }

        const templateMediaQueryParameters = templateMediaQueryParametersArray.join(", ");
        const templateQueryVariables = templateQueryVariablesArray.join(", ");

        let templateQuery: string;
        let queryVariables: string;

        switch (operation) {
            case "Page.Media": {
                templateQuery = `query($mediaType: MediaType, $perPage: Int, $page: Int) { Page(perPage: $perPage, page: $page) { media(type: $mediaType) { ${fields.join(" ")} } } }`;
                queryVariables = JSON.stringify({
                    ...pageVariables,
                    ...mediaVariables,
                });

                break;
            }
            default: {
                templateQuery = `query(${templateQueryVariables}) { Media(${templateMediaQueryParameters}) { ${fields.join(" ")} } }`;
                queryVariables = JSON.stringify({
                    ...mediaVariables,
                });

                break;
            }
        }

        return {
            query:     templateQuery,
            variables: queryVariables,
        };
    },
    Shikimori: {},
};