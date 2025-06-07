"use client";

import { useRef, useState } from "react";
import Button from "@/components/base/Button/Button";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import getSafeExtensionsValues from "@/utils/configs/getSafeExtensionsValues";
import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";
import LoadedExtension from "@/components/extensions/LoadedExtension/LoadedExtension";

export default function ExtensionsLoader() {
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
                        return (
                            <LoadedExtension
                                key={extension.url}
                                extension={extension}
                                index={index}
                            />
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
            </div>
        </div>
    );
}
