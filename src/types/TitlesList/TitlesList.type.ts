import {Dispatch, SetStateAction} from "react";
import {StatusType} from "@/types/Shikimori/General/Status.type";

export type TitlesListType = {
    sortingType: StatusType;
    setSortingType: Dispatch<SetStateAction<StatusType>>;
}