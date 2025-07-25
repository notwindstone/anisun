import { FormatType } from "@/types/Anime/Queries/Format.type";

export type AnimeType = Partial<{
    id:                         number;
    airingSchedule:             Partial<{
        nodes: Partial<{
            airingAt:        number;
            episodes:        number;
            timeUntilAiring: number;
        }>;
    }>;
    averageScore:               number;
    bannerImage:                string;
    characters:                 Partial<{
        nodes: Partial<{
            image: Partial<{ large: string }>;
            name:  Partial<{ full:  string }>;
        }>;
    }>;
    countryOfOrigin:            string;
    coverImage: Partial<{
        color:                  string;
        extraLarge:             string;
        large:                  string;
        medium:                 string;
    }>;
    description:                string;
    duration:                   number;
    endDate:                    Partial<{
        day:   number;
        month: number;
        year:  number;
    }>;
    episodes:                   number;
    externalLinks:              Partial<{
        color: string;
        site:  string;
        icon:  string;
        url:   string;
    }>;
    favourites:                 number;
    format:                     FormatType;
    genres:                     Array<string>;
    hashtag:                    string;
    idMal:                      number;
    isAdult:                    boolean;
    isFavourite:                boolean;
    isFavouriteBlocked:         boolean;
    isLicensed:                 boolean;
    isLocked:                   boolean;
    isRecommendationBlocked:    boolean;
    isReviewBlocked:            boolean;
    meanScore:                  number;
    mediaListEntry:             Partial<{
        progress: number;
        score:    number;
    }>; /** peak */
    modNotes:                   string;
    nextAiringEpisode:          string // should change;
    popularity:                 number;
    rankings:                   string // should change;
    recommendations:            string // should change;
    relations:                  string // should change;
    reviews:                    string // should change;
    season:                     string // should change;
    seasonInt:                  number;
    seasonYear:                 number;
    siteUrl:                    string;
    source:                     string // should change;
    staff:                      string // should change;
    startDate:                  string // should change;
    stats:                      string // should change;
    status:                     string // should change;
    streamingEpisodes:          string // should change;
    studios:                    string // should change;
    synonyms:                   string // should change;
    tags:                       string // should change;
    title: Partial<{
        english:                string;
        native:                 string;
        romaji:                 string;
        userPreferred:          string;
    }>;
    trailer:                    string // should change;
    trending:                   number;
    trends:                     string // should change;
    type:                       string // should change;
    updatedAt:                  number;
    volumes:                    number;
}>;
