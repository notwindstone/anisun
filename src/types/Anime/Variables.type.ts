export type VariablesType = {
    type: "ANIME" | "MANGA";
} & Partial<{
    id: number;
    idMal: number;
    season: "WINTER" | "SPRING" | "SUMMER" | "FALL";
    seasonYear: number;
    format: "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | "MANGA" | "NOVEL" | "ONE_SHOT";
    status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
    sort: "ID" | "ID_DESC" | "TITLE_ROMAJI" | "TITLE_ROMAJI_DESC" | "TITLE_ENGLISH" | "TITLE_ENGLISH_DESC" | "TITLE_NATIVE" | "TITLE_NATIVE_DESC" | "TYPE" | "TYPE_DESC" | "FORMAT" | "FORMAT_DESC" | "START_DATE" | "START_DATE_DESC" | "END_DATE" | "END_DATE_DESC" | "SCORE" | "SCORE_DESC" | "POPULARITY" | "POPULARITY_DESC" | "TRENDING" | "TRENDING_DESC" | "EPISODES" | "EPISODES_DESC" | "DURATION" | "DURATION_DESC" | "STATUS" | "STATUS_DESC" | "CHAPTERS" | "CHAPTERS_DESC" | "VOLUMES" | "VOLUMES_DESC" | "UPDATED_AT" | "UPDATED_AT_DESC" | "SEARCH_MATCH" | "FAVOURITES" | "FAVOURITES_DESC";
    episodes: number;
    duration: number;
    chapters: number;
    isAdult: boolean;
    genre: string;
    tag: string;
    onList: boolean;
    licensedBy: string;
    licensedById: number;
    averageScore: number;
    popularity: number;
    search: string;
}>;