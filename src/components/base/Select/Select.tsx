import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";
import Badge from "@/components/base/Badge/Badge";
import simpleMatch from "@/utils/misc/simpleMatch";

export default function Select({
    parameter,
    options,
    callback,
    searchable,
    multiple,
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
    multiple?:   boolean;
}) {
    const { theme, base, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme:  value.data.theme,
            base:   value.data.colors.base,
            accent: value.data.colors.accent,
        };
    });
    const dropdownReference = useClickOutside(() => setDropdownOpened(false));
    const [currentSearch, setCurrentSearch] = useState<string>("");
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [selected, setSelected] = useState<string | Array<string>>(
        multiple ? [] : options[0].value,
    );
    const foundOptionName = options.find((currentOption) => {
        if (Array.isArray(selected)) {
            return selected.includes(currentOption.value);
        }

        return selected === currentOption.value;
    })?.name;

    useEffect(() => {
        callback({
            parameter,
            value: Array.isArray(selected)
                ? JSON.stringify(selected)
                : selected,
        });
    }, [callback, selected, parameter]);

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
                    placeholder={searchable ? "Search..." : ""}
                    readOnly={!searchable}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.currentTarget.value.trim();

                        if (searchable) {
                            setCurrentSearch(value);
                        }

                        setDropdownOpened(true);
                    }}
                    onClick={() => {
                        setDropdownOpened((state) => !state);
                    }}
                    className={`bg-inherit rounded-md text-sm cursor-pointer h-10 w-full pl-2 pr-18 appearance-none outline-none ${searchable ? "" : "caret-transparent"}`}
                />
                <div className={`absolute text-sm left-2 flex flex-nowrap gap-2 pointer-events-none ${searchable ? "left-auto right-8" : ""}`}>
                    {
                        Array.isArray(selected)
                            ? (
                                <>
                                    {
                                        (searchable) && (
                                            <Badge>
                                                {selected.length}
                                            </Badge>
                                        )
                                    }
                                    {
                                        (!searchable) && (selected[0] !== undefined) && (
                                            <Badge>
                                                {foundOptionName}
                                            </Badge>
                                        )
                                    }
                                    {
                                        (!searchable) && (selected.length > 1) && (
                                            <Badge>
                                                +{selected.length - 1}
                                            </Badge>
                                        )
                                    }
                                </>
                            )
                            : (
                                <Badge>
                                    {foundOptionName}
                                </Badge>
                            )
                    }
                </div>
                <ChevronDown
                    className="absolute right-2 pointer-events-none"
                    size={16}
                />
                <div
                    className={`cursor-default rounded-md transition z-3000 absolute top-12 flex flex-col gap-2 sm:gap-0 w-full min-h-10 max-h-64 p-2 overflow-x-clip overflow-y-auto duration-300 ${dropdownOpened ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
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
                            let isSelected = selected === option.value;

                            if (Array.isArray(selected)) {
                                isSelected = selected.includes(option.value);
                            }

                            if (searchable && currentSearch !== "") {
                                const nameMatches = simpleMatch(
                                    option.name.toLowerCase(),
                                    currentSearch.toLowerCase(),
                                );

                                if (!nameMatches) {
                                    return;
                                }
                            }

                            return (
                                <button
                                    key={option.value}
                                    className="cursor-pointer flex justify-between items-center w-full text-lg sm:text-sm px-2 py-1 transition-colors rounded-md bg-transparent hover:bg-[theme(colors.black/.08)] dark:hover:bg-[theme(colors.white/.08)] max-sm:focus:bg-[theme(colors.black/.08)] dark:max-sm:focus:bg-[theme(colors.white/.08)]"
                                    onClick={() => {
                                        setSelected((state) => {
                                            if (!multiple) {
                                                return option.value;
                                            }

                                            const unique = new Set(state);

                                            if (unique.has(option.value)) {
                                                unique.delete(option.value);

                                                return [ ...unique ];
                                            }

                                            unique.add(option.value);

                                            return [ ...unique ];
                                        });

                                        if (!multiple) {
                                            setDropdownOpened(false);
                                        }
                                    }}
                                    { ...(isSelected ? {
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
                                    <span>
                                        {option.name}
                                    </span>
                                    <Check className={`transition-opacity ${isSelected ? "opacity-100" : "opacity-0"}`} size={16} />
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}
