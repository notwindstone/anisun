export type SearchType = {
    search:  string;
    type:    "id" | "name";
    filters: Record<string, string | number | boolean>;
};
