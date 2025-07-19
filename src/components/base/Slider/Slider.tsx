"use client";

import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";

export default function Slider() {
    const { accent, theme } = useContextSelector(ConfigsContext, (value) => ({
        accent: value.data.colors.accent,
        theme:  value.data.theme,
    }));
    const parsedColor = parseTailwindColor({
        color: accent,
        step:  theme === DarkThemeKey
            ? 400
            : 500,
    });

    return (
        <input
            type="range"
            min={0}
            max="100"
            defaultValue="25"
            className="range-native-customized [&::-moz-range-thumb]:border-inherit"
            step="5"
            style={{
                color: parsedColor,
            }}
        />
    );
}
