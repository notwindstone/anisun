import {createContext} from "react";
import {CustomThemeContextType} from "@/types/CustomThemeContext/CustomThemeContext.type";
import defaultTheme from '@/configs/defaultTheme.json';
import { sorting } from '@/configs/globalVariables.json';
import {TitlesListType} from "@/types/TitlesList/TitlesList.type";

export const CustomThemeContext = createContext<CustomThemeContextType>({
    theme: {
        color: defaultTheme.primaryColor,
        breadcrumb: defaultTheme.breadcrumb
    },
    setTheme: () => {}
})

export const TitlesSortContext = createContext<TitlesListType>({
    sortingType: sorting.all.value,
    setSortingType: () => {}
})