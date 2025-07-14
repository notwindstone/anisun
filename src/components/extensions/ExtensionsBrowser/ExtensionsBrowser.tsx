import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { useQuery } from "@tanstack/react-query";
import BrowsingExtension from "@/components/extensions/BrowsingExtension/BrowsingExtension";
import { ExtensionType } from "@/types/Extensions/Extension.type";

export default function ExtensionsBrowser() {
    const { data, isPending, error } = useQuery({
        queryKey: ["extensions", "browser"],
        queryFn:  async () => {
            const response = await fetch("https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/manifests.json");
            const data = await response.json();

            // todo: make normal checks
            return data;
        },
    });
    const { base, theme } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:   value.data.colors.base,
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });

    let extensionsNode: React.ReactNode;

    if (isPending) {
        extensionsNode = Array.from({ length: 3 }).map((_, index) => {
            return (
                <BrowsingExtension
                    loading
                    key={`${_}_${index}`}
                    extension={{
                        displayName: "Loading...",
                        author:      "anisun",
                        version:     "0.0",
                        name:        "",
                        url:         "",
                        logo:        "",
                        pages:       [],
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
        extensionsNode = data.map((extensionFromStore: ExtensionType) => {
            return (
                <BrowsingExtension
                    key={extensionFromStore.url}
                    extension={extensionFromStore}
                />
            );
        });
    }

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
                    <div className="flex gap-2">
                        <p className="leading-none text-lg font-medium">
                            Filter by...
                        </p>
                        <p className="leading-none text-lg font-medium">
                            Search
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {extensionsNode}
                </div>
            </div>
        </div>
    );
}
