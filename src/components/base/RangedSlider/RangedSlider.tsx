import { useCallback, useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import { useDebouncedValue } from "@mantine/hooks";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import useInitialSearchParameters from "@/hooks/useInitialSearchParameters";

export default function RangedSlider({
    fixed,
    parameter,
    callback,
    label,
    additionalClassNames,
}: {
    fixed: {
        min:  number;
        max:  number;
        step: number;
    };
    parameter: string;
    callback: ({
        parameter,
        value,
    }: {
        parameter: string;
        value:     string;
    }) => void;
    label:                 string;
    additionalClassNames?: string;
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

    const initialValues = useInitialSearchParameters(parameter)
        ?.split("-");

    const [current, setCurrent] = useState<{
        min: number;
        max: number;
    }>({
        min: Number(initialValues?.[0] ?? fixed.min),
        max: Number(initialValues?.[1] ?? fixed.max),
    });
    const [debouncedCurrent] = useDebouncedValue(current, 300);
    const [mobileActive, setMobileActive] = useState<{
        left:  boolean;
        right: boolean;
    }>({
        left:  false,
        right: false,
    });

    useEffect(() => {
        const newValue = `${debouncedCurrent.min}-${debouncedCurrent.max}`;

        if (
            debouncedCurrent.min === fixed.min &&
            debouncedCurrent.max === fixed.max
        ) {
            callback({
                parameter,
                value: "",
            });

            return;
        }

        callback({
            parameter,
            value: newValue,
        });
    }, [callback, parameter, fixed.min, fixed.max, debouncedCurrent.min, debouncedCurrent.max]);

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
        <div className={`flex flex-col gap-2 ${additionalClassNames}`}>
            <p className="text-sm">
                {label}
            </p>
            <div className="relative flex items-center justify-center h-6 touch-none overflow-x-clip">
                <div className="absolute w-full h-6">
                    <input
                        onTouchStart={() => setMobileActive((state) => ({
                            ...state,
                            left: true,
                        }))}
                        onTouchCancel={() => setMobileActive((state) => ({
                            ...state,
                            left: false,
                        }))}
                        onTouchEnd={() => setMobileActive((state) => ({
                            ...state,
                            left: false,
                        }))}
                        className="peer/left dual-range-thumb-only touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-thumb]:bg-[#262626] dark:[&::-webkit-slider-thumb]:bg-[#e5e5e5] [&::-moz-range-thumb]:bg-[#262626] dark:[&::-moz-range-thumb]:bg-[#e5e5e5]"
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
                        onTouchStart={() => setMobileActive((state) => ({
                            ...state,
                            right: true,
                        }))}
                        onTouchCancel={() => setMobileActive((state) => ({
                            ...state,
                            right: false,
                        }))}
                        onTouchEnd={() => setMobileActive((state) => ({
                            ...state,
                            right: false,
                        }))}
                        className="peer/right dual-range-thumb-only touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-thumb]:bg-[#262626] dark:[&::-webkit-slider-thumb]:bg-[#e5e5e5] [&::-moz-range-thumb]:bg-[#262626] dark:[&::-moz-range-thumb]:bg-[#e5e5e5]"
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
                    <div
                        className={`absolute sm:peer-active/left:opacity-100 ${mobileActive.left ? "opacity-100" : ""} opacity-0 pointer-events-none bottom-8 z-100 rounded-md px-2 py-1 dark:bg-[#e5e5e5] bg-[#262626] dark:text-black text-white`}
                        style={{
                            left: `${minimalPosition * 0.96}%`,
                        }}
                    >
                        {current.min}
                    </div>
                    <div
                        className={`absolute sm:peer-active/right:opacity-100 ${mobileActive.right ? "opacity-100" : ""} opacity-0 pointer-events-none bottom-8 z-100 rounded-md px-2 py-1 dark:bg-[#e5e5e5] bg-[#262626] dark:text-black text-white`}
                        style={{
                            right: `${(100 - maximalPosition) * 0.96}%`,
                        }}
                    >
                        {current.max}
                    </div>
                </div>
                <div className="absolute w-full h-3 top-[50%] -translate-y-[50%] rounded-md dark:bg-[#e5e5e5] bg-[#262626]" />
                <div className="absolute w-[calc(100%-16px)] h-6">
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
        </div>
    );
}
