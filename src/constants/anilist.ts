import { getRelativeDate } from "@/lib/misc/getRelativeDate";
import { QueryType } from "@/types/Anime/Query.type";
import { SeasonType } from "@/types/Anime/Queries/Season.type";
import { FormatType } from "@/types/Anime/Queries/Format.type";
import { StatusType } from "@/types/Anime/Queries/Status.type";
import { VariablesType } from "@/types/Anime/Variables.type";
import { SourceType } from "@/types/Anime/Queries/Source.type";
import { SortType } from "@/types/Anime/Queries/Sort.type";

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
    MediaSource:     "MediaSource",
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
    source:          ParameterType.MediaSource,
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
    value: SourceType;
}> = [
    {
        name:  "Original",
        value: "ORIGINAL",
    },
    {
        name:  "Manga",
        value: "MANGA",
    },
    {
        name:  "Light Novel",
        value: "LIGHT_NOVEL",
    },
    {
        name:  "Web Novel",
        value: "WEB_NOVEL",
    },
    {
        name:  "Novel",
        value: "NOVEL",
    },
    {
        name:  "Anime",
        value: "ANIME",
    },
    {
        name:  "Visual Novel",
        value: "VISUAL_NOVEL",
    },
    {
        name:  "Video Game",
        value: "VIDEO_GAME",
    },
    {
        name:  "Doujinshi",
        value: "DOUJINSHI",
    },
    {
        name:  "Comic",
        value: "COMIC",
    },
    {
        name:  "Live Action",
        value: "LIVE_ACTION",
    },
    {
        name:  "Game",
        value: "GAME",
    },
    {
        name:  "Multimedia Project",
        value: "MULTIMEDIA_PROJECT",
    },
    {
        name:  "Picture Book",
        value: "PICTURE_BOOK",
    },
    {
        name:  "Other",
        value: "OTHER",
    },
];
export const AnilistSortValues: Array<{
    name:  string;
    value: SortType;
}> = [
    {
        name:  "Alphabet",
        value: "TITLE_ROMAJI",
    },
    {
        name:  "Most Popular",
        value: "POPULARITY_DESC",
    },
    {
        name:  "Highest Score",
        value: "SCORE_DESC",
    },
    {
        name:  "Most Trending",
        value: "TRENDING_DESC",
    },
    {
        name:  "Most Favourites",
        value: "FAVOURITES_DESC",
    },
    {
        name:  "Newest",
        value: "START_DATE_DESC",
    },
];
export const getSelectableFilters = (genres: Array<string>): Array<{
    additionalClassNames: string;
    multiple:             boolean;
    searchable:           boolean;
    parameter:            string;
    label:                string;
    options:              Array<string | number | { name: string; value: string; }>;
}> => ([
    {
        additionalClassNames: "",
        multiple:             true,
        searchable:           true,
        parameter:            "genre",
        label:                "Genres",
        options:              genres,
    },
    {
        additionalClassNames: "",
        multiple:             false,
        searchable:           false,
        parameter:            "year",
        label:                "Year",
        options:              AnilistQueryYears,
    },
    {
        additionalClassNames: "",
        multiple:             false,
        searchable:           false,
        parameter:            "season",
        label:                "Season",
        options:              AnilistSeasons,
    },
    {
        additionalClassNames: "",
        multiple:             false,
        searchable:           false,
        parameter:            "format",
        label:                "Format",
        options:              AnilistFormats,
    },
    {
        additionalClassNames: "lg:col-span-2",
        multiple:             false,
        searchable:           false,
        parameter:            "status",
        label:                "Airing Status",
        options:              AnilistAiringStatuses,
    },
    {
        additionalClassNames: "lg:col-span-2",
        multiple:             false,
        searchable:           false,
        parameter:            "source",
        label:                "Source Material",
        options:              AnilistSourceMaterials,
    },
]);
export const CheckboxFilters: Array<{
    parameter: string;
    label:     string;
}> = [
    {
        parameter: "isRangedYear",
        label:     "Select Year Range",
    },
    {
        parameter: "onlyShowMyAnime",
        label:     "Only Show My Anime",
    },
    {
        parameter: "hideMyAnime",
        label:     "Hide My Anime",
    },
    {
        parameter: "isAdult",
        label:     "Censored",
    },
];
export const SliderFilters: Array<{
    parameter: string;
    label:     string;
    fixed:     {
        min:  number;
        max:  number;
        step: number;
    };
    additionalClassNames: string;
}> = [
    {
        parameter: "yearRange",
        label:     "Year Range",
        fixed:     {
            min:  1970,
            // get the next year
            max:  (new Date()).getFullYear() + 1,
            step: 1,
        },
        additionalClassNames: "",
    },
    {
        parameter: "episodes",
        label:     "Episodes",
        fixed:     {
            min:  0,
            max:  150,
            step: 1,
        },
        additionalClassNames: "",
    },
    {
        parameter: "duration",
        label:     "Duration",
        fixed:     {
            min:  0,
            max:  170,
            step: 1,
        },
        additionalClassNames: "lg:col-span-1 sm:col-span-2",
    },
];
export const SingleSliderFilters: Array<{
    parameter: string;
    label:     string;
    fixed:     {
        min:  number;
        max:  number;
        step: number;
    };
    reverse: boolean;
}> = [
    {
        parameter: "averageScore_greater",
        label:     "Score",
        fixed:     {
            min:  0,
            max:  100,
            step: 1,
        },
        reverse: true,
    },
    {
        parameter: "perPage",
        label:     "Limit",
        fixed:     {
            min:  1,
            max:  50,
            step: 1,
        },
        reverse: false,
    },
];
