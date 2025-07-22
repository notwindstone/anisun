"use client";

import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";
import { useState } from "react";

export default function NativeSlider({
    fixed,
}: {
    fixed: {
        min:  number;
        max:  number;
        step: number;
    };
}) {
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
    const [value, setValue] = useState<number>(fixed.min);
    const [mobileActive, setMobileActive] = useState<boolean>(false);

    const currentPosition = (
        (value - fixed.min) / (fixed.max - fixed.min)
    ) * 100;

    return (
        <div className="relative overflow-x-clip">
            {mobileActive}
            <input
                min={fixed.min}
                max={fixed.max}
                step={fixed.step}
                onTouchStart={() => setMobileActive(true)}
                onTouchCancel={() => setMobileActive(false)}
                onTouchEnd={() => setMobileActive(false)}
                type="range"
                className="peer w-full range-native-base range-native-progress touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-runnable-track]:bg-[#262626] dark:[&::-webkit-slider-runnable-track]:bg-[#e5e5e5] [&::-moz-range-track]:bg-[#262626] [&::-moz-range-track]:border-[#262626] dark:[&::-moz-range-track]:bg-[#e5e5e5] dark:[&::-moz-range-track]:border-[#e5e5e5] [&::-webkit-slider-thumb]:bg-[#262626] dark:[&::-webkit-slider-thumb]:bg-[#e5e5e5] [&::-moz-range-thumb]:bg-[#262626] dark:[&::-moz-range-thumb]:bg-[#e5e5e5]"
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
            <div
                className={`absolute sm:peer-active:opacity-100 ${mobileActive ? "opacity-100" : ""} opacity-0 pointer-events-none bottom-8 z-100 rounded-md px-2 py-1 dark:bg-[#e5e5e5] bg-[#262626] dark:text-black text-white`}
                style={{
                    left: currentPosition <= 50
                        ? `${currentPosition}%`
                        : "auto",
                    right: currentPosition > 50
                        ? `${100 - currentPosition}%`
                        : "auto",
                }}
            >
                {value}
            </div>
        </div>
    );
}
