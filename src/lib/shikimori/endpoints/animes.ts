import axios from "axios";
import {AnimeType} from "@/types/Shikimori/Responses/Types/AnimeType";
import {options} from "@/lib/shikimori/options";
import {AnimesType} from "@/types/Shikimori/Queries/AnimesType";
import {ResponseType} from "@/types/Shikimori/Responses/Types/ResponseType";

export const animes = () => {
    const byId = async ({ ids }: { ids: string }) => {
        const params = options({ ids: ids })

        return await axios
            .request(params)
            .then((response: ResponseType) => response.data.data)
    }

    const list = async ({ search, limit, status, year, order, page }: AnimesType) => {
        const params = options({
            search: search,
            limit: limit,
            status: status,
            year: year,
            order: order,
            page: page,
        })

        return await axios
            .request(params)
            .then((response: ResponseType) => response.data.data)
    }

    return {
        byId,
        list,
    }
}