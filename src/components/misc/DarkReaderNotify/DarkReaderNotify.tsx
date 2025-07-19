"use client";

import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import { DarkReaderNotificationLocalStorageKey } from "@/constants/app";

export default function DarkReaderNotify(): React.ReactNode {
    const [showed, setShowed] = useState(true);

    useEffect(() => {
        const darkReaderLocalStorage = localStorage?.getItem(DarkReaderNotificationLocalStorageKey);

        if (darkReaderLocalStorage === "hide") {
            setShowed(false);
        }
    }, []);

    if (typeof document === "undefined") {
        return;
    }

    const documentNode = document?.body?.parentNode;

    if (!documentNode) {
        return;
    }

    if (!("dataset" in documentNode)) {
        return;
    }

    if (
        typeof documentNode.dataset !== "object"
        || documentNode.dataset === null
    ) {
        return;
    }

    if (!("darkreaderMode" in documentNode.dataset)) {
        return;
    }

    if (!showed) {
        return;
    }

    return (
        <div className="z-10000 px-2 py-1 border border-white fixed bottom-8 left-8 bg-black rounded-md text-white max-w-64 flex gap-2">
            <div className="text-pretty">
                <span className="opacity-70 text-sm">
                    Seems like your web app is not working properly...
                </span>
                <div>
                    Try disabling the <strong>Dark Reader</strong> extension for this website.
                </div>
            </div>
            <div className="py-1 flex flex-col gap-1">
                <button
                    className="flex justify-center items-center w-8 h-8 rounded-md transition-colors bg-transparent hover:bg-neutral-800 cursor-pointer"
                    onClick={() => setShowed(false)}
                    aria-label="Remove a notify about dark reader"
                    title="Remove a notify about dark reader"
                >
                    <X size={20} />
                </button>
                <button
                    className="flex justify-center items-center w-8 h-8 rounded-md transition-colors bg-transparent hover:bg-neutral-800 cursor-pointer"
                    onClick={() => {
                        setShowed(false);
                        localStorage?.setItem(DarkReaderNotificationLocalStorageKey, "hide");
                    }}
                    aria-label="Hide a notify about dark reader for all sessions"
                    title="Hide a notify about dark reader for all sessions"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}
