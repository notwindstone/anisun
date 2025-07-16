import { VariablesType } from "@/types/Anime/Variables.type";

export type SearchType = {
    search:  string;
    type:    "id" | "name";
    filters: VariablesType;
};
