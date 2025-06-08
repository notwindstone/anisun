export type GraphQLBuilderResponseType<QueryType, VariablesType> = {
    query: QueryType;
    variables: VariablesType;
};