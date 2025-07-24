import { useContextSelector } from "use-context-selector";
import { SearchContext } from "@/lib/providers/SearchProvider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";

export default function SearchTags({
    parameter,
    callback,
}: {
    parameter: string;
    callback:  ({
        parameter,
        value,
    }: {
        parameter: string;
        value:     string;
    }) => void;
}) {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<Array<string>>([]);

    useEffect(() => {
        callback({
            parameter,
            value: JSON.stringify(selected),
        });
    }, [callback, parameter, selected]);

    const { base, theme } = useContextSelector(ConfigsContext, (value) => ({
        base:   value.data.colors.base,
        accent: value.data.colors.accent,
        theme:  value.data.theme,
    }));

    const unselectedColor = parseTailwindColor({
        color: base,
        step:  theme === DarkThemeKey
            ? 800
            : 200,
    });

    const tags = useContextSelector(SearchContext, (value) => value.mediaTags);

    const memoizedCallback = useCallback(
        (tagName: string) => {
            setSelected((state) => {
                if (state.includes(tagName)) {
                    return state.filter((value) => value !== tagName);
                }

                return [ ...state, tagName ];
            });
        },
        [],
    );
    const tagsKeys = useMemo(
        () => Object.keys(tags),
        [tags],
    );
    const mappedTags = useMemo(
        () => tagsKeys.map((tagKey) => (
            <div key={tagKey} className="flex flex-col gap-2">
                <p className="text-sm">
                    {tagKey.split("-").join(" / ")}
                </p>
                <div className="flex flex-wrap gap-2">
                    {
                        tags[tagKey]?.map((tag) => (
                            <button
                                key={tag.name}
                                data-description={tag.description}
                                className="transition-[background] px-2 py-1 text-sm dark:text-neutral-400 text-neutral-600 rounded-md cursor-pointer sm:hover:before:opacity-100 sm:before:block before:hidden sm:before:transition-[opacity] sm:before:duration-150 sm:before:text-start sm:before:text-balance sm:before:text-white sm:before:bg-black sm:before:px-2 sm:before:py-1 sm:before:rounded-md sm:before:bottom-0 sm:before:left-0 sm:before:w-48 sm:before:pointer-events-none sm:before:opacity-0 sm:before:absolute sm:before:content-[attr(data-description)] sm:before:z-1000"
                                onClick={() => memoizedCallback(tag.name)}
                                style={{
                                    backgroundColor: unselectedColor,
                                }}
                            >
                                {tag.name}
                            </button>
                        ))
                    }
                </div>
            </div>
        )),
        [unselectedColor, tagsKeys, tags],
    );

    return (
        <div className="relative flex flex-col gap-4">
            <button
                className="flex flex-nowrap items-center gap-2 cursor-pointer opacity-60 hover:opacity-100 transition-[opacity] font-medium"
                onClick={() => setShow((state) => !state)}
            >
                <ChevronRight
                    size={20}
                    className={`transition-[rotate] ${show ? "rotate-90" : "rotate-0"}`}
                />
                <span>
                    Advanced Tags Filter
                </span>
            </button>
            <div className={`overflow-y-auto max-h-96 flex flex-col gap-4`}>
                {show && mappedTags}
            </div>
        </div>
    );
}
