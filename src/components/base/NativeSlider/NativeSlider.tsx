"use client";

import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";
import { useState } from "react";

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
    const [value, setValue] = useState<number>(0);

    return (
        <input
            type="range"
            className="w-full range-native-base range-native-progress touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-runnable-track]:bg-[#262626] dark:[&::-webkit-slider-runnable-track]:bg-[#e5e5e5] [&::-moz-range-track]:bg-[#262626] [&::-moz-range-track]:border-[#262626] dark:[&::-moz-range-track]:bg-[#e5e5e5] dark:[&::-moz-range-track]:border-[#e5e5e5] [&::-webkit-slider-thumb]:bg-[#262626] dark:[&::-webkit-slider-thumb]:bg-[#e5e5e5] [&::-moz-range-thumb]:bg-[#262626] dark:[&::-moz-range-thumb]:bg-[#e5e5e5]"
            value={value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setValue(
                    Number(event.target.value),
                );
            }}
            style={{
                color: parsedColor,
            }}
        />
    );
}
