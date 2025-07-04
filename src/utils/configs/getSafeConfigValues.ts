import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import {
    DarkThemeKey,
    InitialConfig,
    LightThemeKey,
    SidebarLeftPosition,
    SidebarRightPosition,
} from "@/constants/configs";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import { AccentColors, BaseColors } from "@/constants/tailwind";
import { EntriesMaxSize } from "@/constants/app";

// Yeah, this is a mess
const getThemeColor = (config: ParsedConfigType): "light" | "dark" => {
    if (config?.theme === undefined) {
        return InitialConfig.theme;
    }

    if (config.theme !== DarkThemeKey && config.theme !== LightThemeKey) {
        return InitialConfig.theme;
    }

    return config.theme;
};
const getAccentColor = (config: ParsedConfigType): AccentColorsType => {
    const configColor = config?.colors?.accent;

    if (configColor === undefined) {
        return InitialConfig.colors.accent;
    }

    for (const accentColor of AccentColors) {
        if (accentColor === configColor) {
            return configColor;
        }
    }

    return InitialConfig.colors.accent;
};
const getBaseColor = (config: ParsedConfigType): BaseColorsType => {
    const configColor = config?.colors?.base;

    if (configColor === undefined) {
        return InitialConfig.colors.base;
    }

    for (const baseColor of BaseColors) {
        if (baseColor === configColor) {
            return configColor;
        }
    }

    return InitialConfig.colors.base;
};
const getSidebarProperties = (config: ParsedConfigType): SafeConfigType["layout"]["sidebar"] => {
    const position = config?.layout?.sidebar?.position;
    const expanded = config?.layout?.sidebar?.expanded ?? InitialConfig.layout.sidebar.expanded;

    if (position !== SidebarLeftPosition && position !== SidebarRightPosition) {
        return {
            position: InitialConfig.layout.sidebar.position,
            expanded: expanded,
        };
    }

    return {
        position: position,
        expanded: expanded,
    };
};
const getLibraryEntries = (config: ParsedConfigType): SafeConfigType["library"] => {
    const libraryEntries = config?.library?.libraryEntriesOnThePage;
    const historyEntries = config?.library?.historyEntriesOnThePage;

    if (typeof libraryEntries !== "number" || typeof historyEntries !== "number") {
        return InitialConfig.library;
    }

    if (!Number.isInteger(libraryEntries) || !Number.isInteger(historyEntries)) {
        return InitialConfig.library;
    }

    return {
        libraryEntriesOnThePage: Math.min(libraryEntries, EntriesMaxSize),
        historyEntriesOnThePage: Math.min(historyEntries, EntriesMaxSize),
    };
};
const getOtherProperties = (config: ParsedConfigType): SafeConfigType["other"] => {
    const historyEnabled = config?.other?.historyEnabled ?? InitialConfig.other.historyEnabled;
    const hydrationDelay = config?.other?.hydrationDelay;

    if (typeof hydrationDelay !== "number") {
        return InitialConfig.other;
    }

    if (!Number.isInteger(hydrationDelay)) {
        return InitialConfig.other;
    }

    return {
        historyEnabled: historyEnabled,
        hydrationDelay: hydrationDelay,
    };
};

/** Sidebar values update only on server request */
export default function getSafeConfigValues({
    config,
}: {
    config: ParsedConfigType;
}): SafeConfigType {
    return {
        theme:  getThemeColor(config),
        colors: {
            accent: getAccentColor(config),
            base:   getBaseColor(config),
        },
        layout: {
            sidebar: getSidebarProperties(config),
        },
        library: getLibraryEntries(config),
        other:   getOtherProperties(config),
    };
}
