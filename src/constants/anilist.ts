import { getRelativeDate } from "@/lib/misc/getRelativeDate";
import { QueryType } from "@/types/Anime/Query.type";
import { SeasonType } from "@/types/Anime/Queries/Season.type";
import { FormatType } from "@/types/Anime/Queries/Format.type";
import { StatusType } from "@/types/Anime/Queries/Status.type";
import { VariablesType } from "@/types/Anime/Variables.type";
import { SourceType } from "@/types/Anime/Queries/Source.type";
import { SortType } from "@/types/Anime/Queries/Sort.type";

export const AnilistFilterKeys = {
    Score:       "averageScore_greater",
    Sort:        "sort",
    Genres:      "genre_in",
    Year:        "seasonYear",
    Season:      "season",
    Format:      "format",
    Status:      "status",
    Source:      "source",
    ShowMyAnime: "onList",
    Censored:    "isAdult",
    Tags:        "tag_in",
} as const;
export const AnilistRangedFilterKeys = {
    RangedYears:    ["startDate_greater", "endDate_lesser"],
    RangedEpisodes: ["episodes_greater", "episodes_lesser"],
    Duration:       ["duration_greater", "duration_lesser"],
} as const;
export const AnilistAllowedFilterKeys: Set<string> = new Set([
    ...(Object.values(AnilistFilterKeys)),
    ...AnilistRangedFilterKeys.RangedYears,
    ...AnilistRangedFilterKeys.RangedEpisodes,
    ...AnilistRangedFilterKeys.Duration,
]);
export const AnilistPageMediaLimitDefault = 18;
export const AnilistPageMediaLimitMax = 50;
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
    ArrayOfString:   "[String]",
    MediaSeason:     "MediaSeason",
    MediaType:       "MediaType",
    MediaFormat:     "MediaFormat",
    MediaStatus:     "MediaStatus",
    MediaListStatus: "MediaListStatus",
    MediaSource:     "MediaSource",
    MediaSort:       "[MediaSort]",
    FuzzyDateInt:    "FuzzyDateInt",
};
export const QueryParametersType: Record<keyof VariablesType, string> = {
    id:                   ParameterType.Int,
    idMal:                ParameterType.Int,
    season:               ParameterType.MediaSeason,
    seasonYear:           ParameterType.Int,
    type:                 ParameterType.MediaType,
    format:               ParameterType.MediaFormat,
    status:               ParameterType.MediaStatus,
    episodes:             ParameterType.Int,
    duration:             ParameterType.Int,
    isAdult:              ParameterType.Boolean,
    genre:                ParameterType.String,
    genre_in:             ParameterType.ArrayOfString,
    tag_in:               ParameterType.ArrayOfString,
    tag:                  ParameterType.String,
    onList:               ParameterType.Boolean,
    licensedBy:           ParameterType.String,
    licensedById:         ParameterType.Int,
    averageScore:         ParameterType.Int,
    averageScore_greater: ParameterType.Int,
    popularity:           ParameterType.Int,
    search:               ParameterType.String,
    sort:                 ParameterType.MediaSort,
    source:               ParameterType.MediaSource,
    userName:             ParameterType.String,
    mediaListStatus:      ParameterType.MediaListStatus,
    startDate_greater:    ParameterType.FuzzyDateInt,
    endDate_lesser:       ParameterType.FuzzyDateInt,
    episodes_greater:     ParameterType.Int,
    episodes_lesser:      ParameterType.Int,
    duration_greater:     ParameterType.Int,
    duration_lesser:      ParameterType.Int,
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
        name:  "Popularity",
        value: "POPULARITY_DESC",
    },
    {
        name:  "Highest Score",
        value: "SCORE_DESC",
    },
    {
        name:  "Trending",
        value: "TRENDING_DESC",
    },
    {
        name:  "Favourites",
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
    parameter:            typeof AnilistFilterKeys[keyof typeof AnilistFilterKeys];
    label:                string;
    options:              Array<string | number | { name: string; value: string; }>;
}> => ([
    {
        additionalClassNames: "",
        multiple:             true,
        searchable:           true,
        parameter:            AnilistFilterKeys.Genres,
        label:                "Genres",
        options:              genres,
    },
    {
        additionalClassNames: "",
        multiple:             false,
        searchable:           false,
        parameter:            AnilistFilterKeys.Year,
        label:                "Year",
        options:              AnilistQueryYears,
    },
    {
        additionalClassNames: "",
        multiple:             false,
        searchable:           false,
        parameter:            AnilistFilterKeys.Season,
        label:                "Season",
        options:              AnilistSeasons,
    } ,
    {
        additionalClassNames: "",
        multiple:             false,
        searchable:           false,
        parameter:            AnilistFilterKeys.Format,
        label:                "Format",
        options:              AnilistFormats,
    },
    {
        additionalClassNames: "lg:col-span-2",
        multiple:             false,
        searchable:           false,
        parameter:            AnilistFilterKeys.Status,
        label:                "Airing Status",
        options:              AnilistAiringStatuses,
    },
    {
        additionalClassNames: "lg:col-span-2",
        multiple:             false,
        searchable:           false,
        parameter:            AnilistFilterKeys.Source,
        label:                "Source Material",
        options:              AnilistSourceMaterials,
    },
]);
export const CheckboxFilters: Array<{
    parameter: typeof AnilistFilterKeys[keyof typeof AnilistFilterKeys] | "isRangedYear";
    label:     string;
}> = [
    {
        parameter: AnilistFilterKeys.ShowMyAnime,
        label:     "Only Show My Anime",
    },
    {
        parameter: AnilistFilterKeys.Censored,
        label:     "Adult",
    },
];
export const SliderFilters: Array<{
    parameter: typeof AnilistRangedFilterKeys[keyof typeof AnilistRangedFilterKeys];
    label:     string;
    fixed:     {
        min:  number;
        max:  number;
        step: number;
    };
    additionalClassNames: string;
}> = [
    {
        parameter: AnilistRangedFilterKeys.RangedYears,
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
        parameter: AnilistRangedFilterKeys.RangedEpisodes,
        label:     "Episodes",
        fixed:     {
            min:  0,
            max:  150,
            step: 1,
        },
        additionalClassNames: "",
    },
    {
        parameter: AnilistRangedFilterKeys.Duration,
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
    parameter: typeof AnilistFilterKeys[keyof typeof AnilistFilterKeys] | "perPage";
    label:     string;
    fixed:     {
        min:  number;
        max:  number;
        step: number;
    };
    reverse: boolean;
}> = [
    {
        parameter: AnilistFilterKeys.Score,
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
