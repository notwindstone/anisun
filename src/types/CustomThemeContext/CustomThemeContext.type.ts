import {ThemeType} from "@/types/CustomThemeContext/Theme.type";

export type CustomThemeContextType = {
    theme: ThemeType;
    setTheme: ({ color, topLoaderColor, breadcrumb }: ThemeType) => void;
};