import {StatusType} from "@/types/Shikimori/Responses/Types/StatusType";

export type AnimesType = {
    ids?: string;
    search?: string;
    limit?: number;
    status?: StatusType;
    year?: string;
    order?: string;
    page?: number;
}