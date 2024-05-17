import {SortType} from "@/types/TitlesList/Sort.type";
import { sorting } from '@/configs/globalVariables.json';

export default function translateAnimeStatus(sortingType: SortType) {
    switch (sortingType) {
        case "all":
            return sorting.all.label
        case "ongoing":
            return sorting.ongoing.label
        case "announced":
            return sorting.announced.label
        case "released":
            return sorting.released.label
        default:
            return sorting.unknown.label
    }
}