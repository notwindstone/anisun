import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { SearchIcon } from "lucide-react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { SetStateAction, useRef, useState } from "react";
import { useClickOutside } from "@mantine/hooks";

export default function Input({
    setSearch,
    placeholder,
    appendClassNames,
    defaultValue,
    dropdown,
}: {
    setSearch:         (value: SetStateAction<string>) => void;
    placeholder:       string;
    appendClassNames?: string;
    defaultValue?:     string;
    dropdown?:         Array<React.ReactNode>;
}) {
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const reference = useRef<HTMLInputElement>(null);
    const dropdownReference = useClickOutside(() => setDropdownOpened(false));
    const [dropdownOpened, setDropdownOpened] = useState(false);

    return (
        <>
            <div
                ref={dropdownReference}
                onClick={() => {
                    reference.current?.focus();

                    if (dropdown !== undefined) {
                        setDropdownOpened(true);
                    }
                }}
                className={`focus-within:ring-2 rounded-md flex flex-nowrap items-center overflow-clip h-10 gap-0 cursor-text transition w-full ring-black dark:ring-white ${appendClassNames ?? ""}`}
                style={{
                    background: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 900
                            : 100,
                    }),
                }}
            >
                <div className="flex justify-center items-center w-10 h-full shrink-0">
                    <SearchIcon size={18} />
                </div>
                <input
                    type="text"
                    defaultValue={defaultValue ?? ""}
                    ref={reference}
                    className="w-full h-full text-sm focus:outline-none"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const value = event.currentTarget.value.trim();

                        setSearch(value);
                    }}
                    placeholder={placeholder}
                    title={placeholder}
                    aria-label={placeholder}
                />
                {
                    (dropdown !== undefined) && (
                        <div
                            className="rounded-md transition z-300 absolute top-12 flex flex-col gap-2 w-full h-10 p-2"
                            style={{
                                background: parseTailwindColor({
                                    color: base,
                                    step:  theme === DarkThemeKey
                                        ? 900
                                        : 100,
                                }),
                                opacity:    dropdownOpened ? 1 : 0,
                                visibility: dropdownOpened ? "visible" : "hidden",
                            }}
                        >
                            {dropdown}
                        </div>
                    )
                }
            </div>
        </>
    );
}
