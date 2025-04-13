import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";

export type ConfigType = {
    theme?: "light" | "dark";
    colors?: {
        base?: BaseColorsType;
        accent?: AccentColorsType;
    };
} | undefined;