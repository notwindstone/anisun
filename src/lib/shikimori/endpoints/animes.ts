import axios from "axios";
import {options} from "@/lib/shikimori/options";
import {AnimesType} from "@/types/Shikimori/Queries/Animes.type";
import {OptionType} from "@/types/Shikimori/Queries/Option.type";
import {ResponseInterface} from "@/types/Shikimori/Responses/Interfaces/Response.interface";

export const animes = () => {
    const byId = async ({ ids, filter }: { ids: string, filter?: OptionType[] }) => {
        const params = options({ ids: ids, filter: filter });

        return await axios
            .request(params)
            .then((response: ResponseInterface) => response.data.data)
            .catch(() => {
                return {
                    animes: []
                };
            });
    };

    const list = async ({ search, limit, genre, status, studio, year, order, page, filter }: AnimesType) => {
        const params = options({
            search: search,
            limit: limit,
            genre: genre,
            status: status,
            studio: studio,
            year: year,
            order: order,
            page: page,
            filter: filter,
        });

        return await axios
            .request(params)
            .then((response: ResponseInterface) => response.data.data)
            .catch(() => {
                return {
                    animes: []
                };
            });
    };

    const similar = async ({ id }: { id: string })=> {
        return await axios
            .get(`https://shikimori.one/api/animes/${id}/similar`)
            .then((response) => response.data)
            .catch(() => {
                return {
                    animes: []
                };
            });
    };

    return {
        byId,
        list,
        similar,
    };
};