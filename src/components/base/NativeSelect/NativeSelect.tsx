import { ChevronDown } from "lucide-react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import useInitialSearchParameters from "@/hooks/useInitialSearchParameters";

export default function NativeSelect({
    parameter,
    options,
    callback,
    label,
    additionalClassNames,
}: {
    parameter: string;
    options:   Array<{
        name:  string;
        value: string;
    }>;
    callback: ({
        parameter,
        value,
    }: {
        parameter:  string;
        value: string;
    }) => void,
    label:                 string;
    additionalClassNames?: string;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const initialValue = useInitialSearchParameters(parameter);

    return (
        <div className={`flex flex-col gap-2 ${additionalClassNames}`}>
            <p className="text-sm">
                {label}
            </p>
            <div
                className="group relative rounded-md w-full flex gap-2 flex-nowrap items-center transition ring-2 ring-transparent dark:focus-within:ring-white focus-within:ring-black"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 800
                            : 200,
                    }),
                }}
            >
                <select
                    defaultValue={initialValue}
                    className="cursor-pointer w-full pl-2 pr-8 h-10 flex bg-inherit rounded-md appearance-none text-sm outline-none"
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                        const value = event.target.value;

                        callback({
                            parameter,
                            value,
                        });
                    }}
                >
                    {
                        options.map((option) => {
                            return (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.name}
                                </option>
                            );
                        })
                    }
                </select>
                <ChevronDown
                    className="absolute right-2 pointer-events-none"
                    size={16}
                />
            </div>
        </div>
    );
}
