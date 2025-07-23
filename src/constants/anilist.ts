import { getRelativeDate } from "@/utils/misc/getRelativeDate";
import { QueryType } from "@/types/Anime/Query.type";
import { SeasonType } from "@/types/Anime/Queries/Season.type";
import { FormatType } from "@/types/Anime/Queries/Format.type";
import { StatusType } from "@/types/Anime/Queries/Status.type";
import { VariablesType } from "@/types/Anime/Variables.type";

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
    Int:             "Int",
    String:          "String",
    Boolean:         "Boolean",
    MediaSeason:     "MediaSeason",
    MediaType:       "MediaType",
    MediaFormat:     "MediaFormat",
    MediaStatus:     "MediaStatus",
    MediaListStatus: "MediaListStatus",
    MediaSort:       "[MediaSort]",
};
export const QueryParametersType: Record<keyof VariablesType, string> = {
    id:              ParameterType.Int,
    idMal:           ParameterType.Int,
    season:          ParameterType.MediaSeason,
    seasonYear:      ParameterType.Int,
    type:            ParameterType.MediaType,
    format:          ParameterType.MediaFormat,
    status:          ParameterType.MediaStatus,
    episodes:        ParameterType.Int,
    duration:        ParameterType.Int,
    isAdult:         ParameterType.Boolean,
    genre:           ParameterType.String,
    tag:             ParameterType.String,
    onList:          ParameterType.Boolean,
    licensedBy:      ParameterType.String,
    licensedById:    ParameterType.Int,
    averageScore:    ParameterType.Int,
    popularity:      ParameterType.Int,
    search:          ParameterType.String,
    sort:            ParameterType.MediaSort,
    userName:        ParameterType.String,
    mediaListStatus: ParameterType.MediaListStatus,
};
export const AnilistMinimalQueryYear = 1940;
export const DeltaYear = (new Date()).getFullYear() - AnilistMinimalQueryYear;
export const AnilistQueryYears = Array
    // we add 2 here, because we want to include current and the next year in the array too
    .from({ length: DeltaYear + 2 })
    .map((_, index) => index + AnilistMinimalQueryYear)
    .reverse();
export const AnilistSeasons: Array<{
    name:  string;
    value: SeasonType;
}> = [
    {
        name:  "Winter",
        value: "WINTER",
    },
    {
        name:  "Spring",
        value: "SPRING",
    },
    {
        name:  "Summer",
        value: "SUMMER",
    },
    {
        name:  "Fall",
        value: "FALL",
    },
];
export const AnilistFormats: Array<{
    name:  string;
    value: FormatType;
}> = [
    {
        name:  "TV Show",
        value: "TV",
    },
    {
        name:  "Movie",
        value: "MOVIE",
    },
    {
        name:  "TV Short",
        value: "TV_SHORT",
    },
    {
        name:  "Special",
        value: "SPECIAL",
    },
    {
        name:  "OVA",
        value: "OVA",
    },
    {
        name:  "ONA",
        value: "ONA",
    },
    {
        name:  "Music",
        value: "MUSIC",
    },
];
export const AnilistAiringStatuses: Array<{
    name:  string;
    value: StatusType;
}> = [
    {
        name:  "Airing",
        value: "RELEASING",
    },
    {
        name:  "Finished",
        value: "FINISHED",
    },
    {
        name:  "Not Yet Aired",
        value: "NOT_YET_RELEASED",
    },
    {
        name:  "Cancelled",
        value: "CANCELLED",
    },
    {
        name:  "Hiatus",
        value: "HIATUS",
    },
];
export const AnilistSourceMaterials: Array<{
    name:  string;
    value: number;
}> = [
    "Original",
    "Manga",
    "Light Novel",
    "Web Novel",
    "Novel",
    "Anime",
    "Visual Novel",
    "Video Game",
    "Doujinshi",
    "Comic",
    "Live Action",
    "Game",
    "Multimedia Project",
    "Picture Book",
    "Other",
];
