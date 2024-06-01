import {AnimeType} from "@/types/Shikimori/Responses/Types/Anime.type";

export interface AnimesResponseInterface {
    data: {
        data: {
            animes: AnimeType[]
        }
    }
}