import axios from "axios";
import {host} from "@/lib/anilibria/functions/host";

const anilibriaHost = host.api()

export const advancedSearch = async ({ title, year, duration, filter, limit }: { title: string | null, year: string | undefined }) => {
    return (await axios.get(`${anilibriaHost}title/search/advanced?query={names.en} ~= "${title}" or {names.ru} ~= "${title}" and {type.length} == ${duration} and {season.year} == ${year}&filter=${filter}&limit=${limit}`)).data.list[0]
}