import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import { Check } from "lucide-react";
import { useState } from "react";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import useInitialSearchParameters from "@/hooks/useInitialSearchParameters";

export default function Checkbox({
    parameter,
    callback,
    label,
}: {
    parameter: string;
    callback: ({
        parameter,
        value,
    }: {
        parameter: string;
        value:     string;
    }) => void;
    label: string;
}) {
    const { base, accent, theme } = useContextSelector(ConfigsContext, (value) => ({
        base:   value.data.colors.base,
        accent: value.data.colors.accent,
        theme:  value.data.theme,
    }));
    const initialValue = useInitialSearchParameters(parameter) ?? "false";

    let parsedInitialValue: boolean;

    try {
        parsedInitialValue = JSON.parse(initialValue) === true;
    } catch {
        parsedInitialValue = false;
    }

    const [checked, setChecked] = useState(parsedInitialValue);

    const checkedColor = parseTailwindColor({
        color: accent,
        step:  theme === DarkThemeKey
            ? 400
            : 500,
    });
    const notCheckedColor = parseTailwindColor({
        color: base,
        step:  theme === DarkThemeKey
            ? 200
            : 800,
    });

    return (
        <>
            <div className="relative flex flex-nowrap gap-0 items-center w-fit">
                <input
                    id={parameter}
                    defaultChecked={checked}
                    onClick={() => {
                        callback({
                            parameter,
                            value: (!checked).toString(),
                        });

                        setChecked((state) => !state);
                    }}
                    className="peer cursor-pointer w-6 h-6 transition appearance-none rounded-md"
                    type="checkbox"
                    style={{
                        backgroundColor: checked
                            ? checkedColor : notCheckedColor,
                    }}
                />
                <label
                    className="pl-2 text-sm cursor-pointer"
                    htmlFor={parameter}
                >
                    {label}
                </label>
                <Check
                    size={16}
                    className="peer-checked:opacity-100 opacity-0 mx-1 transition-opacity absolute pointer-events-none text-white"
                />
            </div>
        </>
    );
}
