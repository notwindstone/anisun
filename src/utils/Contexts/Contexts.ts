import {createContext} from "react";
import {CustomThemeContextType} from "@/types/CustomThemeContext/CustomThemeContext.type";
import defaultTheme from '@/configs/defaultTheme.json';
import { variables } from '@/configs/variables';
import {TitlesListType} from "@/types/TitlesList/TitlesList.type";
import {StatusType} from "@/types/Shikimori/General/Status.type";
import {SideBarContextType} from "@/types/SideBar/SideBarContext.type";
import {SideBarPopoverContextType} from "@/types/SideBar/SideBarPopoverContext.type";
import {
    SideBarAccountPopoverContextType
} from "@/types/SideBar/SideBarAccountPopoverContext.type";
import {AdvancedSearchContextType} from "@/types/AdvancedSearch/AdvancedSearchContext.type";
import {AdvancedSearchFiltersContextType} from "@/types/AdvancedSearch/AdvancedSearchFiltersContext.type";

export const CustomThemeContext = createContext<CustomThemeContextType>({
    theme: {
        color: defaultTheme.primaryColor,
        breadcrumb: defaultTheme.breadcrumb
    },
    setTheme: () => {}
});

const sortingValue: StatusType = variables.sorting.latest.value;

export const TitlesSortContext = createContext<TitlesListType>({
    sortingType: sortingValue,
    setSortingType: () => {}
});

export const SideBarContext = createContext<SideBarContextType>({
    opened: false,
    toggle: () => {}
});

export const SideBarPopoverContext = createContext<SideBarPopoverContextType>({
    expanded: false,
    setExpanded: () => {}
});

export const SideBarAccountPopoverContext = createContext<SideBarAccountPopoverContextType>({
    settingsOpened: false,
    signInOpened: false,
    signUpOpened: false,
    openSettings: () => {},
    openSignIn: () => {},
    openSignUp: () => {},
    closeSettings: () => {},
    closeSignIn: () => {},
    closeSignUp: () => {}
});

export const MobileNavbarModalsContext = createContext<SideBarAccountPopoverContextType>({
    settingsOpened: false,
    signInOpened: false,
    signUpOpened: false,
    openSettings: () => {},
    openSignIn: () => {},
    openSignUp: () => {},
    closeSettings: () => {},
    closeSignIn: () => {},
    closeSignUp: () => {}
});

export const AdvancedSearchContext = createContext<AdvancedSearchContextType>({
    searchInput: "",
    setSearchInput: () => {},
});

export const AdvancedSearchFiltersContext = createContext<AdvancedSearchFiltersContextType>({
    censored: false,
    toggleCensored: () => {},
    durations: [],
    setDurations: () => {},
    demographicGenresValue: [],
    setDemographicGenresValue: () => {},
    genreGenresValue: [],
    setGenreGenresValue: () => {},
    themeGenresValue: [],
    setThemeGenresValue: () => {},
    kinds: [],
    setKinds: () => {},
    limit: 16,
    setLimit: () => {},
    order: variables.sorting.latest.value,
    setOrder: () => {},
    ratings: [],
    setRatings: () => {},
    score: 7,
    setScore: () => {},
    year: 2024,
    setYear: () => {},
    rangedYears: [2020, 2024],
    setRangedYears: () => {},
    yearStart: 1917,
    setYearStart: () => {},
    yearsRanged: false,
    toggleYearsRanged: () => {},
    seasons: [],
    setSeasons: () => {},
    statuses: [],
    setStatuses: () => {},
    studio: null,
    setStudio: () => {},
});