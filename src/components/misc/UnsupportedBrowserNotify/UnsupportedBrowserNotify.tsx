"use client";

import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";

export default function UnsupportedBrowserNotify(): React.ReactNode {
    const [showed, setShowed] = useState(true);

    useEffect(() => {
        const unsupportedBrowserLocalStorage = localStorage?.getItem("unsupported-browser-hide");

        if (unsupportedBrowserLocalStorage === "hide") {
            setShowed(false);
        }
    }, []);

    if (typeof CSS === "undefined") {
        return;
    }

    const supports = CSS.supports("color", "oklch(0 0 0)");

    if (supports) {
        return;
    }

    if (!showed) {
        return;
    }

    return (
        <div className="z-10000 px-2 py-1 border border-white fixed top-8 left-8 bg-black rounded-md text-white max-w-64 flex gap-2">
            <div className="text-pretty">
                <span className="opacity-70 text-sm">
                    Seems like your web app is looking kinda strange...
                </span>
                <div>
                    Try <strong>updating</strong> your browser to the newer version.
                </div>
            </div>
            <div className="py-1 flex flex-col gap-1">
                <button
                    className="flex justify-center items-center w-8 h-8 rounded-md transition-colors bg-transparent hover:bg-neutral-800 cursor-pointer"
                    onClick={() => setShowed(false)}
                    aria-label="Remove a notify about unsupported browser"
                    title="Remove a notify about unsupported browser"
                >
                    <X size={20} />
                </button>
                <button
                    className="flex justify-center items-center w-8 h-8 rounded-md transition-colors bg-transparent hover:bg-neutral-800 cursor-pointer"
                    onClick={() => {
                        setShowed(false);
                        localStorage?.setItem("unsupported-browser-hide", "hide");
                    }}
                    aria-label="Hide a notify about unsupported browser for all sessions"
                    title="Hide a notify about unsupported browser for all sessions"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}
