import { SafeConfigType } from "@/types/Configs/SafeConfigType.type";
import { AccentColors, BaseColors, DarkThemeKey, InitialConfig, LightThemeKey } from "@/constants/configs";
import { ParsedConfigType } from "@/types/Configs/ParsedConfig.type";
import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";

export default function getSafeConfigValues({
    config,
}: {
    config: ParsedConfigType;
}): SafeConfigType {
    // Yeah, this is a mess, typescript is diabolical
    const getThemeColor = (): "light" | "dark" => {
        if (config?.theme === undefined) {
            return InitialConfig.theme;
        }

        if (config.theme !== DarkThemeKey && config.theme !== LightThemeKey) {
            return InitialConfig.theme;
        }

        return config.theme;
    };
    const getAccentColor = (): AccentColorsType => {
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
    const getBaseColor = (): BaseColorsType => {
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

    return {
        theme: getThemeColor(),
        colors: {
            accent: getAccentColor(),
            base: getBaseColor(),
        },
    };
}