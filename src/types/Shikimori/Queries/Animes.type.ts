import {OrderType} from "@/types/Shikimori/Queries/Order.type";
import {OptionType} from "@/types/Shikimori/Queries/Option.type";
import {StatusType} from "@/types/Shikimori/General/Status.type";

export type AnimesType = {
    ids?: string;
    search?: string;
    limit?: number;
    status?: StatusType;
    year?: string;
    order?: OrderType;
    page?: number;
    filter?: OptionType[];
}