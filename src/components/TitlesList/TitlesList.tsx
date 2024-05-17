"use client"

import {TitlesSortContext} from "@/utils/Contexts/Contexts";
import {useState} from "react";
import { sorting } from '@/configs/globalVariables.json';
import TitlesSort from "@/components/TitlesSort/TitlesSort";
import {SortType} from "@/types/TitlesList/Sort.type";

const ALL_TITLES = sorting.all;

export default function TitlesList() {
    const [sortingType, setSortingType] = useState<SortType>(ALL_TITLES.value);

    return (
        <TitlesSortContext.Provider value={{ sortingType: sortingType, setSortingType: setSortingType }}>
            <TitlesSort />
            {sortingType}
        </TitlesSortContext.Provider>
    )
}