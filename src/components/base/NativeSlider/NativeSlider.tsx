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
            className="w-full range-native-base range-native-progress touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-runnable-track]:bg-black dark:[&::-webkit-slider-runnable-track]:bg-white [&::-moz-range-track]:bg-black [&::-moz-range-track]:border-black dark:[&::-moz-range-track]:bg-white dark:[&::-moz-range-track]:border-white [&::-webkit-slider-thumb]:bg-black dark:[&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:bg-black dark:[&::-moz-range-thumb]:bg-white"
            style={{
                color: parsedColor,
            }}
        />
    );
}
