import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { useEffect, useState } from "react";
import useInitialSearchParameters from "@/hooks/useInitialSearchParameters";
import { useDebouncedValue } from "@mantine/hooks";

export default function NativeSlider({
    fixed,
    parameter,
    callback,
    label,
    reverse,
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
    reverse?:              boolean;
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
    const initialValue = useInitialSearchParameters(parameter);
    const [value, setValue] = useState<number>(
        reverse
            ? fixed.max - Number(initialValue || fixed.min)
            : Number(initialValue || fixed.min),
    );
    const [debouncedValue] = useDebouncedValue(value, 300);
    const [mobileActive, setMobileActive] = useState<boolean>(false);

    useEffect(() => {
        const newValue = reverse
            ? fixed.max - debouncedValue
            : debouncedValue;

        if (newValue === fixed.min) {
            callback({
                parameter,
                value: "",
            });

            return;
        }

        callback({
            parameter,
            value: newValue.toString(),
        });
    }, [reverse, callback, parameter, fixed.min, fixed.max, debouncedValue]);

    const currentPosition = (
        (value - fixed.min) / (fixed.max - fixed.min)
    ) * 100;

    return (
        <div className={`flex flex-col gap-2 ${additionalClassNames}`}>
            <p className="text-sm">
                {label}
            </p>
            <div className="relative overflow-x-clip">
                <input
                    min={fixed.min}
                    max={fixed.max}
                    step={fixed.step}
                    onTouchStart={() => setMobileActive(true)}
                    onTouchCancel={() => setMobileActive(false)}
                    onTouchEnd={() => setMobileActive(false)}
                    type="range"
                    className={`peer w-full range-native-base ${reverse ? "-scale-x-100 range-native-progress-flipped" : "range-native-progress"} touch-none [&::-moz-range-thumb]:border-inherit [&::-webkit-slider-runnable-track]:bg-[#262626] dark:[&::-webkit-slider-runnable-track]:bg-[#e5e5e5] [&::-moz-range-track]:bg-[#262626] [&::-moz-range-track]:border-[#262626] dark:[&::-moz-range-track]:bg-[#e5e5e5] dark:[&::-moz-range-track]:border-[#e5e5e5] [&::-webkit-slider-thumb]:bg-[#262626] dark:[&::-webkit-slider-thumb]:bg-[#e5e5e5] [&::-moz-range-thumb]:bg-[#262626] dark:[&::-moz-range-thumb]:bg-[#e5e5e5]`}
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
                    className={`absolute sm:peer-active:opacity-100 ${mobileActive ? "opacity-100" : ""} opacity-0 pointer-events-none bottom-10 z-100 rounded-md px-2 py-1 dark:bg-[#e5e5e5] bg-[#262626] dark:text-black text-white`}
                    style={
                        reverse ? {
                            right: currentPosition <= 50
                                ? `${currentPosition}%`
                                : "auto",
                            left: currentPosition > 50
                                ? `${100 - currentPosition}%`
                                : "auto",
                        } : {
                            left: currentPosition <= 50
                                ? `${currentPosition}%`
                                : "auto",
                            right: currentPosition > 50
                                ? `${100 - currentPosition}%`
                                : "auto",
                        }
                    }
                >
                    {reverse ? fixed.max - value : value}
                </div>
            </div>
        </div>
    );
}
