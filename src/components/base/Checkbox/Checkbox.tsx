import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import { Check } from "lucide-react";
import { useState } from "react";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";

export default function Checkbox({
    parameter,
}: {
    parameter: string;
}) {
    const { base, accent, theme } = useContextSelector(ConfigsContext, (value) => ({
        base:   value.data.colors.base,
        accent: value.data.colors.accent,
        theme:  value.data.theme,
    }));
    const [checked, setChecked] = useState(false);

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
            <div className="relative flex gap-2 items-center w-fit">
                <input
                    id={parameter}
                    defaultChecked={checked}
                    onClick={() => setChecked((state) => !state)}
                    className="peer cursor-pointer w-6 h-6 transition appearance-none rounded-md"
                    type="checkbox"
                    style={{
                        backgroundColor: checked
                            ? checkedColor : notCheckedColor,
                    }}
                />
                <label
                    className="text-sm cursor-pointer"
                    htmlFor={parameter}
                >
                    Enable this shit
                </label>
                <Check
                    size={16}
                    className="peer-checked:opacity-100 opacity-0 mx-1 transition-opacity absolute pointer-events-none text-white"
                />
            </div>
        </>
    );
}
