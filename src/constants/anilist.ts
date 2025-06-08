import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { QueryType } from "@/types/Anime/Query.type";

// If it's January 1, then ofc there will be no good animes
// that were released on January 1, so we go back 30 days before.
export const CurrentAnimeYear = getRelativeDate({ days: -30 }).getFullYear();
export const GeneralFields: Array<QueryType> = [
    "id",
    "idMal",
    "title.english",
    "title.native",
    "title.romaji",
    "meanScore",
    "averageScore",
    "coverImage.extraLarge",
    "relations.nodes.title.english",
    "relations.nodes.title.native",
    "relations.nodes.title.romaji",
];
export const ParameterType = {
    Int:         "Int",
    String:      "String",
    Boolean:     "Boolean",
    MediaSeason: "MediaSeason",
    MediaType:   "MediaType",
    MediaFormat: "MediaFormat",
    MediaStatus: "MediaStatus",
    MediaSort:   "[MediaSort]",
};
export const QueryParametersType = {
    id:           ParameterType.Int,
    idMal:        ParameterType.Int,
    season:       ParameterType.MediaSeason,
    seasonYear:   ParameterType.Int,
    type:         ParameterType.MediaType,
    format:       ParameterType.MediaFormat,
    status:       ParameterType.MediaStatus,
    episodes:     ParameterType.Int,
    duration:     ParameterType.Int,
    isAdult:      ParameterType.Boolean,
    genre:        ParameterType.String,
    tag:          ParameterType.String,
    onList:       ParameterType.Boolean,
    licensedBy:   ParameterType.String,
    licensedById: ParameterType.Int,
    averageScore: ParameterType.Int,
    popularity:   ParameterType.Int,
    search:       ParameterType.String,
    sort:         ParameterType.MediaSort,
};