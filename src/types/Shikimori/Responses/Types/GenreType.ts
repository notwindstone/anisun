import {GenreKindEnum} from "@/types/Shikimori/Responses/Enums/GenreKindEnum";

export type GenreType = {
    id: string;
    name: string;
    russian: string;
    kind: GenreKindEnum;
}