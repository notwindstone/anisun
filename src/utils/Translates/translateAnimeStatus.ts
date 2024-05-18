import { variables } from '@/configs/variables';
import {StatusType} from "@/types/Shikimori/General/Status.type";

export default function translateAnimeStatus(sortingType: StatusType) {
    const sorting = variables.sorting

    switch (sortingType) {
        case "latest":
            return sorting.latest.label
        case "ongoing":
            return sorting.ongoing.label
        case "anons":
            return sorting.anons.label
        case "released":
            return sorting.released.label
        default:
            return sorting.latest.label
    }
}