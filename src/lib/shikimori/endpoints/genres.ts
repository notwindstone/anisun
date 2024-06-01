import {options} from "@/lib/shikimori/options";
import axios from "axios";
import {OptionType} from "@/types/Shikimori/Queries/Option.type";
import {GenresType} from "@/types/Shikimori/Queries/Genres.type";
import {GenresResponseInterface} from "@/types/Shikimori/Responses/Interfaces/GenresResponse.interface";

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
            .then((response: GenresResponseInterface) => response.data.data)
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