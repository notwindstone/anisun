import Button from "@/components/base/Button/Button";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import { ManifestType } from "@/types/Extensions/Extension.type";
import { useContextSelector } from "use-context-selector";
import { ExtensionsContext } from "@/lib/providers/ExtensionsProvider";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { ArrowDownToLine, Blocks } from "lucide-react";
import { ConfigsContext } from "@/lib/providers/ConfigsProvider";
import parseTailwindColor from "@/lib/appearance/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";

export default function BrowsingExtension({
    extension,
    loading,
}: {
    extension: ManifestType;
    loading?:  boolean;
}) {
    const { base, theme } = useContextSelector(ConfigsContext, (value) => ({
        base:  value.data.colors.base,
        theme: value.data.theme,
    }));
    const { data: extensions, optimisticallyUpdate: setExtensions } = useContextSelector(ExtensionsContext, (value) => value);
    const extensionIcon = (
        <div className="transition-colors bg-neutral-300 dark:bg-neutral-700 p-2 rounded-md flex justify-center items-center">
            <Blocks size={24} />
        </div>
    );
    const hasInstalled = extensions?.some((filteringExtension) => filteringExtension.url === extension.url);

    return (
        <div
            className="transition shrink-0 flex-1/2 xs:flex-1/3 sm:flex-1/4 lg:flex-1/5 w-full flex flex-col p-4 rounded-md"
            style={{
                backgroundColor: parseTailwindColor({
                    color: base,
                    step:  theme === DarkThemeKey ? 800 : 200,
                }),
            }}
        >
            <div className="flex mb-4">
                {
                    extension.logo === "" ? extensionIcon : (
                        <ConfiguredImage
                            className="transition w-10 h-10 object-cover rounded-md text-[9px] overflow-clip"
                            width={40}
                            height={40}
                            alt={`${extension.name} logo`}
                            src={extension.logo}
                        />
                    )
                }
            </div>
            <p className="text-md leading-none font-medium text-balance mb-1">
                {extension.name}
            </p>
            <p className="leading-none text-sm opacity-60 mb-4">
                @{extension.authors.join(", ")}
            </p>
            {
                (extension.pages ?? []).length > 0 && (
                    <p className="leading-none opacity-80 text-sm mb-4">
                        Has custom pages
                    </p>
                )
            }
            <div className="flex items-end flex-1">
                <div className="flex gap-2 justify-between items-center w-full">
                    <p className="leading-none opacity-80 text-sm break-all">
                        {extension.version}
                    </p>
                    <Button
                        disabled={hasInstalled || loading}
                        custom={{
                            darker:           true,
                            appendClassNames: "h-fit",
                            style:            (hasInstalled || loading) ? "base" : "accent",
                        }}
                        onClick={() => {
                            const newExtension = {
                                ...extension,
                                isDisabled: true,
                            };
                            const previousExtensions = extensions ?? [];

                            if (previousExtensions.some((value) => value.url === newExtension.url)) {
                                return;
                            }

                            localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify([...previousExtensions, newExtension]));
                            setExtensions?.((state) => {
                                if (!state) {
                                    return [newExtension];
                                }

                                return [
                                    ...state,
                                    newExtension,
                                ];
                            });
                        }}
                        label={`install ${extension.name} extension`}
                    >
                        <ArrowDownToLine />
                    </Button>
                </div>
            </div>
        </div>
    );
}
