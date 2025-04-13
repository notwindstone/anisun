import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";

export const CookieConfigKey = "configs";
export const DarkThemeKey = "dark";
export const LightThemeKey = "light";
export const InitialConfig: SafeConfigType = {
    theme: DarkThemeKey,
    colors: {
        accent: "#ea9a97",
        topLoader: "#ea9a97",
    },
};