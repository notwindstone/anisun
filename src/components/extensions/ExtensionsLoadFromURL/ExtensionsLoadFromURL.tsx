import parseTailwindColor from "@/utils/configs/parseTailwindColor";
import { DarkThemeKey } from "@/constants/configs";
import Button from "@/components/base/Button/Button";
import getSafeExtensionsValues from "@/utils/configs/getSafeExtensionsValues";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import Badge from "@/components/base/Badge/Badge";
import { useRef, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { ConfigsContext } from "@/utils/providers/ConfigsProvider";
import { ExtensionsContext } from "@/utils/providers/ExtensionsProvider";

export default function ExtensionsLoadFromURL() {
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
                    placeholder="Load extension manifest from URL..."
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
    );
}
