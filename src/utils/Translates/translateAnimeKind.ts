import {AnimeKindEnum} from "@/types/Shikimori/Responses/Enums/AnimeKind.enum";
import {variables} from "@/configs/variables";

export default function translateAnimeKind(shikimoriKind: AnimeKindEnum | string) {
    const kind = variables.kind;

    switch (shikimoriKind) {
        case 'tv':
            return kind.tv;
        case 'movie':
            return kind.movie;
        case 'ova':
            return kind.ova;
        case 'ona':
            return kind.ona;
        case 'special':
            return kind.special;
        case 'tv_special':
            return kind.tv_special;
        case 'music':
            return kind.music;
        case 'pv':
            return kind.pv;
        case 'cm':
            return kind.cm;
        default:
            return kind.default;
    }
}