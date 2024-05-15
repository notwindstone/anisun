import {createContext} from "react";
import {CustomThemeContextType} from "@/types/CustomThemeContext/CustomThemeContext.type";
import defaultTheme from '@/configs/defaultTheme.json';

export const CustomThemeContext = createContext<CustomThemeContextType>({
    theme: {
        color: defaultTheme.primaryColor,
        breadcrumb: defaultTheme.breadcrumb
    },
    setTheme: () => {}
})