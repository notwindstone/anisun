import { SeasonType } from "@/types/Anime/Queries/Season.type";
import { FormatType } from "@/types/Anime/Queries/Format.type";
import { StatusType } from "@/types/Anime/Queries/Status.type";
import { SortType } from "@/types/Anime/Queries/Sort.type";

export type VariablesType = Partial<{
    type:            "ANIME" | "MANGA";
    id:              number;
    idMal:           number;
    season:          SeasonType;
    seasonYear:      number;
    format:          FormatType;
    status:          StatusType;
    sort:            SortType;
    episodes:        number;
    duration:        number;
    isAdult:         boolean;
    genre:           string;
    tag:             string;
    onList:          boolean;
    licensedBy:      string;
    licensedById:    number;
    averageScore:    number;
    popularity:      number;
    search:          string;
    // MediaList
    userName:        string;
    mediaListStatus: "COMPLETED" | "CURRENT" | "DROPPED" | "PAUSED" | "PLANNING" | "REPEATING";
}>;
