import { variables } from '@/configs/variables';
import {StatusType} from "@/types/Shikimori/General/Status.type";

export default function translateAnimeStatus(
    {
        sortingType,
        singular,
        lowerCase,
        alternate,
    }: {
        sortingType: StatusType | string;
        singular?: boolean;
        lowerCase?: boolean;
        alternate?: boolean
    }
) {
    const sorting = variables.sorting;
    const singularAnons = "Анонсированный";
    const singularReleased = "Завершённый";
    const alternateAnons = "Анонс на";
    const alternateReleased = "Вышло";
    const alternateOngoing = "Онгоинг с";

    let translatedStatus;

    switch (sortingType) {
        case "latest":
            translatedStatus = sorting.latest.label;
            break;
        case "ongoing":
            if (singular) {
                translatedStatus = sorting.ongoing.label;
                break;
            }

            if (alternate) {
                translatedStatus = alternateOngoing;
                break;
            }

            translatedStatus = sorting.ongoing.label;
            break;
        case "anons":
            if (singular) {
                translatedStatus = singularAnons;
                break;
            }

            if (alternate) {
                translatedStatus = alternateAnons;
                break;
            }

            translatedStatus = sorting.anons.label;
            break;
        case "released":
            if (singular) {
                translatedStatus = singularReleased;
                break;
            }

            if (alternate) {
                translatedStatus = alternateReleased;
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