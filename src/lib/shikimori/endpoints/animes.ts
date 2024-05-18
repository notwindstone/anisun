import axios from "axios";
import {options} from "@/lib/shikimori/options";

export const animes = () => {
    const byId = async ({ ids, filter }: { ids: string, filter: string[] }) => {
        const params = options({ ids: ids })

        return await axios
            .request(params)
            .then((response: any) => response.data.data)
    }

    const list = async ({ search, limit, status, year, order, page, filter }: any) => {
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
            .then((response: any) => response.data.data)
    }

    return {
        byId,
        list,
    }
}