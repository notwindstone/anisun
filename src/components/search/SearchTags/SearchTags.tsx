import { useContextSelector } from "use-context-selector";
import { SearchContext } from "@/lib/providers/SearchProvider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import { useDebouncedValue } from "@mantine/hooks";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import SearchTagButton from "@/components/search/SearchTagButton/SearchTagButton";

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
    // this is a complete madness
    const memoizedInitialValues: Array<string> = useMemo(
        () => {
            if (globalThis.window === undefined) {
                return;
            }

            const searchParametersAsString = globalThis.window.location.search;
            const searchParameters = new URLSearchParams(searchParametersAsString);

            try {
                return JSON.parse(searchParameters.get(parameter) ?? "");
            } catch {
                return [];
            }
        },
        [parameter],
    );

    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<Array<string>>(memoizedInitialValues);
    // for initial values
    const [debouncedSelected] = useDebouncedValue<Array<string>>(selected, 600);
    const debouncedSelectedAsSet = useMemo(() => new Set(debouncedSelected), [debouncedSelected]);

    useEffect(() => {
        callback({
            parameter,
            value: JSON.stringify(selected),
        });
    }, [callback, parameter, selected]);

    const { base, theme } = useContextSelector(ConfigsContext, (value) => ({
        base:  value.data.colors.base,
        theme: value.data.theme,
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
                            <SearchTagButton
                                key={tag.name}
                                name={tag.name}
                                description={tag.description}
                                callback={memoizedCallback}
                                unselectedColor={unselectedColor}
                                selected={debouncedSelectedAsSet}
                            />
                        ))
                    }
                </div>
            </div>
        )),
        [unselectedColor, tagsKeys, tags, memoizedCallback, debouncedSelectedAsSet],
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
