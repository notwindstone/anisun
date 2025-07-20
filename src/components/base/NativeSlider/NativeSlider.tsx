"use client";

import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";

export default function NativeSlider() {
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
            className="range-native-base range-native-progress [&::-moz-range-thumb]:border-inherit touch-none"
            style={{
                color: parsedColor,
            }}
        />
    );
}
