import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";

export type ConfigType = {
    theme?:  "light" | "dark";
    colors?: {
        base?:   BaseColorsType;
        accent?: AccentColorsType;
    };
    layout?: {
        sidebar?: {
            expanded?: boolean;
            position?: "right" | "left";
        };
    };
    library?: {
        libraryEntriesOnThePage?: number;
        historyEntriesOnThePage?: number;
    };
    /* TODO

    extensions?: {
        hydrationDelay?: number;
    };
    other?: {
        logo?: "non-ai" | "ai";
    };

    */
} | undefined;
