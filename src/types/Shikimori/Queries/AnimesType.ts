import {StatusType} from "@/types/Shikimori/Responses/Types/StatusType";
import {OrderType} from "@/types/Shikimori/Queries/OrderType";

export type AnimesType = {
    ids?: string;
    search?: string;
    limit?: number;
    status?: StatusType;
    year?: string;
    order?: OrderType;
    page?: number;
}