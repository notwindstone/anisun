import { AccentColorsType } from "@/types/TailwindCSS/AccentColors.type";
import { BaseColorsType } from "@/types/TailwindCSS/BaseColors.type";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { ButtonStylesType } from "@/types/Appearance/ButtonStyles.type";

export default function getButtonColor({
    darker,
    style,
    theme,
    colors: {
        accent,
        base,
    },
}: {
    darker?: boolean;
    style: ButtonStylesType;
    theme: "dark" | "light";
    colors: {
        accent: AccentColorsType;
        base: BaseColorsType;
    };
}): {
    foreground: string;
    background: string;
} {
    let foreground: string;
    let background: string;

    switch (style) {
        case "base": {
            foreground = theme === DarkThemeKey
                ? "white"
                : "black";
            background = parseTailwindColor({
                color: base,
                step:  theme === DarkThemeKey
                    ? (darker ? 900 : 800)
                    : (darker ? 100 : 200),
            });
            break;
        }
        case "transparent": {
            foreground = theme === DarkThemeKey
                ? "white"
                : "black";
            background = "transparent";
            break;
        }
        default: {
            foreground = "white";
            background = parseTailwindColor({
                color: accent,
                step:  600,
            });
            break;
        }
    }

    return {
        foreground,
        background,
    };
};
