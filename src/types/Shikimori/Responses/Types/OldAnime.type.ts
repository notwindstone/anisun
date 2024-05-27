import {AnimeKindEnum} from "@/types/Shikimori/Responses/Enums/AnimeKind.enum";
import {StatusType} from "@/types/Shikimori/General/Status.type";

export type OldAnimeType = {
    aired_on: string;
    episodes: number;
    episodes_aired: number;
    id: number;
    image: {
        original: string;
        preview: string;
        x48: string;
        x96: string;
    };
    kind: AnimeKindEnum;
    name: string;
    released_on: string;
    russian?: string;
    score: string;
    status: StatusType;
    url: string;
};