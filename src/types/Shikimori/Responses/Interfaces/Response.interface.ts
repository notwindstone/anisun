import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export interface ResponseInterface {
    data: {
        animes: AnimeType[]
    }
}