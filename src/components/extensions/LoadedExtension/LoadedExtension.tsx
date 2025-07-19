import Button from "@/components/base/Button/Button";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import { Blocks, Ellipsis, Palette, ToggleLeft, ToggleRight, X } from "lucide-react";
import Link from "next/link";
import { ExtensionType } from "@/types/Extensions/Extension.type";
import { useContextSelector } from "use-context-selector";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import { useState } from "react";
import ConfiguredImage from "@/components/base/ConfiguredImage/ConfiguredImage";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { DarkThemeKey } from "@/constants/configs";
import parseTailwindColor from "@/utils/appearance/parseTailwindColor";

export default function LoadedExtension({
    extension,
    index,
}: {
    extension: ExtensionType;
    index: number;
}) {
    const { base, theme } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:  value.data.colors.base,
            theme: value.data.theme,
        };
    });
    const { data: extensions, optimisticallyUpdate: setExtensions } = useContextSelector(ExtensionsContext, (value) => value);
    // avoid miss clicks
    const [toDelete, setToDelete] = useState(false);
    const isDark = theme === DarkThemeKey;
    const isDefault = index === 0;
    const isDisabled = extension.isDisabled;

    const deleteButton = (
        <Button
            onClick={() => {
                if (!toDelete) {
                    setToDelete(true);

                    const timeout = setTimeout(() => {
                        setToDelete(false);
                    }, 2000);

                    return () => clearTimeout(timeout);
                }

                const newExtensions = extensions?.filter((filteringExtension) => filteringExtension.url !== extension.url);

                localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify(newExtensions));
                setExtensions?.(newExtensions);

                if (!isDisabled && extension.areStyles) {
                    location.reload();
                }
            }}
            custom={{ style: "base" }}
            label={"remove extension"}
        >
            {
                toDelete ? (
                    <X size={24} />
                ) : (
                    <Ellipsis size={24} />
                )
            }
        </Button>
    );
    const disableButton = (
        <Button
            onClick={() => {
                const filteredExtensions = [...(extensions ?? [])];

                for (const filteringExtension of filteredExtensions) {
                    if (filteringExtension.url === extension.url) {
                        filteringExtension.isDisabled = !extension.isDisabled;
                    }
                }

                const newExtensions = [
                    ...filteredExtensions,
                ];

                localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify(newExtensions));
                setExtensions?.(newExtensions);

                if (!isDisabled && extension.areStyles) {
                    location.reload();
                }
            }}
            custom={{ style: "base" }}
            label={"disable extension"}
        >
            {
                extension.isDisabled ? (
                    <ToggleLeft size={24} />
                ) : (
                    <ToggleRight size={24} />
                )
            }
        </Button>
    );
    const extensionIcon = (
        <div className="transition-colors bg-neutral-300 dark:bg-neutral-700 p-2 rounded-md flex justify-center items-center">
            {
                extension.areStyles ? (
                    <Palette size={24} />
                ) : (
                    <Blocks size={24} />
                )
            }
        </div>
    );
    const isTrusted = extension.url.startsWith("https://raw.githubusercontent.com/notwindstone");
    const selectedClassNames = isDefault ? "" : "hover:cursor-pointer hover:bg-[theme(colors.black/.025)] dark:hover:bg-[theme(colors.white/.025)] pointer-events-auto";

    return (
        <div key={extension.url} className="select-none flex gap-2 items-center w-full">
            <div
                onClick={() => {
                    if (extension.isDisabled) {
                        return;
                    }

                    if (isDefault) {
                        return;
                    }

                    const filteredExtensions = extensions?.filter((filteringExtension) => filteringExtension.url !== extension.url);
                    const newExtensionsOrder = [extension, ...(filteredExtensions ?? [])];

                    localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify(newExtensionsOrder));
                    setExtensions?.(newExtensionsOrder);
                }}
                className={`relative p-1 rounded-md transition flex flex-1 flex-wrap justify-between gap-2 items-center ${selectedClassNames} ${extension.isDisabled ? "opacity-40" : ""}`}
                style={
                    isDefault ? ({
                        backgroundColor: parseTailwindColor({
                            color: base,
                            step:  isDark ? 800 : 200,
                        }),
                    }) : undefined
                }
            >
                {
                    extension.areStyles && (
                        <div className="absolute left-5 -top-3 scale-60 opacity-50">
                            {extensionIcon}
                        </div>
                    )
                }
                <div className="flex gap-4 items-center">
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
                    <div className="flex flex-col gap-1">
                        <p className="leading-none font-medium">
                            {extension.displayName ?? extension.name}
                        </p>
                        <p className="leading-none opacity-60 text-xs">
                            @{extension.author}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {
                        (isDefault && !extension.areStyles) && (
                            <div className="text-sm rounded-md py-1 px-2 bg-[theme(colors.neutral.400/.2)] transition-colors dark:text-white text-black">
                                default
                            </div>
                        )
                    }
                    {
                        extension.pages.map((page) => {
                            const pageLink = `/${page}`;

                            return (
                                <Link
                                    className={`text-sm rounded-md py-1 px-2 bg-[theme(colors.neutral.400/.2)] text-sky-500 transition hover:opacity-50 ${extension.isDisabled ? "pointer-events-none" : ""}`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                    }}
                                    key={pageLink}
                                    href={pageLink}
                                >
                                    {pageLink}
                                </Link>
                            );
                        })
                    }
                    {
                        isTrusted && (
                            <div className="text-sm rounded-md py-1 px-2 bg-[theme(colors.green.400/.2)] text-green-500">
                                official
                            </div>
                        )
                    }
                    <div className="text-sm rounded-md py-1 mr-1 px-2 bg-[theme(colors.neutral.400/.2)] transition-colors dark:text-white text-black">
                        {extension.version}
                    </div>
                </div>
            </div>
            {disableButton}
            {deleteButton}
        </div>
    );
}
