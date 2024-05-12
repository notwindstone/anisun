import axios from "axios";
import {host} from "@/lib/anilibria/functions/host";
import {AdvancedSearchType} from "@/types/AniLibria/Queries/AdvancedSearchType";

const anilibriaHost = host.api()

export const advancedSearch = async ({ originalName, englishName, russianName, year, duration, filter, limit }: AdvancedSearchType) => {
    const originalCheck = `{code} ~= "${originalName}" or {names.en} ~= "${originalName}" or {names.ru} ~= "${originalName}"`
    const englishCheck = `{code} ~= "${englishName}" or {names.en} ~= "${englishName}" or {names.ru} ~= "${englishName}"`
    const russianCheck = `{code} ~= "${russianName}" or {names.en} ~= "${russianName}" or {names.ru} ~= "${russianName}"`
    const namesCheck = `(${originalCheck} or ${englishCheck} or ${russianCheck})`

    return (
        await axios.get(
        `${anilibriaHost}title/search/advanced?query=${namesCheck} and {type.length} == ${duration} and {season.year} == ${year}&filter=${filter}&limit=${limit}`
        )
    ).data.list[0]
}