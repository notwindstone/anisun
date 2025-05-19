"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function DarkReaderNotify() {
    const [showed, setShowed] = useState(true);

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
            <div className="py-1">
                <button className="flex justify-center items-center w-8 h-8 rounded-md transition-colors bg-transparent hover:bg-neutral-800 cursor-pointer" onClick={() => setShowed(false)}>
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}