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
import { X } from "lucide-react";
import Link from "next/link";

export default function LoadExtension() {
    const { base, theme } = useContextSelector(ConfigsContext, (value) => {
        return {
            base:  value.data.colors.base,
            theme: value.data.theme,
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
                <p className="leading-none">
                    Plugins installed: {extensions?.length ?? 0}
                </p>
                {
                    extensions?.map((extension) => {
                        const isTrusted = extension.url.startsWith("https://raw.githubusercontent.com/notwindstone");

                        return (
                            <div key={extension.url} className="flex flex-nowrap justify-between items-start">
                                <div className="flex flex-col">
                                    <p className="text-sm">
                                        Name:
                                        {" "}
                                        <span className="text-sm opacity-60">{extension.name}</span>
                                        {" "}
                                        {
                                            isTrusted ? (
                                                <span className="text-sm dark:text-green-400 text-green-500">Official</span>
                                            ) : (
                                                <span className="text-sm dark:text-yellow-400 text-yellow-500">Unofficial</span>
                                            )
                                        }
                                    </p>
                                    <p className="text-sm">
                                        Author:
                                        {" "}
                                        <span className="text-sm opacity-60">{extension.author}</span>
                                    </p>
                                    <p className="text-sm">
                                        Version:{" "}<span className="text-sm opacity-60">{extension.version}</span>
                                    </p>
                                    <p className="text-sm">
                                        URL:{" "}<span className="text-sm opacity-60">{extension.url}</span>
                                    </p>
                                    {
                                        extension.pages.length > 0 && (
                                            <p className="text-sm">
                                                <span className="text-sky-400">Pages:</span>
                                                {" "}
                                                {extension.pages.map((page) => {
                                                    const pageLink = `/${page}`;

                                                    return (
                                                        <Link key={page} href={pageLink} className="text-sm opacity-60 transition hover:opacity-80">
                                                            {pageLink}
                                                        </Link>
                                                    );
                                                })}
                                            </p>
                                        )
                                    }
                                </div>
                                <Button
                                    onClick={() => {
                                        const newExtensions = extensions.filter((filteringExtension) => filteringExtension.url !== extension.url);

                                        localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify(newExtensions));
                                        setExtensions?.(newExtensions);
                                    }}
                                    custom={{ style: "base" }}
                                    label={"remove extension"}
                                >
                                    <X size={16} />
                                </Button>
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
