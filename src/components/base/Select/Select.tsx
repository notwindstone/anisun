import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
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
    const { theme, base } = useContextSelector(ConfigsContext, (value) => {
        return {
            theme: value.data.theme,
            base:  value.data.colors.base,
        };
    });
    const dropdownReference = useClickOutside(() => setDropdownOpened(false));
    const [dropdownOpened, setDropdownOpened] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm">
                Select an option
            </p>
            <div
                ref={dropdownReference}
                className="group relative rounded-md bg-neutral-200 dark:bg-neutral-800 w-48 flex gap-2 flex-nowrap items-center transition ring-2 ring-transparent dark:focus-within:ring-white focus-within:ring-black"
            >
                <input
                    placeholder="Shitass"
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
                    className={`cursor-default rounded-md transition z-300 absolute top-12 flex flex-col gap-2 w-full min-h-10 p-2 overflow-clip duration-300 ${dropdownOpened ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
                    style={{
                        background: parseTailwindColor({
                            color: base,
                            step:  theme === DarkThemeKey
                                ? 800
                                : 200,
                        }),
                    }}
                >
                    helkjlaksjd
                </div>
            </div>
        </div>
    );
}
