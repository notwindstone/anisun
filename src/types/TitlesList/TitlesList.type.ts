import {SortType} from "@/types/TitlesList/Sort.type";
import {Dispatch, SetStateAction} from "react";

export type TitlesListType = {
    sortingType: SortType;
    setSortingType: Dispatch<SetStateAction<SortType>>;
}