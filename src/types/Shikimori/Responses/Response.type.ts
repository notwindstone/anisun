import {AnimeType} from "@/types/Shikimori/Responses/Anime.type";

export type ResponseType = {
    data: {
        data: {
            animes: AnimeType[]
        }
    }
}