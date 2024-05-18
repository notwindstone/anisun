import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export type ResponseType = {
    data: {
        data: {
            animes: AnimeType[]
        }
    }
}