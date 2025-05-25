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
            // Type guards
            if (IsKeyInObject<typeof QueryParametersType>(key, QueryParametersType)) {
                const keyType = QueryParametersType[key];

                // param: $param
                const queryParameter = `${key}: $${key}`;

                // $param: ParamType
                const queryVariable = `$${key}: ${keyType}`;

                templateMediaQueryParametersArray.push(queryParameter);
                templateQueryVariablesArray.push(queryVariable);
            }
        }

        const templateMediaQueryParameters = templateMediaQueryParametersArray.join(", ");
        const templateQueryVariables = templateQueryVariablesArray.join(", ");

        const fieldMap = new Map<string, {
            children: Set<string> | undefined;
            value: string;
            root: string;
            isRoot: boolean;
        }>();
        const fieldQueriesObject: Record<string, string> = {};

        for (const field of fields) {
            const queryFields = field.split(".");
            let partIndex = queryFields.length - 1;

            fieldQueriesObject[queryFields[0]] = queryFields.length > 1
                ? `${queryFields[0]} {`
                : queryFields[0];

            while (queryFields[partIndex] !== undefined) {
                const part = queryFields[partIndex];
                const nextPart = queryFields[partIndex + 1];
                const fieldChildren = fieldMap.get(part)?.children ?? new Set<string>();

                fieldChildren.add(nextPart);
                fieldMap.set(part, {
                    children: fieldChildren,
                    value:    part,
                    root:     queryFields[0],
                    isRoot:   partIndex === 0,
                });

                partIndex--;
            }
        }

        const fieldMapValues = fieldMap.values();

        for (const field of fieldMapValues) {
            const { value, children, root, isRoot } = field;
            const fieldQueryObject = fieldQueriesObject[root];

            if (isRoot) {
                continue;
            }

            if (children === undefined) {
                fieldQueriesObject[root] = fieldQueryObject + `${value}`;

                continue;
            }

            fieldQueriesObject[root] = fieldQueryObject + `${value}`;
        }

        console.log(fieldMap, fieldQueriesObject);

        let templateQuery: string;
        let queryVariables: string;

        switch (operation) {
            case "Page.Media": {
                templateQuery = `query(${templateQueryVariables}, $perPage: Int, $page: Int) { Page(perPage: $perPage, page: $page) { media(${templateMediaQueryParameters}) { ${fields.join(" ")} } } }`;
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