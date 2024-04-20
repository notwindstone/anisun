export type AnimeType = {
    id: string;
    malId: string;
    name: string;
    russian: string;
    english: string;
    japanese: string;
    synonyms: string[];
    kind: string;
    rating: string;
    score: number;
    status: "anons" | "ongoing" | "released";
    episodes: number;
    episodesAired: number;
    duration: number;
    airedOn: {
        year: number;
        month: number;
        day: number;
        date: string;
    };
    releasedOn: {
        year: number;
        month: number;
        day: number;
        date: string;
    };
    url: string;
    season: string;
    poster: {
        id: string;
        originalUrl: string;
        mainUrl: string;
    };
    fansubbers: string[];
    fandubbers: string[];
    licensors: string[];
    createdAt: string;
    updatedAt: string;
    nextEpisodeAt: string | null;
    isCensored: false;
    genres: {
        id: string;
        name: string;
        russian: string;
        kind: string;
    }[];
    studios: {
        id: string;
        name: string;
        imageUrl: string;
    }[];
    externalLinks: {
        id: string;
        kind: string;
        url: string;
        createdAt: string;
        updatedAt: string;
    }[];
    personRoles: {
        id: string;
        rolesRu: string[];
        rolesEn: string;
        person: {
            id: string;
            name: string;
            poster: string | null;
        }
    }[];
    characterRoles: {
        id: string;
        rolesRu: string[];
        rolesEn: string[];
        character: {
            id: string;
            name: string;
            poster: {
                id: string;
            }
        }
    }[];
    related: {
        id: string;
        anime: {
            id: string;
            name: string;
        } | null;
        manga: {
            id: string;
            name: string;
        } | null;
        relationRu: string;
        relationEn: string;
    }[];
    videos: {
        id: string;
        url: string;
        name: string;
        kind: string;
        playerUrl: string;
        imageUrl: string;
    }[];
    screenshots: {
        id: string;
        originalUrl: string;
        x166Url: string;
        x332Url: string;
    }[];
    scoresStats: {
        score: number;
        count: number;
    }[];
    statusesStats: {
        status: "planned" | "completed" | "watching" | "dropped" | "on_hold";
        count: number;
    }[];
    description: string;
}