import { useCallback, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";

export default function RangedSlider({
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
    const [current, setCurrent] = useState<{
        min: number;
        max: number;
    }>({
        min: fixed.min,
        max: fixed.max,
    });

    const handleMinimalChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            const newValue = Math.min(
                Number(event.target.value),
                current.max - fixed.step,
            );

            setCurrent((state) => ({
                ...state,
                min: newValue,
            }));
        },
        [current.max, fixed.step],
    );
    const handleMaximalChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            event.preventDefault();

            const newValue = Math.max(
                Number(event.target.value),
                current.min + fixed.step,
            );

            setCurrent((state) => ({
                ...state,
                max: newValue,
            }));
        },
        [current.min, fixed.step],
    );

    const minimalPosition = (
        (current.min - fixed.min) / (fixed.max - fixed.min)
    ) * 100;
    const maximalPosition = (
        (current.max - fixed.min) / (fixed.max - fixed.min)
    ) * 100;

    return (
        <>
            <div className="relative flex items-center justify-center h-6 touch-none">
                <div className="absolute w-full h-6">
                    <input
                        className="dual-range-thumb-only touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-thumb]:bg-[#262626] dark:[&::-webkit-slider-thumb]:bg-[#e5e5e5] [&::-moz-range-thumb]:bg-[#262626] dark:[&::-moz-range-thumb]:bg-[#e5e5e5]"
                        type="range"
                        value={current.min}
                        min={fixed.min}
                        max={fixed.max}
                        step={fixed.step}
                        onChange={handleMinimalChange}
                        style={{
                            color: parsedColor,
                        }}
                    />
                    <input
                        className="dual-range-thumb-only touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-thumb]:bg-[#262626] dark:[&::-webkit-slider-thumb]:bg-[#e5e5e5] [&::-moz-range-thumb]:bg-[#262626] dark:[&::-moz-range-thumb]:bg-[#e5e5e5]"
                        type="range"
                        value={current.max}
                        min={fixed.min}
                        max={fixed.max}
                        step={fixed.step}
                        onChange={handleMaximalChange}
                        style={{
                            color: parsedColor,
                        }}
                    />
                </div>
                <div className="absolute w-[calc(100%-16px)] h-6">
                    <div className="absolute w-full h-3 top-[50%] -translate-y-[50%] rounded-md dark:bg-[#e5e5e5] bg-[#262626]" />
                    <div
                        className="absolute h-full"
                        style={{
                            background: parsedColor,
                            left:       `${minimalPosition}%`,
                            right:      `${100 - maximalPosition}%`,
                        }}
                    />
                </div>
            </div>
        </>
    );
}
