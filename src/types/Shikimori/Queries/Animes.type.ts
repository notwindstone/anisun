import {OrderType} from "@/types/Shikimori/Queries/Order.type";
import {OptionType} from "@/types/Shikimori/Queries/Option.type";
import {StatusType} from "@/types/Shikimori/General/Status.type";

export type AnimesType = {
    ids?: string;
    search?: string;
    limit?: number;
    genre?: string;
    status?: StatusType | string;
    studio?: string | null;
    year?: string;
    order?: OrderType | string | null;
    page?: number;
    kind?: string;
    score?: string;
    durations?: string;
    rating?: string;
    censored?: boolean;
    filter?: OptionType[];
};