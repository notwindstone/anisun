import {createContext} from "react";
import {CustomThemeContextType} from "@/types/CustomThemeContext/CustomThemeContext.type";
import defaultTheme from '@/configs/defaultTheme.json';
import { variables } from '@/configs/variables';
import {TitlesListType} from "@/types/TitlesList/TitlesList.type";
import {StatusType} from "@/types/Shikimori/General/Status.type";
import {SideBarContextType} from "@/types/SideBar/SideBarContext.type";
import {SideBarPopoverContextType} from "@/types/SideBar/SideBarPopoverContext.type";

export const CustomThemeContext = createContext<CustomThemeContextType>({
    theme: {
        color: defaultTheme.primaryColor,
        breadcrumb: defaultTheme.breadcrumb
    },
    setTheme: () => {}
})

const sortingValue: StatusType = variables.sorting.latest.value

export const TitlesSortContext = createContext<TitlesListType>({
    sortingType: sortingValue,
    setSortingType: () => {}
})

export const SideBarContext = createContext<SideBarContextType>({
    opened: false,
    toggle: () => {}
})

export const SideBarPopoverContext = createContext<SideBarPopoverContextType>({
    expanded: false,
    setExpanded: () => {}
})