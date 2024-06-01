import {GenreType} from "@/types/Shikimori/Responses/Types/Genre.type";

export interface GenresResponseInterface {
    data: {
        data: {
            animes: GenreType[]
        }
    }
}