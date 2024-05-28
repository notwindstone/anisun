import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export interface WrapperResponseInterface {
    data?: {
        animes: AnimeType[]
    }
}