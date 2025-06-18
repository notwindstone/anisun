import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";
import { QueryType } from "@/types/Anime/Query.type";
import { VariablesType } from "@/types/Anime/Variables.type";
import { ParameterType, QueryParametersType } from "@/constants/anilist";
import IsKeyInObject from "@/types/Utils/IsKeyInObject";
import capitalizeWord from "@/utils/misc/capitalizeWord";
import formatArrayToGraphQLFields from "@/utils/misc/formatArrayToGraphQLFields";

export const GraphQLClient = {
    Anilist: ({
        queries,
    }: {
        queries: Array<{
            /** A query name that will be used both in response and request body */
            alias:     string;
            name:      "Media" | "Page.Media";
            fields:    Array<QueryType>;
            variables: {
                page: {
                    perPage: number;
                    page:    number;
                } | Record<string, never>;
                media: VariablesType;
            };
        }>;
    }): GraphQLBuilderResponseType<string, string> => {
        let allMediaVariables: Partial<VariablesType> = {};
        let allPageVariable = {};
        const templateQueryVariablesArray: Array<string> = [];
        const templateQueryBodyOperationsArray: Array<string> = [];

        for (const query of queries) {
            const { alias, name, fields, variables } = query;
            const capitalizedAlias = capitalizeWord(alias);

            const currentMediaVariables = variables.media;
            const currentPageVariables = variables?.page;

            // make sure to not overwrite query variables
            const aliasedCurrentMediaVariables = Object.fromEntries(
                Object.entries(currentMediaVariables).map(([key, value]) => (
                    [`${key}${capitalizedAlias}`, value]
                )),
            );
            const aliasedCurrentPageVariables = Object.fromEntries(
                Object.entries(currentPageVariables).map(([key, value]) => (
                    [`${key}${capitalizedAlias}`, value]
                )),
            );

            allMediaVariables = {
                ...allMediaVariables,
                ...aliasedCurrentMediaVariables,
            };
            allPageVariable = {
                ...allPageVariable,
                ...aliasedCurrentPageVariables,
            };

            const templateMediaQueryParametersArray: Array<string> = [];

            for (const key of Object.keys(currentMediaVariables)) {
                // Type guards
                if (IsKeyInObject<typeof QueryParametersType>(key, QueryParametersType)) {
                    const keyType = QueryParametersType[key];
                    const aliasedKeyName = `${key}${capitalizedAlias}`;

                    // param: $param
                    const queryParameter = `${key}: $${aliasedKeyName}`;

                    // $param: ParamType
                    const queryVariable = `$${aliasedKeyName}: ${keyType}`;

                    templateMediaQueryParametersArray.push(queryParameter);
                    templateQueryVariablesArray.push(queryVariable);
                }
            }

            for (const key of Object.keys(currentPageVariables)) {
                const keyType = ParameterType.Int;
                const aliasedKeyName = `${key}${capitalizedAlias}`;

                // $param: ParamType
                const queryVariable = `$${aliasedKeyName}: ${keyType}`;

                templateQueryVariablesArray.push(queryVariable);
            }

            const templateMediaQueryParameters = templateMediaQueryParametersArray.join(", ");
            const templateQueryFields = formatArrayToGraphQLFields(fields);

            let templateQuery: string;

            switch (name) {
                case "Page.Media": {
                    templateQuery = `${capitalizedAlias}: Page(perPage: $perPage${capitalizedAlias}, page: $page${capitalizedAlias}) { media(${templateMediaQueryParameters}) { ${templateQueryFields} } }`;

                    break;
                }
                default: {
                    templateQuery = `${capitalizedAlias}: Media(${templateMediaQueryParameters}) { ${templateQueryFields} }`;

                    break;
                }
            }

            templateQueryBodyOperationsArray.push(templateQuery);
        }

        const templateQueryVariables = templateQueryVariablesArray.join(", ");

        const queryBody = `query(${templateQueryVariables}) { ${templateQueryBodyOperationsArray.join(" ")} }`;
        const queryVariables = JSON.stringify({
            ...allPageVariable,
            ...allMediaVariables,
        });

        return {
            query:     queryBody,
            variables: queryVariables,
        };
    },
    Shikimori: {},
};
