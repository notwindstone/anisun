import { variables } from '@/configs/variables';
import {StatusType} from "@/types/Shikimori/General/Status.type";

export default function translateAnimeStatus(
    {
        sortingType,
        singular,
        lowerCase,
        withPrepositions,
    }: {
        sortingType: StatusType | string;
        singular?: boolean;
        lowerCase?: boolean;
        withPrepositions?: boolean
    }
) {
    let translatedStatus;

    switch (sortingType) {
        case "ongoing":
            if (singular) {
                translatedStatus = variables.sortingAlternateTranslations.ongoing.singular;
                break;
            }

            if (withPrepositions) {
                translatedStatus = variables.sortingAlternateTranslations.ongoing.withPrepositions;
                break;
            }

            translatedStatus = variables.sorting.ongoing.label;
            break;
        case "anons":
            if (singular) {
                translatedStatus = variables.sortingAlternateTranslations.anons.singular;
                break;
            }

            if (withPrepositions) {
                translatedStatus = variables.sortingAlternateTranslations.anons.withPrepositions;
                break;
            }

            translatedStatus = variables.sorting.anons.label;
            break;
        case "released":
            if (singular) {
                translatedStatus = variables.sortingAlternateTranslations.released.singular;
                break;
            }

            if (withPrepositions) {
                translatedStatus = variables.sortingAlternateTranslations.released.withPrepositions;
                break;
            }

            translatedStatus = variables.sorting.released.label;
            break;
        default:
            translatedStatus = variables.sorting.latest.label;
            break;
    }

    if (lowerCase) {
        return translatedStatus.toLowerCase();
    }

    return translatedStatus;
}