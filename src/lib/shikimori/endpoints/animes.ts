import axios from "axios";
import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType";
import {options} from "@/lib/shikimori/options";
import {AnimesType} from "@/types/Shikimori/Queries/AnimesType";

export const animes = () => {
    const list = async ({ search, limit, status, year, order }: AnimesType) => {
        const params = options({ search, limit, status, year, order })

        return await axios
            .request(params)
            .then((response: { data: { data: { animes: AnimeType[] } } }) => response.data.data)
    }

    return {
        list,
    }
}