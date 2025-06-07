"use client";

import { useRef, useState } from "react";
import Button from "@/components/base/Button/Button";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import getSafeExtensionsValues from "@/utils/configs/getSafeExtensionsValues";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import Badge from "@/components/base/Badge/Badge";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import { Blocks, X } from "lucide-react";
import Link from "next/link";

export default function LoadExtension() {
    const { base, theme, accent } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:   value.data.colors.base,
            theme:  value.data.theme,
            accent: value.data.colors.accent,
        };
    });
    const { data: extensions, optimisticallyUpdate: setExtensions } = useContextSelector(ExtensionsContext, (value) => value);
    const reference = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("");
    const [status, setStatus] = useState<"stale" | "loading" | "success" | "error" | "has">("stale");

    return (
        <div className="flex flex-col gap-2">
            todo: implement importing a pack of extensions
            <div className="transition p-4 dark:bg-neutral-900 bg-neutral-100 rounded-md flex flex-col gap-4">
                <div className="flex justify-between">
                    <p className="leading-none text-lg font-medium">
                        Installed
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
                            {extensions?.length ?? 0}
                        </span>
                    </p>
                </div>
                {
                    extensions?.map((extension, index) => {
                        const deleteButton = (
                            <Button
                                onDoubleClick={() => {
                                    const newExtensions = extensions.filter((filteringExtension) => filteringExtension.url !== extension.url);

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
                            <div key={extension.url} className="flex gap-2 items-center w-full">
                                <div
                                    onClick={() => {
                                        if (index === 0) {
                                            return;
                                        }

                                        const filteredExtensions = extensions.filter((filteringExtension) => filteringExtension.url !== extension.url);
                                        const newExtensionsOrder = [extension, ...filteredExtensions];

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
                    })
                }
            </div>
            <div className="flex flex-wrap w-full gap-2">
                <div
                    onClick={() => {
                        reference.current?.focus();
                    }}
                    className={`px-4 focus-within:ring-2 rounded-md flex flex-nowrap items-center overflow-clip h-10 gap-0 cursor-text transition flex-1 ${status === "error" ? "ring-red-500 dark:ring-red-400" : "ring-black dark:ring-white"}`}
                    style={{
                        background: parseTailwindColor({
                            color: base,
                            step:  theme === DarkThemeKey
                                ? 900
                                : 100,
                        }),
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        ref={reference}
                        className="w-full h-full text-sm focus:outline-none"
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setStatus("stale");
                            setInput(event.target.value.trim());
                        }}
                        placeholder="extension data url..."
                    />
                </div>
                <Button
                    disabled={status === "loading"}
                    onClick={async () => {
                        if (status === "loading") {
                            return;
                        }

                        setStatus("loading");

                        let safelyParsedExtension;

                        try {
                            const response = await fetch(input);
                            const body = await response.json();

                            safelyParsedExtension = getSafeExtensionsValues({
                                parsedExtensions: [body],
                            })[0];
                        } catch {
                            setStatus("error");

                            return;
                        }

                        const previousExtensions = extensions ?? [];

                        if (previousExtensions.some((value) => value.url === safelyParsedExtension.url)) {
                            setStatus("has");

                            return;
                        }

                        localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify([...previousExtensions, safelyParsedExtension]));
                        setExtensions?.((state) => {
                            if (!state) {
                                return [safelyParsedExtension];
                            }

                            return [
                                ...state,
                                safelyParsedExtension,
                            ];
                        });
                        setInput("");
                        setStatus("success");
                    }}
                    label="load extension"
                >
                    Load
                </Button>
                {
                    status === "error" && (
                        <Badge appendClassNames="flex justify-center items-center">
                            Error
                        </Badge>
                    )
                }
                {
                    status === "success" && (
                        <Badge appendClassNames="flex justify-center items-center">
                            Success
                        </Badge>
                    )
                }
                {
                    status === "has" && (
                        <Badge appendClassNames="flex justify-center items-center">
                            Already installed
                        </Badge>
                    )
                }
            </div>
        </div>
    );
}
