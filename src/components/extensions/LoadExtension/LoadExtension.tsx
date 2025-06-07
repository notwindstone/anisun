"use client";

import { useState } from "react";
import Button from "@/components/base/Button/Button";
import { ExtensionsLocalStorageKey } from "@/constants/app";
import getSafeExtensionsValues from "@/utils/configs/getSafeExtensionsValues";

export default function LoadExtension() {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <>
            <input
                className="bg-white border border-black text-black"
                value={input}
                onChange={(event) => setInput(event.target.value)}
            />
            <Button
                disabled={loading}
                onClick={async () => {
                    if (loading) {
                        return;
                    }

                    setLoading(true);

                    let safelyParsedExtension;

                    try {
                        const response = await fetch(input);
                        const body = await response.json();

                        safelyParsedExtension = getSafeExtensionsValues({
                            parsedExtensions: [body],
                        })[0];
                    } catch {
                        alert("error 1");
                        setLoading(false);

                        return;
                    }

                    const storedExtensions = localStorage.getItem(ExtensionsLocalStorageKey);

                    if (!storedExtensions) {
                        localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify([safelyParsedExtension]));

                        return;
                    }

                    let parsedExtensions: unknown;

                    try {
                        parsedExtensions = JSON.parse(storedExtensions);
                    } catch {
                        parsedExtensions = [];
                    }

                    if (!Array.isArray(parsedExtensions)) {
                        alert("error 2");
                        setLoading(false);

                        return;
                    }

                    const extensions = getSafeExtensionsValues({
                        parsedExtensions,
                    });

                    localStorage?.setItem(ExtensionsLocalStorageKey, JSON.stringify([...extensions, safelyParsedExtension]));
                    setLoading(false);
                }}
                label="load extension"
            >
                Load
            </Button>
        </>
    );
}
