import {createContext} from "react";
import {ThemeContextType} from "@/types/ThemeContext/ThemeContext.type";
import defaultTheme from '@/configs/defaultTheme.json';

export const CustomThemeContext = createContext<ThemeContextType>({
    theme: {
        color: defaultTheme.primaryColor,
        breadcrumb: defaultTheme.breadcrumb
    },
    setTheme: () => {}
})