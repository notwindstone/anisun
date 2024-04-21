import axios from "axios";
import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType";
import {options} from "@/lib/shikimori/options";
import {AnimesType} from "@/types/Shikimori/Queries/AnimesType";

export const animes = () => {
    const byId = async ({ ids }: { ids: string }) => {
        const params = options({ ids: ids })

        return await axios
            .request(params)
            .then((response: { data: { data: { animes: AnimeType[] } } }) => response.data.data)
    }

    const list = async ({ search, limit, status, year, order }: AnimesType) => {
        const params = options({
            search: search,
            limit: limit,
            status: status,
            year: year,
            order: order
        })

        return await axios
            .request(params)
            .then((response: { data: { data: { animes: AnimeType[] } } }) => response.data.data)
    }

    return {
        byId,
        list,
    }
}