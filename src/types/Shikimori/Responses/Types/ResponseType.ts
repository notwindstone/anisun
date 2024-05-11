import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType";

export type ResponseType = {
    data: {
        data: {
            animes: AnimeType[]
        }
    }
}