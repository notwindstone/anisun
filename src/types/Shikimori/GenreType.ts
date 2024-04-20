import {GenreKindEnum} from "@/types/Shikimori/GenreKindEnum";

export type GenreType = {
    id: string;
    name: string;
    russian: string;
    kind: GenreKindEnum;
}