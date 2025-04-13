import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";

export const CookieConfigKey = "configs";
export const DarkThemeKey = "dark";
export const LightThemeKey = "light";
export const AccentColors: Array<AccentColorsType> = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
];
export const BaseColors: Array<BaseColorsType> = [
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
];
export const InitialConfig: SafeConfigType = {
    theme: DarkThemeKey,
    colors: {
        accent: "rose",
        base: "neutral",
    },
};