import { GraphQLBuilderResponseType } from "@/types/General/GraphQLBuilderResponse.type";
import { QueryType } from "@/types/Anime/Query.type";
import { VariablesType } from "@/types/Anime/Variables.type";
import { QueryParametersType } from "@/constants/anilist";
import IsKeyInObject from "@/types/Utils/IsKeyInObject";

type ShittyNode = {
    children: Record<string, ShittyNode>;
};

function formatArrayToGraphQLFields(entries: string[]) {
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
        queries,
    }: {
        queries: Array<{
            alias:     string;
            name:      "Media" | "Page.Media";
            fields:    Array<QueryType>;
            variables: {
                page: {
                    perPage: number;
                    page:    number;
                } | "placeholder";
                media: VariablesType;
            };
        }>;
    }): GraphQLBuilderResponseType<string, string> => {
        const allVariables: Array<string> = [];

        for (const query of queries) {
            const { alias, name, variables, fields } = query;

            const mediaVariables = variables.media;
            const pageVariables = variables.page === "placeholder" ? variables.page : {};

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
            const templateQueryFields = formatArrayToGraphQLFields(fields);

            const queryVariables: string = JSON.stringify({
                ...pageVariables,
                ...mediaVariables,
            });
            const initialQueryStrings = {
                start: `query(${templateQueryVariables}, $perPage: Int, $page: Int) {`,
                end:   "}",
            };
        }

        let templateQuery: string = "";

        for (const operation of operations) {
            const alias = operation.alias;
            const name = operation.name;

            switch (name) {
                case "Page.Media": {
                    templateQuery = templateQuery + `${aliasedQuery}Page(perPage: $perPage, page: $page) { media(${templateMediaQueryParameters}) { ${templateQueryFields} } }`;

                    break;
                }
                default: {
                    templateQuery = templateQuery + `${aliasedQuery}Media(${templateMediaQueryParameters}) { ${templateQueryFields} }`;

                    break;
                }
            }
        }

        return {
            query:     `${initialQueryStrings.start} ${templateQuery} ${initialQueryStrings.end}`,
            variables: queryVariables,
        };
    },
    Shikimori: {},
};
