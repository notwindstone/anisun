import {createContext} from "react";
import {CustomThemeContextType} from "@/types/CustomThemeContext/CustomThemeContext.type";
import defaultTheme from '@/configs/defaultTheme.json';
import globalVariables from '@/configs/globalVariables.json';
import {TitlesListType} from "@/types/TitlesList/TitlesList.type";
import {StatusType} from "@/types/Shikimori/General/Status.type";

export const CustomThemeContext = createContext<CustomThemeContextType>({
    theme: {
        color: defaultTheme.primaryColor,
        breadcrumb: defaultTheme.breadcrumb
    },
    setTheme: () => {}
})

const sortingValue: StatusType = globalVariables.sorting.all.value

export const TitlesSortContext = createContext<TitlesListType>({
    sortingType: sortingValue,
    setSortingType: () => {}
})