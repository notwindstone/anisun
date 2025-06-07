import Button from "@/components/base/Button/Button";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import { Blocks, X } from "lucide-react";
import Link from "next/link";
import { ExtensionType } from "@/types/Extensions/Extension.type";
import { useContextSelector } from "use-context-selector";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";

export default function LoadedExtension({
    extension,
    index,
}: {
    extension: ExtensionType;
    index: number;
}) {
    const { data: extensions, optimisticallyUpdate: setExtensions } = useContextSelector(ExtensionsContext, (value) => value);

    const deleteButton = (
        <Button
            onDoubleClick={() => {
                const newExtensions = extensions?.filter((filteringExtension) => filteringExtension.url !== extension.url);

                localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify(newExtensions));
                setExtensions?.(newExtensions);
            }}
            custom={{ style: "transparent" }}
            label={"remove extension"}
        >
            <X size={24} />
        </Button>
    );
    const isTrusted = extension.url.startsWith("https://raw.githubusercontent.com/notwindstone");
    const selectedClassNames = index === 0 ? "bg-neutral-200 dark:bg-neutral-800" : "hover:cursor-pointer hover:bg-[theme(colors.neutral.200/.3)] dark:hover:bg-[theme(colors.neutral.800/.5)] pointer-events-auto";

    return (
        <div key={extension.url} className="select-none flex gap-2 items-center w-full">
            <div
                onClick={() => {
                    if (index === 0) {
                        return;
                    }

                    const filteredExtensions = extensions?.filter((filteringExtension) => filteringExtension.url !== extension.url);
                    const newExtensionsOrder = [extension, ...(filteredExtensions ?? [])];

                    localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify(newExtensionsOrder));
                    setExtensions?.(newExtensionsOrder);
                }}
                className={`p-1 rounded-md transition-colors flex flex-1 flex-wrap justify-between gap-2 items-center ${selectedClassNames}`}
            >
                <div className="flex gap-4 items-center">
                    <div className="transition-colors bg-neutral-300 dark:bg-neutral-700 p-2 rounded-md flex justify-center items-center">
                        <Blocks size={24} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="leading-none font-medium">
                            {extension.name}
                        </p>
                        <p className="leading-none opacity-60 text-xs">
                            @{extension.author}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    {
                        index === 0 && (
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
                                    className="text-sm rounded-md py-1 px-2 bg-[theme(colors.sky.400/.2)] text-sky-500 transition hover:opacity-50"
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
            {deleteButton}
        </div>
    );
}
