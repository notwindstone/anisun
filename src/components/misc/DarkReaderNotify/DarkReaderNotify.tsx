"use client";

export default function DarkReaderNotify() {
    const t1 = performance.now();
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
    const t2 = performance.now();
    console.log(t2 - t1);

    return (
        <div className="z-10000 px-2 py-1 border border-white fixed bottom-8 left-8 bg-black rounded-md text-white max-w-64 text-pretty">
            <span className="opacity-70 text-sm">
                Seems like your web app is not working properly...
            </span>
            <div>
                Try disabling the <strong>Dark Reader</strong> extension for this website.
            </div>
        </div>
    );
}