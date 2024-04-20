import {ExternalLinkEnum} from "@/types/Shikimori/Responses/Enums/ExternalLinkEnum";

export type ExternalLinkType = {
    id: string | null;
    kind: ExternalLinkEnum;
    url: string;
    createdAt: string | null;
    updatedAt: string | null;
}