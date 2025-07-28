import { FormatType } from "@/types/Anime/Queries/Format.type";
import { SeasonType } from "@/types/Anime/Queries/Season.type";
import { StatusType } from "@/types/Anime/Queries/Status.type";

export type AnimeType = Partial<{
    id:                         number;
    airingSchedule:             Partial<{
        nodes: Array<Partial<{
            airingAt:        number;
            episodes:        number;
            timeUntilAiring: number;
        }>>;
    }>;
    averageScore:               number;
    bannerImage:                string;
    characters:                 Partial<{
        nodes: Array<Partial<{
            image: Partial<{ large: string }>;
            name:  Partial<{ full:  string }>;
        }>>;
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
    }>;
    modNotes:                   string;
    nextAiringEpisode:          Partial<{
        airingAt:        number;
        episode:         number;
        timeUntilAiring: number;
    }>;
    popularity:                 number;
    rankings:                   Partial<{
        allTime: boolean;
        context: string;
        format:  FormatType;
        id:      number;
        rank:    number;
        season:  SeasonType;
        type:    "POPULAR" | "RATED";
        year:    number;
    }>;
    recommendations:            Partial<{
        nodes: Array<Partial<{
            rating:              number;
            mediaRecommendation: Partial<{
                idMal:      number;
                episodes:   number;
                status:     StatusType;
                genres:     Array<string>;
                coverImage: Partial<{
                    extraLarge: string;
                }>;
                title: Partial<{
                    english: string;
                    native:  string;
                    romaji:  string;
                }>;
            }>;
        }>>;
    }>;
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
    streamingEpisodes:          Array<Partial<{
        thumbnail: string;
        title:     string;
    }>>; // should change;
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
