import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import { Check } from "lucide-react";
import { useState } from "react";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";

export default function Checkbox() {
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
        step:  200,
    });

    return (
        <>
            <div className="relative flex items-center justify-center w-fit">
                <input
                    defaultChecked={checked}
                    onClick={() => setChecked((state) => !state)}
                    className="peer cursor-pointer w-6 h-6 transition appearance-none rounded-md"
                    type="checkbox"
                    style={{
                        backgroundColor: checked
                            ? checkedColor : notCheckedColor,
                    }}
                />
                <Check
                    size={16}
                    className="peer-checked:opacity-100 opacity-0 transition-opacity absolute pointer-events-none text-white"
                />
            </div>
        </>
    );
}
