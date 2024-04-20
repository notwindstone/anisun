import axios from "axios";
import {AnimeType} from "@/types/Shikimori/AnimeType";
import {options} from "@/lib/shikimori/options";
import {StatusType} from "@/types/Shikimori/StatusType";

export const animes = ({ limit, status, year, order } : { limit: number, status: StatusType, year: string, order: string }) => {
    const params = options({ limit, status, year, order })

    const list = async () => {
        return await axios
            .request(params)
            .then((response: { data: { data: { animes: AnimeType[] } } }) => response.data.data)
    }

    return {
        list,
    }
}