import {StatusType} from "@/types/Shikimori/Responses/Types/StatusType";

export type AnimesType = {
    search?: string;
    limit?: number;
    status?: StatusType;
    year?: string;
    order?: string;
}