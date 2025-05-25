import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";
import { QueryType } from "@/types/Anime/Query.type";
import { VariablesType } from "@/types/Anime/Variables.type";
import { QueryParametersType } from "@/constants/anilist";
import IsKeyInObject from "@/types/Utils/IsKeyInObject";

/*
 * why does typescript accept this shit
 * but throw an error if i write
 *
 * type ErrorNode = Record<string, ErrorNode>;
 */
type ShittyNode = {
    children: Record<string, ShittyNode>;
};

function formatArrayToGraphQLString(entries: string[]) {
    const root: ShittyNode = { children: {} };

    for (const entry of entries) {
        const parts = entry.split(".");
        let currentNode = root;

        for (const part of parts) {
            if (currentNode.children[part] === undefined) {
                currentNode.children[part] = { children: {} };
            }

            currentNode = currentNode.children[part];
        }
    }

    function generateString(nodeChildren: Record<string, ShittyNode>) {
        const parts: Array<string> = [];
        const nodeChildrenKeys = Object.keys(nodeChildren);

        for (const key of nodeChildrenKeys) {
            const childNode = nodeChildren[key];

            if (Object.keys(childNode.children).length === 0) {
                parts.push(key);

                continue;
            }

            const inner = generateString(childNode.children);

            parts.push(`${key} {${inner}}`);
        }

        return parts.join(" ");
    }

    return generateString(root.children);
}

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
        const templateQueryFields = formatArrayToGraphQLString(fields);

        let templateQuery: string;
        let queryVariables: string;

        switch (operation) {
            case "Page.Media": {
                templateQuery = `query(${templateQueryVariables}, $perPage: Int, $page: Int) { Page(perPage: $perPage, page: $page) { media(${templateMediaQueryParameters}) { ${templateQueryFields} } } }`;
                queryVariables = JSON.stringify({
                    ...pageVariables,
                    ...mediaVariables,
                });

                break;
            }
            default: {
                templateQuery = `query(${templateQueryVariables}) { Media(${templateMediaQueryParameters}) { ${templateQueryFields} } }`;
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