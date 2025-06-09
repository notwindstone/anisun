import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import { useState } from "react";
import Button from "@/components/base/Button/Button";
import { useQuery } from "@tanstack/react-query";
import { ExtensionsLocalStorageKey } from "@/constants/app";

export default function ExtensionsBrowser() {
    const { data, isPending, error } = useQuery({
        queryKey: ["extensions", "browser"],
        queryFn:  async () => {
            const response = await fetch("https://raw.githubusercontent.com/notwindstone/anisun-extensions/refs/heads/main/manifests.json");
            const data = await response.json();

            // todo: make a normal checks
            return data;
        },
    });
    const { base, theme, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:   value.data.colors.base,
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });
    const { data: extensions, optimisticallyUpdate: setExtensions } = useContextSelector(ExtensionsContext, (value) => value);
    const [show, setShow] = useState(false);
    console.log(extensions, accent);

    let extensionsNode: React.ReactNode;

    if (isPending) {
        extensionsNode = (
            <>loading...</>
        );
    }

    if (error) {
        extensionsNode = (
            <>error..</>
        );
    }

    if (data) {
        // eslint-disable-next-line
        extensionsNode = data.map((extensionFromStore: any) => {
            return (
                <div key={extensionFromStore.url}>
                    <div>
                        {extensionFromStore.name}
                    </div>
                    <Button
                        onClick={() => {
                            const previousExtensions = extensions ?? [];

                            if (previousExtensions.some((value) => value.url === extensionFromStore.url)) {
                                return;
                            }

                            localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify([...previousExtensions, extensionFromStore]));
                            setExtensions?.((state) => {
                                if (!state) {
                                    return [extensionFromStore];
                                }

                                return [
                                    ...state,
                                    extensionFromStore,
                                ];
                            });
                        }}
                        label={`install ${extensionFromStore.name} extension`}
                    >
                        install
                    </Button>
                </div>
            );
        });
    }

    return (
        <div className="flex items-center flex-col gap-2 w-full">
            <div
                className="rounded-md w-fit"
                style={{
                    background: parseTailwindColor({
                        color: base,
                        step:  theme === DarkThemeKey
                            ? 900
                            : 100,
                    }),
                }}
            >
                <Button
                    onClick={() => setShow((state) => !state)}
                    custom={{
                        style:            "transparent",
                        appendClassNames: "text-lg font-medium px-4",
                    }}
                    label="toggle extensions browser"
                >
                    Toggle extension browser
                </Button>
            </div>
            {
                show && (
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
                        <div className="flex gap-2">
                            {extensionsNode}
                        </div>
                    </div>
                )
            }
        </div>
    );
}
