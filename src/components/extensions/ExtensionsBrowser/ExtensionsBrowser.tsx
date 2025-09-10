import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import { useQuery } from "@tanstack/react-query";
import BrowsingExtension from "@/components/extensions/BrowsingExtension/BrowsingExtension";
import { ManifestType } from "@/types/Extensions/Extension.type";
import Input from "@/components/base/Input/Input";
import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useLayoutEffect, useState } from "react";
import simpleMatch from "@/lib/misc/simpleMatch";

export default function ExtensionsBrowser() {
    const { data, isPending, error } = useQuery({
        queryKey: ["extensions", "browser"],
        queryFn:  async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_EXTENSIONS_REPOSITORY!);
            const data: unknown = await response.json();

            if (!Array.isArray(data)) {
                throw new TypeError("Not valid data");
            }

            return data
                .sort(
                    (a: unknown, b: unknown) => {
                        // i wouldn't have this mess...
                        if (
                            typeof a !== "object" ||
                            a === null ||
                            typeof b !== "object" ||
                            b === null
                        ) {
                            return 0;
                        }

                        // ...if i have installed zod
                        if (
                            !("name" in a) ||
                            !("name" in b) ||
                            typeof a.name !== "string" ||
                            typeof b.name !== "string"
                        ) {
                            return 0;
                        }

                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();

                        if (nameA < nameB) {
                            return -1;
                        }

                        if (nameA > nameB) {
                            return 1;
                        }

                        return 0;
                    },
                );
        },
    });
    const { base, theme, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:   value.data.colors.base,
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });
    const [search, setSearch] = useDebouncedState("", 50, {
        leading: true,
    });
    const [currentData, setCurrentData] = useState<Array<ManifestType>>([]);

    let extensionsNode: React.ReactNode;

    if (isPending) {
        extensionsNode = Array.from({ length: 5 }).map((_, index) => {
            return (
                <BrowsingExtension
                    loading
                    key={`${_}_${index}`}
                    extension={{
                        id:         "",
                        name:       "Loading...",
                        authors:    ["anisun"],
                        version:    "0.0",
                        url:        "",
                        logo:       "",
                        pages:      [],
                        languages:  [],
                        categories: [],
                    }}
                />
            );
        });
    }

    if (error) {
        extensionsNode = (
            <div>
                Error...
            </div>
        );
    }

    if (data) {
        extensionsNode = currentData.map((extensionFromStore: ManifestType) => {
            return (
                <BrowsingExtension
                    key={extensionFromStore.url}
                    extension={extensionFromStore}
                />
            );
        });
    }

    useLayoutEffect(() => {
        if (!data) {
            return;
        }

        setCurrentData(data);
    }, [data]);

    useEffect(() => {
        if (!data) {
            return;
        }

        if (search === "") {
            setCurrentData(data);

            return;
        }

        setCurrentData(data?.filter((extension: ManifestType) => {
            const name = extension?.name?.toLowerCase();

            // doesn't always work
            // tho it's really performant comparing to fuzzy search
            const unstableMatched = simpleMatch(
                name,
                search.toLowerCase(),
            );

            const contains = name.includes(search.toLowerCase());

            return unstableMatched || contains;
        }));
    }, [search, data]);

    return (
        <div className="flex items-center flex-col gap-2 w-full">
            <div
                className="transition p-4 rounded-md flex flex-col gap-4 w-full"
                style={{
                    backgroundColor: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey ? 900 : 100,
                    }),
                }}
            >
                <div className="flex justify-between">
                    <p className="leading-none text-lg font-medium">
                        Extension Repository
                    </p>
                    <p className="leading-none text-lg font-medium">
                        Total:
                        {" "}
                        <span style={{
                            color: parseTailwindColor({
                                color: accent,
                                step:  theme === DarkThemeKey
                                    ? 400
                                    : 500,
                            }),
                        }}>
                            {data?.length ?? "?"}
                        </span>
                    </p>
                </div>
                <Input
                    defaultValue=""
                    setSearch={setSearch}
                    placeholder="Search"
                    steps={{
                        dark:  800,
                        light: 200,
                    }}
                />
                <div className="flex flex-wrap gap-2">
                    {extensionsNode}
                </div>
            </div>
        </div>
    );
}
