import {ExternalLinkEnum} from "@/types/Shikimori/ExternalLinkEnum";

export type ExternalLinkType = {
    id: string | null;
    kind: ExternalLinkEnum;
    url: string;
    createdAt: string | null;
    updatedAt: string | null;
}