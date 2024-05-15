import {createContext} from "react";
import {ThemeContext} from "@/types/ThemeContext";

export const CustomThemeContext = createContext<ThemeContext>({
    theme: {
        color: "violet"
    },
    setTheme: () => {}
})