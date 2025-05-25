export type VariablesType = {
    type: "ANIME" | "MANGA";
} & Partial<{
    id: number;
    idMal: number;
    season: "WINTER" | "SPRING" | "SUMMER" | "FALL";
    seasonYear: number;
    format: "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | "MANGA" | "NOVEL" | "ONE_SHOT";
    status: "FINISHED" | "RELEASING" | "NOT_YET_RELEASED" | "CANCELLED" | "HIATUS";
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