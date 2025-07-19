import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";

export default function Select({
    parameter,
    options,
    callback,
    searchable,
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
        parameter: string;
        value:     string;
    }) => void;
    searchable?: boolean;
}) {
    const { theme, base, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme:  value.data.theme,
            base:   value.data.colors.base,
            accent: value.data.colors.accent,
        };
    });
    const dropdownReference = useClickOutside(() => setDropdownOpened(false));
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [selected, setSelected] = useState<string>(options[0].value);
    const selectedOptionName = options.find(
        (option) => option.value === selected,
    )?.name ?? selected;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm">
                Select an option
            </p>
            <div
                ref={dropdownReference}
                className="group relative rounded-md w-48 flex gap-2 flex-nowrap items-center transition ring-2 ring-transparent dark:focus-within:ring-white focus-within:ring-black"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 800
                            : 200,
                    }),
                }}
            >
                <input
                    placeholder={selectedOptionName}
                    readOnly={!searchable}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.currentTarget.value.trim();

                        setDropdownOpened(true);
                    }}
                    onClick={() => {
                        setDropdownOpened((state) => !state);
                    }}
                    className={`bg-inherit rounded-md text-sm cursor-pointer h-10 w-full pl-4 pr-12 appearance-none outline-none ${searchable ? "" : "caret-transparent dark:placeholder-white placeholder-black"}`}
                />
                <ChevronDown
                    className="absolute right-4 pointer-events-none"
                    size={16}
                />
                <div
                    className={`cursor-default rounded-md transition z-300 absolute top-12 flex flex-col gap-0 w-full min-h-10 p-2 overflow-clip duration-300 ${dropdownOpened ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                    style={{
                        background: parseTailwindColor({
                            color: base,
                            step:  theme === DarkThemeKey
                                ? 800
                                : 200,
                        }),
                    }}
                >
                    {
                        options.map((option) => {
                            return (
                                <button
                                    key={option.value}
                                    className="cursor-pointer flex w-full text-sm px-2 py-1 transition-colors rounded-md bg-transparent hover:bg-[theme(colors.black/.08)] dark:hover:bg-[theme(colors.white/.08)]"
                                    onClick={() => {
                                        setSelected(option.value);
                                        callback({
                                            parameter,
                                            value: option.value,
                                        });
                                    }}
                                    { ...(selected === option.value ? {
                                        style: {
                                            color: parseTailwindColor({
                                                color: accent,
                                                step:  theme === DarkThemeKey
                                                    ? 400
                                                    : 500,
                                            }),
                                        },
                                    } : {}) }
                                >
                                    {option.name}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
