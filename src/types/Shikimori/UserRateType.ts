import {AnimeType} from "@/types/Shikimori/AnimeType";
import {UserRateStatusType} from "@/types/Shikimori/UserRateStatusType";

export type UserRateType = {
    anime: AnimeType | null;
    chapters: number;
    createdAt: string;
    episodes: number;
    id: string;
    rewatches: number;
    score: number;
    status: UserRateStatusType;
    text: string | null;
    updatedAt: string;
    volumes: number;
}