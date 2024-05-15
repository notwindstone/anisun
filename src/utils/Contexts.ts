import {createContext} from "react";
import {ThemeContext} from "@/types/ThemeContext";
import defaultTheme from '@/configs/defaultTheme.json';

export const CustomThemeContext = createContext<ThemeContext>({
    theme: {
        color: defaultTheme.primaryColor,
        breadcrumb: defaultTheme.breadcrumb
    },
    setTheme: () => {}
})