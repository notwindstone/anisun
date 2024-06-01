import {options} from "@/lib/shikimori/options";
import axios from "axios";
import {ResponseInterface} from "@/types/Shikimori/Responses/Interfaces/Response.interface";
import {OptionType} from "@/types/Shikimori/Queries/Option.type";
import {GenresType} from "@/types/Shikimori/Queries/Genres.type";

export const genres = () => {
    const filters: OptionType[] = [
        "id",
        "kind",
        "name",
        "russian",
    ];

    const all = async ({ entryType }: GenresType) => {
        const params = options({
            filter: filters,
            queryType: "genres",
            entryType: entryType,
        });

        return await axios
            .request(params)
            .then((response: ResponseInterface) => response.data.data)
            .catch(() => {
                return {
                    genres: []
                };
            });
    };

    return {
        all: all,
    };
};