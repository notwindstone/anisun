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

    other?: {
        hydrationDelay?:             number;
        logo?:                       "non-ai" | "ai";
    };

    */
} | undefined;
