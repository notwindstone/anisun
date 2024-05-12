import axios from "axios";
import {host} from "@/lib/anilibria/functions/host";
import {AdvancedSearchInterface} from "@/types/AniLibria/Queries/AdvancedSearchInterface";

const anilibriaHost = host.api()

export const advancedSearch = async ({ title, year, duration, filter, limit }: AdvancedSearchInterface) => {
    return (await axios.get(`${anilibriaHost}title/search/advanced?query=({names.en} ~= "${title}" or {names.ru} ~= "${title}") and {type.length} == ${duration} and {season.year} == ${year}&filter=${filter}&limit=${limit}`)).data.list[0]
}