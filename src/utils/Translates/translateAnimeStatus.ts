import { variables } from '@/configs/variables';
import {StatusType} from "@/types/Shikimori/General/Status.type";

export default function translateAnimeStatus(
    {
        sortingType,
        singular,
        lowerCase,
    }: {
        sortingType: StatusType | string;
        singular?: boolean;
        lowerCase?: boolean;
    }
) {
    const sorting = variables.sorting;
    const singularAnons = "Анонсированный";
    const singularReleased = "Завершённый";

    let translatedStatus;

    switch (sortingType) {
        case "latest":
            if (singular) {
                translatedStatus = singularAnons;
                break;
            }

            translatedStatus = sorting.latest.label;
            break;
        case "ongoing":
            if (singular) {
                translatedStatus = sorting.ongoing.label;
                break;
            }

            translatedStatus = sorting.ongoing.label;
            break;
        case "anons":
            if (singular) {
                translatedStatus = sorting.anons.label;
                break;
            }

            translatedStatus = sorting.anons.label;
            break;
        case "released":
            if (singular) {
                translatedStatus = singularReleased;
                break;
            }

            translatedStatus = sorting.released.label;
            break;
        default:
            if (singular) {
                translatedStatus = sorting.latest.label;
                break;
            }

            translatedStatus = sorting.latest.label;
            break;
    }

    if (lowerCase) {
        return translatedStatus.toLowerCase();
    }

    return translatedStatus;
}